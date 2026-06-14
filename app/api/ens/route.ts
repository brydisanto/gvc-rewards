import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, isAddress } from 'viem';
import { mainnet } from 'viem/chains';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');
  if (!address || !isAddress(address, { strict: false })) {
    return NextResponse.json({ ens: null });
  }

  try {
    const client = createPublicClient({
      chain: mainnet,
      transport: http('https://ethereum-rpc.publicnode.com'),
    });
    const ens = await client.getEnsName({ address });
    return NextResponse.json(
      { ens },
      { headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' } }
    );
  } catch (error) {
    console.error('ens lookup error:', error);
    return NextResponse.json({ ens: null });
  }
}
