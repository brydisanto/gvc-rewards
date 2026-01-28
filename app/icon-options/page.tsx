'use client';

import UnifiedStatsPanel from '@/components/UnifiedStatsPanel';
import { Coins, Sparkles, Music, Skull, Radio, PartyPopper, Zap, Ghost, Heart, Siren, Smile, Activity } from 'lucide-react';

export default function IconOptionsPage() {
    // Mock Data
    const tokenStats = {
        vibestr: 850000000,
        pnkstr: 12000000,
        eth: 145.5,
        vibestrUsd: 425,
        pnkstrUsd: 120,
        ethUsd: 450000,
    };

    const nftCounts = {
        cryptoPunksCount: 3,
        gvcCount: 1547,
        cryptoPunksUsd: 250000,
        gvcUsd: 75000,
    };

    return (
        <div className="min-h-screen bg-gvc-black p-8">
            <h1 className="text-4xl font-cooper text-gvc-gold text-center mb-12">
                Icon Options Preview
            </h1>

            <div className="space-y-12">
                {/* Option 1: Current */}
                <div className="space-y-4">
                    <h2 className="text-white font-mundial text-xl text-center">Option 1: Current (Coins / Sparkles)</h2>
                    <UnifiedStatsPanel
                        tokenStats={tokenStats}
                        nftCounts={nftCounts}
                        isLoadingTokens={false}
                        isLoadingNfts={false}
                        icons={{ vibestr: Coins, pnkstr: Sparkles }}
                    />
                </div>

                {/* Option 2: Musical / Edgy */}
                <div className="space-y-4">
                    <h2 className="text-white font-mundial text-xl text-center">Option 2: Musical & Edgy (Music / Skull)</h2>
                    <UnifiedStatsPanel
                        tokenStats={tokenStats}
                        nftCounts={nftCounts}
                        isLoadingTokens={false}
                        isLoadingNfts={false}
                        icons={{ vibestr: Music, pnkstr: Skull }}
                    />
                </div>

                {/* Option 3: Broadcast / Party */}
                <div className="space-y-4">
                    <h2 className="text-white font-mundial text-xl text-center">Option 3: Broadcast & Party (Radio / PartyPopper)</h2>
                    <UnifiedStatsPanel
                        tokenStats={tokenStats}
                        nftCounts={nftCounts}
                        isLoadingTokens={false}
                        isLoadingNfts={false}
                        icons={{ vibestr: Radio, pnkstr: PartyPopper }}
                    />
                </div>

                {/* Option 4: Energy / Ghost */}
                <div className="space-y-4">
                    <h2 className="text-white font-mundial text-xl text-center">Option 4: High Energy (Zap / Ghost)</h2>
                    <UnifiedStatsPanel
                        tokenStats={tokenStats}
                        nftCounts={nftCounts}
                        isLoadingTokens={false}
                        isLoadingNfts={false}
                        icons={{ vibestr: Zap, pnkstr: Ghost }}
                    />
                </div>
            </div>
        </div>
    );
}
