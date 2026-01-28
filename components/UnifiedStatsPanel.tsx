'use client';

import { motion } from 'framer-motion';
import { Zap, Sparkles, Crown, type LucideIcon } from 'lucide-react';

interface TokenStats {
    vibestr: number;
    pnkstr: number;
    eth: number;
    vibestrUsd: number;
    pnkstrUsd: number;
    ethUsd: number;
}

interface NFTCounts {
    cryptoPunksCount: number;
    gvcCount: number;
    cryptoPunksUsd: number;
    gvcUsd: number;
}

interface UnifiedStatsPanelProps {
    tokenStats: TokenStats | null;
    nftCounts: NFTCounts | null;
    isLoadingTokens: boolean;
    isLoadingNfts: boolean;
    icons?: {
        vibestr?: LucideIcon;
        pnkstr?: LucideIcon;
    };
}

export default function UnifiedStatsPanel({ tokenStats, nftCounts, isLoadingTokens, isLoadingNfts, icons }: UnifiedStatsPanelProps) {
    const VibestrIcon = icons?.vibestr || Zap;
    const PnkstrIcon = icons?.pnkstr || Sparkles;

    const formatNumber = (num: number, decimals: number = 1) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(decimals) + 'B';
        }
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(decimals) + 'M';
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(decimals) + 'K';
        }
        return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-6xl mx-auto mt-8"
        >
            {/* VIBESTR Token */}
            <div className="bg-gvc-dark/80 border border-white/40 rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                    <VibestrIcon className="w-4 h-4 text-white" />
                    <span className="text-white/60 font-mundial text-[10px] uppercase tracking-wider">$VIBESTR</span>
                </div>
                <div className="text-xl md:text-2xl font-cooper text-white">
                    {isLoadingTokens ? (
                        <span className="animate-pulse">...</span>
                    ) : tokenStats ? (
                        formatNumber(tokenStats.vibestr, 1)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/50 text-sm font-mundial mt-0.5">
                    {isLoadingTokens ? '...' : tokenStats ? formatUsd(tokenStats.vibestrUsd) : '—'}
                </p>
            </div>

            {/* PNKSTR Token */}
            <div className="bg-gvc-dark/80 border border-white/40 rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                    <PnkstrIcon className="w-4 h-4 text-white" />
                    <span className="text-white/60 font-mundial text-[10px] uppercase tracking-wider">$PNKSTR</span>
                </div>
                <div className="text-xl md:text-2xl font-cooper text-white">
                    {isLoadingTokens ? (
                        <span className="animate-pulse">...</span>
                    ) : tokenStats ? (
                        formatNumber(tokenStats.pnkstr, 1)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/50 text-sm font-mundial mt-0.5">
                    {isLoadingTokens ? '...' : tokenStats ? formatUsd(tokenStats.pnkstrUsd) : '—'}
                </p>
            </div>

            {/* ETH */}
            <div className="bg-gvc-dark/80 border border-white/40 rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                    <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current text-white">
                        <path d="M15.925 23.96l-9.825-5.8 9.825 13.84 9.875-13.84-9.875 5.8zM16 0l-9.875 16.28 9.875 5.855 9.875-5.855L16 0z" />
                    </svg>
                    <span className="text-white/60 font-mundial text-[10px] uppercase tracking-wider">ETH</span>
                </div>
                <div className="text-xl md:text-2xl font-cooper text-white">
                    {isLoadingTokens ? (
                        <span className="animate-pulse">...</span>
                    ) : tokenStats ? (
                        tokenStats.eth.toFixed(2)
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/50 text-sm font-mundial mt-0.5">
                    {isLoadingTokens ? '...' : tokenStats ? formatUsd(tokenStats.ethUsd) : '—'}
                </p>
            </div>

            {/* CryptoPunks */}
            <div className="bg-gvc-dark/80 border border-gvc-gold/50 rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gvc-gold/20 hover:bg-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                    <Crown className="w-4 h-4 text-gvc-gold" />
                    <span className="text-white/60 font-mundial text-[10px] uppercase tracking-wider">CryptoPunks</span>
                </div>
                <div className="text-xl md:text-2xl font-cooper text-gvc-gold">
                    {isLoadingNfts ? (
                        <span className="animate-pulse">...</span>
                    ) : nftCounts ? (
                        nftCounts.cryptoPunksCount
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/50 text-sm font-mundial mt-0.5">
                    {isLoadingNfts ? '...' : nftCounts ? formatUsd(nftCounts.cryptoPunksUsd) : '—'}
                </p>
            </div>

            {/* GVC NFTs */}
            <div className="bg-gvc-dark/80 border border-gvc-gold/50 rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gvc-gold/20 hover:bg-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                    <img src="/shaka.png" alt="Shaka" className="w-auto h-4" />
                    <span className="text-white/60 font-mundial text-[10px] uppercase tracking-wider">GVC NFTs</span>
                </div>
                <div className="text-xl md:text-2xl font-cooper text-gvc-gold">
                    {isLoadingNfts ? (
                        <span className="animate-pulse">...</span>
                    ) : nftCounts ? (
                        nftCounts.gvcCount
                    ) : (
                        '—'
                    )}
                </div>
                <p className="text-white/50 text-sm font-mundial mt-0.5">
                    {isLoadingNfts ? '...' : nftCounts ? formatUsd(nftCounts.gvcUsd) : '—'}
                </p>
            </div>
        </motion.div>
    );
}
