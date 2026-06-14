import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, formatUnits, isAddress, getAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { getHolderBadges, type BadgeTokenMap } from '@/lib/badge-helpers';
import badgeTokenMapJson from '@/data/badge-token-map.json';
import { getDelegates } from '@/data/delegates';

export const dynamic = 'force-dynamic';

const OPENSEA_API_KEY = '003c902b643e4b06b14ae18bda215739';
const GVC_SLUG = 'good-vibes-club';
const GVC_CONTRACT = '0xb8ea78fcacef50d41375e44e6814ebba36bb33c4';
const VIBESTR_CONTRACT = '0xd0cC2b0eFb168bFe1f94a948D8df70FA10257196' as const;
const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY ?? 'demo';
const VIBESTR_DECIMALS = 18;

const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const BADGE_TOKEN_MAP = badgeTokenMapJson as BadgeTokenMap;

interface AlchemyNft {
  tokenId?: string;
  id?: { tokenId?: string };
}

async function fetchGvcTokenIds(address: string): Promise<string[]> {
  const ids: string[] = [];
  let pageKey: string | undefined;
  // Alchemy NFT v3 — getNFTsForOwner supports pagination
  for (let i = 0; i < 6; i++) {
    const url = new URL(`https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner`);
    url.searchParams.set('owner', address);
    url.searchParams.append('contractAddresses[]', GVC_CONTRACT);
    url.searchParams.set('withMetadata', 'false');
    url.searchParams.set('pageSize', '100');
    if (pageKey) url.searchParams.set('pageKey', pageKey);
    const res = await fetch(url.toString(), { headers: { accept: 'application/json' }, next: { revalidate: 120 } });
    if (!res.ok) break;
    const data = (await res.json()) as { ownedNfts?: AlchemyNft[]; pageKey?: string };
    for (const n of data.ownedNfts ?? []) {
      const raw = n.tokenId ?? n.id?.tokenId;
      if (!raw) continue;
      const id = raw.startsWith('0x') ? BigInt(raw).toString() : raw;
      ids.push(id);
    }
    if (!data.pageKey) break;
    pageKey = data.pageKey;
  }
  return ids;
}

async function fetchVibestrBalance(
  client: ReturnType<typeof createPublicClient>,
  address: `0x${string}`
): Promise<number> {
  try {
    const raw = await client.readContract({
      address: VIBESTR_CONTRACT,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    });
    return Number(formatUnits(raw, VIBESTR_DECIMALS));
  } catch (e) {
    console.error('vibestr balance error for', address, e);
    return 0;
  }
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('address');
  if (!raw || !isAddress(raw, { strict: false })) {
    return NextResponse.json({ error: 'invalid address' }, { status: 400 });
  }
  const address = getAddress(raw);
  const lower = address.toLowerCase();

  const client = createPublicClient({
    chain: mainnet,
    transport: http('https://ethereum-rpc.publicnode.com', { batch: true }),
  });

  const delegates = getDelegates(address).map((d) => getAddress(d));
  const vibestrSources: { address: `0x${string}`; label: string }[] = [
    { address, label: 'primary' },
    ...delegates.map((d) => ({ address: d, label: 'delegate' })),
  ];

  const [tokenIds, ...vibestrPerWallet] = await Promise.all([
    fetchGvcTokenIds(lower),
    ...vibestrSources.map((s) => fetchVibestrBalance(client, s.address)),
  ]);

  const vibestrBalance = vibestrPerWallet.reduce((sum, b) => sum + b, 0);
  const vibestrBreakdown = vibestrSources.map((s, i) => ({
    address: s.address,
    label: s.label,
    balance: vibestrPerWallet[i],
  }));

  const gvcCount = tokenIds.length;
  const result = getHolderBadges(tokenIds, BADGE_TOKEN_MAP, vibestrBalance);
  // The Shaka-Score system handles VIBESTR tier as a multiplier, not a badge points contributor.
  // Strip the VIBESTR tier badge from the earned-badges list so we don't double-count it.
  const badgeIds = result.allBadges.filter((id) => !id.startsWith('vibestr_'));

  return NextResponse.json(
    {
      address,
      vibestrBalance,
      vibestrBreakdown,
      gvcCount,
      tokenIds,
      badgeIds,
      vibestrTierBadge: result.vibestrTierBadge,
      delegates,
      contract: GVC_CONTRACT,
      slug: GVC_SLUG,
      _opensea: OPENSEA_API_KEY ? 'configured' : 'missing',
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
  );
}
