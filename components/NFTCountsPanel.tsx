'use client';

import { motion } from 'framer-motion';
import { Crown, Smile } from 'lucide-react';

interface NFTCounts {
    cryptoPunksCount: number;
    gvcCount: number;
    cryptoPunksUsd: number;
    gvcUsd: number;
}

interface NFTCountsPanelProps {
    counts: NFTCounts | null;
    isLoading: boolean;
}

export default function NFTCountsPanel({ counts, isLoading }: NFTCountsPanelProps) {
    const formatUsd = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto mt-4"
        >
            {/* CryptoPunks Count */}
            <div className="bg-gvc-dark/80 border border-purple-500/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <span className="text-white/60 font-mundial text-xs uppercase tracking-wider">CryptoPunks</span>
                </div>
                <div className="text-2xl md:text-3xl font-cooper text-purple-400">
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : counts ? (
                        counts.cryptoPunksCount
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/40 text-xs font-mundial mt-1">
                    {isLoading ? '...' : counts ? formatUsd(counts.cryptoPunksUsd) : '—'}
                </p>
            </div>

            {/* GVCs Count */}
            <div className="bg-gvc-dark/80 border border-gvc-gold/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Smile className="w-5 h-5 text-gvc-gold" />
                    <span className="text-white/60 font-mundial text-xs uppercase tracking-wider">GVC NFTs</span>
                </div>
                <div className="text-2xl md:text-3xl font-cooper text-gvc-gold">
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : counts ? (
                        counts.gvcCount
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/40 text-xs font-mundial mt-1">
                    {isLoading ? '...' : counts ? formatUsd(counts.gvcUsd) : '—'}
                </p>
            </div>
        </motion.div>
    );
}
