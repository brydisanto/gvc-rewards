import { NextResponse } from 'next/server';
import { createPublicClient, http, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

export const dynamic = 'force-dynamic';

const STRATEGY_ENS = 'vibestrategy.eth';
const FALLBACK_ADDRESS = '0xd0cC2b0eFb168bFe1f94a948D8df70FA10257196' as const;

export async function GET() {
  try {
    const client = createPublicClient({
      chain: mainnet,
      transport: http('https://ethereum-rpc.publicnode.com'),
    });

    let address: `0x${string}` = FALLBACK_ADDRESS;
    try {
      const resolved = await client.getEnsAddress({ name: STRATEGY_ENS });
      if (resolved) address = resolved;
    } catch {
      // fall back silently
    }

    const ethBalanceRaw = await client.getBalance({ address });
    const balanceEth = Number(formatEther(ethBalanceRaw));

    const ERUPTION_THRESHOLD = 6.9;
    const completedEruptions = Math.floor(balanceEth / ERUPTION_THRESHOLD);
    const progressEth = balanceEth - completedEruptions * ERUPTION_THRESHOLD;
    const progressPct = (progressEth / ERUPTION_THRESHOLD) * 100;
    const remainingEth = ERUPTION_THRESHOLD - progressEth;

    return NextResponse.json(
      {
        address,
        ens: STRATEGY_ENS,
        balanceEth,
        threshold: ERUPTION_THRESHOLD,
        completedEruptions,
        progressEth,
        remainingEth,
        progressPct,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } }
    );
  } catch (error) {
    console.error('strategy-balance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch strategy balance', balanceEth: 0, progressEth: 0, progressPct: 0, remainingEth: 6.9, completedEruptions: 0, threshold: 6.9 },
      { status: 500 }
    );
  }
}
