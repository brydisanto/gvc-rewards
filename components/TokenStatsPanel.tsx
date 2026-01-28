'use client';

import { motion } from 'framer-motion';
import { Coins, Sparkles, Gem } from 'lucide-react';

interface TokenStats {
    vibestr: number;
    pnkstr: number;
    eth: number;
    vibestrUsd: number;
    pnkstrUsd: number;
    ethUsd: number;
}

interface TokenStatsPanelProps {
    stats: TokenStats | null;
    isLoading: boolean;
}

export default function TokenStatsPanel({ stats, isLoading }: TokenStatsPanelProps) {
    const formatNumber = (num: number) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(2) + 'B';
        }
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(2) + 'M';
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(2) + 'K';
        }
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

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
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto mt-8"
        >
            {/* VIBESTR Token */}
            <div className="bg-gvc-dark/80 border border-gvc-gold/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-5 h-5 text-gvc-gold" />
                    <span className="text-white/60 font-mundial text-xs uppercase tracking-wider">$VIBESTR</span>
                </div>
                <div className="text-2xl md:text-3xl font-cooper text-gvc-gold">
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : stats ? (
                        formatNumber(stats.vibestr)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/40 text-xs font-mundial mt-1">
                    {isLoading ? '...' : stats ? formatUsd(stats.vibestrUsd) : '—'}
                </p>
            </div>

            {/* PNKSTR Token */}
            <div className="bg-gvc-dark/80 border border-pink-accent/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-pink-accent" />
                    <span className="text-white/60 font-mundial text-xs uppercase tracking-wider">$PNKSTR</span>
                </div>
                <div className="text-2xl md:text-3xl font-cooper text-pink-accent">
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : stats ? (
                        formatNumber(stats.pnkstr)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/40 text-xs font-mundial mt-1">
                    {isLoading ? '...' : stats ? formatUsd(stats.pnkstrUsd) : '—'}
                </p>
            </div>

            {/* ETH */}
            <div className="bg-gvc-dark/80 border border-blue-400/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Gem className="w-5 h-5 text-blue-400" />
                    <span className="text-white/60 font-mundial text-xs uppercase tracking-wider">ETH</span>
                </div>
                <div className="text-2xl md:text-3xl font-cooper text-blue-400">
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : stats ? (
                        stats.eth.toFixed(4)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/40 text-xs font-mundial mt-1">
                    {isLoading ? '...' : stats ? formatUsd(stats.ethUsd) : '—'}
                </p>
            </div>
        </motion.div>
    );
}
