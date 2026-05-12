import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VIBESTR_CONTRACT = '0xd0cC2b0eFb168bFe1f94a948D8df70FA10257196';

export async function GET() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${VIBESTR_CONTRACT}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    const pair = Array.isArray(data?.pairs) ? data.pairs[0] : null;
    const marketCapUsd = Number(pair?.marketCap ?? pair?.fdv ?? 0);
    const priceUsd = Number(pair?.priceUsd ?? 0);

    return NextResponse.json(
      { marketCapUsd, priceUsd },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
    );
  } catch (error) {
    console.error('vibestr-marketcap error:', error);
    return NextResponse.json({ marketCapUsd: 0, priceUsd: 0 }, { status: 500 });
  }
}
