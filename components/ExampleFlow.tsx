'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, ShoppingCart, RefreshCw, Banknote, Flame, ArrowDown, ChevronsDown } from 'lucide-react';

export default function ExampleFlow() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-4">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-4"
            >
                {/* Step 1: Volume */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <TrendingUp className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-xl font-cooper font-bold text-white uppercase">$VIBESTR SEES $1M VOLUME</h3>
                    </div>
                    <p className="text-white/60 font-mundial text-sm">
                        Simulated daily trading volume across all markets.
                    </p>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ChevronsDown className="w-12 h-12 text-white/50 animate-bounce" />
                </motion.div>

                {/* Step 2: The Split (Fork) */}
                <motion.div
                    variants={item}
                    className="w-full max-w-4xl mx-auto"
                >
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-b from-gvc-gold/5 to-transparent pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            {/* 2A: Buys GVCs */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors">
                                <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-gvc-gold/20 group-hover:border-gvc-gold">
                                    <ShoppingCart className="w-8 h-8 text-gvc-gold" />
                                </div>
                                <h3 className="text-xl font-cooper font-bold text-white uppercase mb-4">2A/ $80,000 (8%) BUYS GVCs</h3>
                                <div className="text-white/60 text-sm font-mundial leading-relaxed space-y-2">
                                    <p>Reserved as fees and used to buy GVCs.</p>
                                    <p className="font-bold text-gvc-gold">This would buy ~30 GVCs per day</p>
                                    <p className="text-xs italic opacity-70">(If ETH = $3,000 & GVC Floor = 0.9 ETH)</p>
                                </div>
                            </div>

                            {/* 2B: Rewards Pool */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors">
                                <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-gvc-gold/20 group-hover:border-gvc-gold">
                                    <Trophy className="w-8 h-8 text-gvc-gold" />
                                </div>
                                <h3 className="text-xl font-cooper font-bold text-white uppercase mb-4">2B/ $10,000 (1%) TO REWARDS</h3>
                                <div className="text-white/60 text-sm font-mundial leading-relaxed space-y-2">
                                    <p>Accrues to the Rewards Pool.</p>
                                    <p className="text-xs italic opacity-70">Used to buy $VIBESTR, GVC NFTs, $PNKSTR, etc. and reward Badgeholders.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Arrow connecting from 2A flow mainly */}
                <motion.div variants={item} className="relative">
                    <ChevronsDown className="w-12 h-12 text-white/50 animate-bounce" />
                    {/* Visual cue that this follows 2A */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[10px] text-white/30 font-mono hidden md:block">
                        FROM STEP 2A
                    </div>
                </motion.div>

                {/* Step 3: Relisting */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <RefreshCw className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-xl font-cooper font-bold text-white uppercase">3/ TREASURY RELISTING</h3>
                    </div>
                    <div className="text-white/60 font-mundial text-sm space-y-2">
                        <p>Those 30 GVCs are relisted at 1.2-1.5x the purchase price.</p>
                        <p className="text-gvc-gold font-bold">1.2 ETH Average (Randomized Premium)</p>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ChevronsDown className="w-12 h-12 text-white/50 animate-bounce" />
                </motion.div>

                {/* Step 4: Buy Pressure */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Banknote className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-xl font-cooper font-bold text-white uppercase">4/ MARKET BUY PRESSURE</h3>
                    </div>
                    <div className="text-white/60 font-mundial text-sm space-y-2">
                        <p>Every GVC that sells uses proceeds to buy $VIBESTR.</p>
                        <p className="text-gvc-gold font-bold text-lg">36 ETH Buy Pressure (1.2 ETH x 30)</p>
                        <p className="text-xs italic opacity-70">At $0.01, that = 9.6M $VIBESTR</p>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ChevronsDown className="w-12 h-12 text-white/50 animate-bounce" />
                </motion.div>

                {/* Step 5: Burn */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gradient-to-b from-red-900/20 to-gvc-dark border border-red-500/30 rounded-xl p-8 w-full max-w-lg text-center backdrop-blur-sm cursor-default transition-colors hover:border-red-500/60"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Flame className="w-10 h-10 text-red-500 animate-pulse" />
                        <h3 className="text-2xl font-cooper font-bold text-white uppercase">5/ SUPPLY BURNED</h3>
                    </div>
                    <div className="text-white/80 font-mundial text-base space-y-2">
                        <p>The purchased $VIBESTR is burned forever.</p>
                        <p className="text-3xl font-bold text-red-500 my-4">9.6M $VIBESTR</p>
                        <p className="text-sm opacity-60 font-mono">THAT = 0.96% OF TOTAL SUPPLY</p>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
