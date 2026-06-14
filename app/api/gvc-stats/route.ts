import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OPENSEA_API_KEY = '003c902b643e4b06b14ae18bda215739';
const COLLECTION_SLUG = 'good-vibes-club';

export async function GET() {
  try {
    const res = await fetch(`https://api.opensea.io/api/v2/collections/${COLLECTION_SLUG}/stats`, {
      headers: { accept: 'application/json', 'x-api-key': OPENSEA_API_KEY },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('OpenSea stats error:', text);
      return NextResponse.json(
        { floorEth: 0, totalVolumeEth: 0, uniqueHolders: 0, error: 'OpenSea unavailable' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const total = data.total ?? {};
    const floorEth = Number(total.floor_price ?? 0);
    const totalVolumeEth = Number(total.volume ?? 0);
    const uniqueHolders = Number(total.num_owners ?? 0);

    return NextResponse.json(
      { floorEth, totalVolumeEth, uniqueHolders },
      { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } }
    );
  } catch (error) {
    console.error('gvc-stats error:', error);
    return NextResponse.json(
      { floorEth: 0, totalVolumeEth: 0, uniqueHolders: 0, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
