'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, TrendingUp, X } from 'lucide-react';

interface TotalValueDisplayProps {
    totalUsd: number;
    ethInflow: number;
    isLoading: boolean;
    onChartClick: () => void;
    isWiggling?: boolean;
}

export default function TotalValueDisplay({ totalUsd, ethInflow, isLoading, onChartClick, isWiggling = false }: TotalValueDisplayProps) {
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 100 }}
            className="w-full max-w-3xl mx-auto mt-10 mb-4"
        >
            <div
                className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center cursor-pointer group"
                onClick={onChartClick}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,224,72,0.15), rgba(255,224,72,0.05))',
                    border: '2px solid rgba(255,224,72,0.5)',
                }}
            >
                {/* Shimmer Effect */}
                <div
                    className="absolute inset-0 animate-shimmer opacity-30"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        backgroundSize: '200% 100%',
                    }}
                />

                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-white/60 font-mundial text-sm uppercase tracking-[0.2em]">
                            ESTIMATED REWARDS POOL VALUE
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            key={totalUsd}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-cooper text-gvc-gold glowing-text group-hover:scale-[1.02] transition-transform"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">...</span>
                            ) : (
                                formatUsd(totalUsd).split(',').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="mx-[2px]">,</span>}
                                    </span>
                                ))
                            )}
                        </motion.div>

                        {/* Wiggling Shaka */}
                        <motion.img
                            src="/shaka.png"
                            alt="Shaka"
                            className="h-12 w-auto md:h-16 lg:h-20"
                            animate={isWiggling ? {
                                rotate: [0, -15, 15, -15, 15, -10, 10, 0],
                                scale: [1, 1.1, 1.1, 1.1, 1.1, 1.05, 1.05, 1],
                            } : {}}
                            transition={{
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* Today's change - ETH Inflow */}
                    {!isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="flex items-center justify-center gap-2 mt-4"
                        >
                            <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 rounded-lg px-4 py-1.5">
                                <ArrowUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-mundial font-bold text-sm">
                                    {ethInflow.toFixed(2)} ETH added today
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Footnote */}
            <div className="text-center mt-3">
                <p className="text-[10px] md:text-xs text-white/30 font-mundial tracking-wide">
                    Rewards are held in the{' '}
                    <a
                        href="https://opensea.io/vibestrategy.eth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-white transition-colors underline decoration-white/30"
                    >
                        VibeStrategy.eth
                    </a>
                    {' '}wallet
                </p>
            </div>
        </motion.div>
    );
}

interface ChartModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function ChartModal({ isOpen, onClose, children }: ChartModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed inset-4 md:inset-12 lg:inset-24 bg-gvc-dark border-2 border-gvc-gold/50 rounded-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gvc-gray">
                            <h2 className="text-gvc-gold font-cooper text-2xl md:text-3xl">
                                REWARDS POOL VALUE HISTORY
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6 text-white/60 hover:text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 md:p-6 overflow-auto">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
