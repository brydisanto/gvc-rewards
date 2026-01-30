'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

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
        <div className="w-full max-w-4xl mx-auto mt-8 mb-20 px-4">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-4"
            >
                {/* Intro Header */}
                <motion.div variants={item} className="mb-8 text-center max-w-2xl">
                    <h2 className="text-gvc-gold font-mundial font-bold tracking-widest text-sm md:text-base uppercase leading-relaxed">
                        BELOW IS A SIMULATED EXAMPLE OF HOW REAL $$$ FLOWS AS $VIBESTR TRADES.
                    </h2>
                </motion.div>

                {/* Step 1: Volume */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h3 className="text-lg md:text-xl font-cooper font-bold text-white uppercase">$VIBESTR SEES $1M IN DAILY TRADING VOLUME</h3>
                    </div>
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
                            {/* 2A: Buys GVCs - Continues Flow */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors relative">
                                <h3 className="text-lg md:text-xl font-cooper font-bold text-white uppercase mb-4">STEP 2A</h3>
                                <div className="text-white/60 text-sm font-mundial leading-relaxed space-y-2">
                                    <p className="font-bold text-white uppercase mb-2">$80,000 (8%) IS RESERVED AS FEES AND USED TO BUY GVCS</p>
                                    <p className="text-gvc-gold">THIS WOULD BUY ~30 GVCS PER DAY</p>
                                    <p className="text-xs italic opacity-70">(IF ETH = $3,000 & THE GVC FLOOR IS .9ETH)</p>
                                </div>
                                {/* Visual cue for continuation downwards */}
                                <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gvc-gold rounded-full z-20"></div>
                            </div>

                            {/* 2B: Rewards Pool - Endpoint */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors">
                                <h3 className="text-lg md:text-xl font-cooper font-bold text-white uppercase mb-4">STEP 2B</h3>
                                <div className="text-white/60 text-sm font-mundial leading-relaxed space-y-2">
                                    <p className="font-bold text-white uppercase mb-2">$10,000 (1%) ACCRUES TO THE REWARDS POOL</p>
                                    <p>THIS IS USED TO BUY $VIBESTR, GVC NFTS, $PNKSTR, ETC AND REWARD BADGEHOLDERS.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Arrow connecting specifically from 2A side */}
                <motion.div variants={item} className="relative w-full max-w-4xl h-12">
                    {/* Centered arrow that visually aligns with left column on desktop if possible, but centered is safer for mobile. 
                       Let's try to align it to the left column (2A) on desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 md:left-1/4 md:translate-x-0 flex justify-center w-full md:w-auto">
                        <ChevronsDown className="w-12 h-12 text-white/50 animate-bounce relative z-10" />
                        {/* Line connector from 2A bottom dot */}
                        <div className="hidden md:block absolute bottom-full left-1/2 w-0.5 h-8 bg-white/20 -translate-x-1/2"></div>
                    </div>
                </motion.div>

                {/* Step 3: Relisting */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h3 className="text-lg md:text-xl font-cooper font-bold text-white uppercase">STEP 3</h3>
                    </div>
                    <div className="text-white/60 font-mundial text-sm space-y-2">
                        <p className="uppercase font-bold text-white">THOSE 30 GVCS ARE RELISTED BY THE PROTOCOL AT 1.2-1.5X THE PURCHASE PRICE</p>
                        <p className="text-gvc-gold">1.2 ETH Average (Randomized Premium)</p>
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
                        <h3 className="text-lg md:text-xl font-cooper font-bold text-white uppercase">STEP 4</h3>
                    </div>
                    <div className="text-white/60 font-mundial text-sm space-y-2">
                        <p className="uppercase font-bold text-white">PROCEEDS FROM EVERY GVC THAT SELLS ARE USED TO PURCHASE $VIBESTR</p>
                        <p className="text-gvc-gold text-base">Unleashes 36 ETH Buy Pressure (1.2 ETH x 30)</p>
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
                        <h3 className="text-2xl font-cooper font-bold text-white uppercase">STEP 5</h3>
                    </div>
                    <div className="text-white/80 font-mundial text-base space-y-2">
                        <p className="uppercase font-bold text-white">9.6M $VIBESTR IS BURNED FOREVER</p>
                        <p className="text-3xl font-bold text-red-500 my-4">FATAL BURN</p>
                        <p className="text-sm opacity-60 font-mono">THAT = 0.96% OF THE TOTAL SUPPLY</p>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
