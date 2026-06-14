import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, formatUnits, getAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { BADGES } from '@/data/badgeTiers';
import { computeShaka, computePunkScore, loyaltyTierForMonths, monthsSinceLoyaltyStart } from '@/lib/shakaScore';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

const GVC_CONTRACT = '0xb8ea78fcacef50d41375e44e6814ebba36bb33c4';
const VIBESTR_CONTRACT = '0xd0cC2b0eFb168bFe1f94a948D8df70FA10257196' as const;
const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY ?? 'demo';
const BURN_ADDRESSES = new Set([
  '0x0000000000000000000000000000000000000000',
  '0x000000000000000000000000000000000000dead',
]);

const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const VIBESTR_DECIMALS = 18;

interface AlchemyOwner {
  ownerAddress: string;
  tokenBalances: { tokenId: string; balance: string }[];
}

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function mockBadgeIds(address: string, gvcCount: number, vibestrBalance: number): string[] {
  if (gvcCount === 0) return [];
  const seed = hashSeed(address.toLowerCase());
  const baseCount = Math.min(BADGES.length, Math.max(1, Math.floor(gvcCount * 0.5) + Math.floor(vibestrBalance / 500_000)));
  const ids: string[] = ['any_gvc'];
  let cursor = seed;
  for (let i = 0; i < baseCount; i++) {
    cursor = (cursor * 1664525 + 1013904223) >>> 0;
    const pick = BADGES[cursor % BADGES.length];
    if (!ids.includes(pick.id)) ids.push(pick.id);
  }
  return ids;
}

async function fetchTopGvcHolders(limit: number): Promise<{ address: string; gvcCount: number }[]> {
  const holders = new Map<string, number>();
  let pageKey: string | undefined;
  let pages = 0;
  while (pages < 8) {
    const url = new URL(`https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getOwnersForContract`);
    url.searchParams.set('contractAddress', GVC_CONTRACT);
    url.searchParams.set('withTokenBalances', 'true');
    if (pageKey) url.searchParams.set('pageKey', pageKey);
    const res = await fetch(url.toString(), { headers: { accept: 'application/json' }, next: { revalidate: 600 } });
    if (!res.ok) break;
    const data = (await res.json()) as { owners?: AlchemyOwner[]; pageKey?: string };
    for (const owner of data.owners ?? []) {
      const a = owner.ownerAddress.toLowerCase();
      if (BURN_ADDRESSES.has(a)) continue;
      const count = owner.tokenBalances.reduce((acc, t) => acc + Number(t.balance || 0), 0);
      holders.set(a, (holders.get(a) ?? 0) + count);
    }
    if (!data.pageKey) break;
    pageKey = data.pageKey;
    pages++;
  }
  return Array.from(holders.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([address, gvcCount]) => ({ address, gvcCount }));
}

async function fetchVibestrBalances(client: ReturnType<typeof createPublicClient>, addresses: `0x${string}`[]): Promise<bigint[]> {
  const results = await client.multicall({
    allowFailure: true,
    contracts: addresses.map((addr) => ({
      address: VIBESTR_CONTRACT,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [addr],
    })),
  });
  return results.map((r) => (r.status === 'success' ? (r.result as bigint) : 0n));
}

async function fetchEnsNames(client: ReturnType<typeof createPublicClient>, addresses: `0x${string}`[]): Promise<(string | null)[]> {
  return Promise.all(
    addresses.map(async (addr) => {
      try {
        return await client.getEnsName({ address: addr });
      } catch {
        return null;
      }
    })
  );
}

export async function GET(req: NextRequest) {
  const limit = Math.min(50, Math.max(5, Number(req.nextUrl.searchParams.get('limit') ?? 25)));

  try {
    const topHolders = await fetchTopGvcHolders(limit);
    if (topHolders.length === 0) {
      return NextResponse.json({ entries: [], source: 'empty' }, { status: 200 });
    }

    const client = createPublicClient({
      chain: mainnet,
      transport: http('https://ethereum-rpc.publicnode.com', { batch: true }),
    });

    const addresses = topHolders.map((h) => getAddress(h.address) as `0x${string}`);

    const [vibestrBalances, ensNames] = await Promise.all([
      fetchVibestrBalances(client, addresses),
      fetchEnsNames(client, addresses),
    ]);

    const months = monthsSinceLoyaltyStart();
    const loyalty = loyaltyTierForMonths(months);

    const rows = topHolders.map((h, i) => {
      const address = addresses[i];
      const vibestrBalance = Number(formatUnits(vibestrBalances[i] ?? 0n, VIBESTR_DECIMALS));
      const badgeIds = mockBadgeIds(address, h.gvcCount, vibestrBalance);
      const breakdown = computeShaka({ badgeIds, gvcCount: h.gvcCount, vibestrBalance });
      return {
        wallet: address,
        ens: ensNames[i],
        gvcCount: h.gvcCount,
        vibestrBalance,
        vibestrTier: breakdown.vibestrTierName ?? '—',
        shakaScore: breakdown.shakaScore,
        loyaltyMonths: months,
        loyaltyName: loyalty.name,
        loyaltyMultiplier: loyalty.multiplier,
        punkScore: computePunkScore(breakdown.shakaScore, loyalty.multiplier),
      };
    });

    rows.sort((a, b) => b.punkScore - a.punkScore);
    const entries = rows.map((row, i) => ({ rank: i + 1, ...row }));

    return NextResponse.json(
      { entries, source: 'live', generatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900' } }
    );
  } catch (error) {
    console.error('leaderboard error:', error);
    return NextResponse.json(
      { entries: [], source: 'error', error: 'failed to build leaderboard' },
      { status: 500 }
    );
  }
}
