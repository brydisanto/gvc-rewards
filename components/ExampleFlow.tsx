'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StepRibbon = ({ text }: { text: string }) => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/90 border border-gvc-gold/40 px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
        <span className="text-[10px] md:text-xs font-mono text-gvc-gold tracking-widest uppercase font-bold italic">
            {text}
        </span>
    </div>
);

const ConnectingLine = () => (
    <div className="flex justify-center h-12">
        <div className="w-0.5 h-full bg-white/20"></div>
    </div>
);

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
                className="flex flex-col items-center space-y-0" // Removed space-y-4 to control spacing manually with lines
            >
                {/* Intro Header */}
                <motion.div variants={item} className="mb-12 text-center max-w-2xl px-4">
                    <h2 className="text-gvc-gold font-mundial font-bold tracking-widest text-sm md:text-base uppercase leading-relaxed">
                        BELOW IS A SIMULATED EXAMPLE OF HOW REAL $$$ FLOWS THROUGH THE VIBESTRATEGY PROTOCOL AS $VIBESTR & GVCS TRADE ON THE MARKET.
                    </h2>
                </motion.div>

                {/* Step 1: Volume */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-10 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 1" />
                    <div className="flex items-center justify-center gap-3">
                        <h3 className="text-xl md:text-2xl font-cooper font-bold text-white uppercase leading-tight">
                            $VIBESTR SEES $1M IN DAILY TRADING VOLUME
                        </h3>
                    </div>
                </motion.div>

                {/* Line */}
                <motion.div variants={item}>
                    <ConnectingLine />
                </motion.div>

                {/* Step 2: The Split (Fork) */}
                <motion.div
                    variants={item}
                    className="w-full max-w-4xl mx-auto"
                >
                    {/* Overflow visible to show ribbons, standard borders applied to grid items to mimic card look */}
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                            {/* 2A: Buys GVCs */}
                            {/* On desktop: rounded-l-2xl, border-y, border-l, border-r (split). On mobile: rounded-xl, border all */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        $80,000 (8%) IS RESERVED AS FEES AND USED TO BUY GVCS
                                    </p>
                                    <p className="text-gvc-gold text-base md:text-lg font-mundial leading-relaxed">
                                        The protocol would buy ~30 GVCs from OpenSea and add them to the VibeStrategy treasury.
                                    </p>
                                    <p className="text-xs italic text-white/50 font-mundial">(IF ETH = $3,000 & THE GVC FLOOR IS .9ETH)</p>
                                </div>
                            </div>

                            {/* 2B: Rewards Pool */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        $10,000 (1%) ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/80 text-sm font-mundial leading-relaxed">
                                        This is used to buy $VIBESTR, GVC NFTs and more as rewards for badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Line Connecting 2A to Step 3 */}
                {/* On desktop, this needs to align with the left column (2A). On mobile, it just centers below the block. */}
                <motion.div variants={item} className="w-full max-w-4xl relative h-12">
                    <div className="w-full h-full flex md:block justify-center">
                        <div className="w-0.5 h-full bg-white/20 md:ml-[25%]"></div>
                    </div>
                </motion.div>

                {/* Step 3: Relisting */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-10 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 3" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            THE PROTOCOL RELISTS THOSE 30 GVCS AT 1.2-1.5X THE PURCHASE PRICE
                        </p>
                        <p className="text-gvc-gold font-bold font-mundial">1.2 ETH Average (Randomized Premium)</p>
                    </div>
                </motion.div>

                {/* Line */}
                <motion.div variants={item}>
                    <ConnectingLine />
                </motion.div>

                {/* Step 4: Buy Pressure */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-10 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 4" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            PROCEEDS FROM EVERY PROTOCOL GVC THAT SELLS IS USED TO PURCHASE $VIBESTR
                        </p>
                        <p className="text-gvc-gold text-base font-bold font-mundial">Unleashes 36 ETH Buy Pressure (1.2 ETH x 30)</p>
                        <p className="text-xs italic opacity-70 font-mundial">At $0.01, that = 9.6M $VIBESTR</p>
                    </div>
                </motion.div>

                {/* Line */}
                <motion.div variants={item}>
                    <ConnectingLine />
                </motion.div>

                {/* Step 5: Burn */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gradient-to-b from-red-900/20 to-gvc-dark border border-red-500/30 rounded-xl p-8 pt-12 w-full max-w-lg text-center backdrop-blur-sm cursor-default transition-colors hover:border-red-500/60"
                >
                    <StepRibbon text="STEP 5" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-xl leading-tight uppercase">9.6M $VIBESTR IS BURNED FOREVER</p>
                        <p className="text-sm opacity-60 font-mono font-mundial">THAT = 0.96% OF THE TOTAL SUPPLY</p>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
