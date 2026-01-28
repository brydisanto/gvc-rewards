import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OPENSEA_API_KEY = '003c902b643e4b06b14ae18bda215739';
const WALLET_ADDRESS = '0x8f689e3c86e207cc1031a4b89d3073704042e5cc';

// Collection contracts
const CRYPTOPUNKS_CONTRACTS = [
    '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb', // CryptoPunks
    '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d', // Wrapped CryptoPunks (legacy)
];
const GVC_CONTRACT = '0xb8ea78fcacef50d41375e44e6814ebba36bb33c4'; // Good Vibes Club
const ENS_CONTRACT = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'; // ENS Domains (to exclude)

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface NFTData {
    id: string;
    name: string;
    image: string;
    collection: string;
    collectionSlug: string;
    contract: string;
    floorPrice: number | null;
    openseaUrl: string;
    isSignature: boolean;
}

export async function GET() {
    try {
        let allNfts: NFTData[] = [];
        let cursor: string | null = null;

        // Fetch all NFTs owned by the wallet
        for (let i = 0; i < 10; i++) {
            const url = new URL(`https://api.opensea.io/api/v2/chain/ethereum/account/${WALLET_ADDRESS}/nfts`);
            url.searchParams.set('limit', '200');
            if (cursor) {
                url.searchParams.set('next', cursor);
            }

            let response = await fetch(url.toString(), {
                headers: {
                    'accept': 'application/json',
                    'x-api-key': OPENSEA_API_KEY,
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            });

            // Handle rate limit
            if (response.status === 429) {
                console.warn('Rate limit hit on /api/nfts, waiting 2s...');
                await delay(2000);
                response = await fetch(url.toString(), {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': OPENSEA_API_KEY,
                    },
                    next: { revalidate: 300 },
                });
            }

            if (!response.ok) {
                console.error('OpenSea API Error:', response.status);
                break;
            }

            const data = await response.json();
            const nfts = data.nfts || [];

            for (const nft of nfts) {
                const contract = nft.contract?.toLowerCase() || '';

                // Skip ENS domains
                if (contract === ENS_CONTRACT.toLowerCase()) continue;

                const isCryptoPunk = CRYPTOPUNKS_CONTRACTS.some(c => c.toLowerCase() === contract);

                allNfts.push({
                    id: nft.identifier || nft.token_id || '0',
                    name: nft.name || `#${nft.identifier || nft.token_id || '?'}`,
                    image: nft.image_url || nft.display_image_url || '',
                    collection: nft.collection || 'Unknown',
                    collectionSlug: nft.collection || '',
                    contract: contract,
                    floorPrice: null, // Will be filled from collection data
                    openseaUrl: nft.opensea_url || `https://opensea.io/assets/ethereum/${contract}/${nft.identifier}`,
                    isSignature: isCryptoPunk,
                });
            }

            cursor = data.next;
            if (!cursor) break;
            await delay(300);
        }

        // Fetch floor prices for each unique collection
        const uniqueCollections = [...new Set(allNfts.map(nft => nft.collectionSlug).filter(Boolean))];
        const floorPrices: Record<string, number> = {};

        for (const slug of uniqueCollections) {
            try {
                const collectionUrl = `https://api.opensea.io/api/v2/collections/${slug}/stats`;
                const response = await fetch(collectionUrl, {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': OPENSEA_API_KEY,
                    },
                    next: { revalidate: 300 },
                });

                if (response.ok) {
                    const stats = await response.json();
                    if (stats.total?.floor_price) {
                        floorPrices[slug] = stats.total.floor_price;
                    }
                }
                await delay(100);
            } catch (e) {
                console.error(`Failed to fetch floor for ${slug}:`, e);
            }
        }

        // Apply floor prices to NFTs
        allNfts = allNfts.map(nft => {
            const isCryptoPunk = CRYPTOPUNKS_CONTRACTS.some(c => c.toLowerCase() === nft.contract);
            const dynamicFloor = floorPrices[nft.collectionSlug] || 0;

            if (isCryptoPunk) {
                return {
                    ...nft,
                    floorPrice: Math.max(dynamicFloor, 32.5362)
                };
            }

            return {
                ...nft,
                floorPrice: dynamicFloor || null,
            };
        });

        // Count NFTs by collection and calculate floor totals
        const cryptoPunks = allNfts.filter(nft =>
            CRYPTOPUNKS_CONTRACTS.some(c => c.toLowerCase() === nft.contract)
        );
        const gvcs = allNfts.filter(nft =>
            nft.contract === GVC_CONTRACT.toLowerCase()
        );

        const cryptoPunksCount = cryptoPunks.length;
        const gvcCount = gvcs.length;

        // Calculate total floor value in ETH for each collection
        const cryptoPunksFloorEth = cryptoPunks.reduce((sum, nft) => sum + (nft.floorPrice || 0), 0);
        const gvcFloorEth = gvcs.reduce((sum, nft) => sum + (nft.floorPrice || 0), 0);

        return NextResponse.json({
            nfts: allNfts,
            count: allNfts.length,
            cryptoPunksCount,
            gvcCount,
            cryptoPunksFloorEth,
            gvcFloorEth,
        });

    } catch (error) {
        console.error('Error fetching NFT data:', error);
        return NextResponse.json({ nfts: [], count: 0, error: 'Internal error' }, { status: 500 });
    }
}
