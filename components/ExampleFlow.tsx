'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Flame, RefreshCw } from 'lucide-react';

const StepRibbon = ({ text }: { text: string }) => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/90 border border-gvc-gold/40 px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
        <span className="text-[10px] md:text-xs font-mono text-gvc-gold tracking-widest uppercase font-bold italic">
            {text}
        </span>
    </div>
);

const ConnectingLine = () => (
    <div className="flex flex-col items-center justify-center h-20 relative overflow-hidden">
        {/* Static Line */}
        <div className="w-0.5 h-full bg-white/10" />

        {/* Animated Flow Packet */}
        <motion.div
            className="absolute top-0 w-0.5 h-8 bg-gradient-to-b from-transparent via-gvc-gold to-transparent"
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Arrow Head */}
        <div className="absolute bottom-0 text-white/50">
            <ChevronDown className="w-6 h-6" />
        </div>
    </div>
);

// Feedback Loop Arrow (The Swoosh - Option A style)
const FeedbackLoopArrow = () => (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible z-0">
        <svg className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="gradLoop" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                </linearGradient>
                <marker id="arrowhead-gold" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#D4AF37" />
                </marker>
            </defs>
            <path
                d="M calc(50% - 240px) 1150 C calc(50% - 350px) 1150, calc(50% - 350px) 200, calc(50% - 240px) 200"
                fill="none"
                stroke="url(#gradLoop)"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead-gold)"
                className="opacity-60"
            >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="30s" repeatCount="indefinite" />
            </path>
        </svg>
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
        <div className="w-full max-w-4xl mx-auto mt-8 mb-20 px-4 relative">

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-0 relative"
            >
                {/* Intro Header */}
                <motion.div variants={item} className="mb-12 text-center max-w-2xl px-4 z-10 relative">
                    <h2 className="text-gvc-gold font-mundial font-bold tracking-widest text-sm md:text-base uppercase leading-relaxed">
                        BELOW IS A SIMULATED EXAMPLE TO SHOW HOW $$$ AUTOMATICALLY FLOWS THROUGH THE VIBESTRATEGY PROTOCOL AS $VIBESTR & GOOD VIBES CLUB NFTS TRADE ON THE MARKET.
                    </h2>
                </motion.div>

                {/* Global Feedback Loop Arrow */}
                <FeedbackLoopArrow />

                {/* Step 1: Volume */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 1" />
                    <div className="flex items-center justify-center gap-3">
                        <h3 className="text-xl md:text-2xl font-cooper font-bold text-white uppercase leading-tight">
                            $VIBESTR HITS <span className="text-gvc-gold">$1M</span> IN DAILY TRADING VOLUME
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
                    className="w-full max-w-4xl mx-auto z-10 relative"
                >
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                            {/* 2A: Buys GVCs */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-3">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        <span className="text-gvc-gold">$80,000 (8%)</span> IS RESERVED AS FEES AND AUTOMATICALLY BUYS GVCS
                                    </p>
                                    <p className="text-white/60 text-base font-mundial leading-tight px-2">
                                        The protocol buys <span className="text-gvc-gold font-bold">30 GVCs</span> from the OpenSea floor and adds them to the treasury.
                                    </p>
                                    <p className="text-xs italic text-white/40 font-mundial mt-2">(If ETH = $3,000 & the GVC floor is .9ETH)</p>
                                </div>
                                {/* Visual cue for continuation downwards - Desktop only */}
                                <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white/20 rounded-full z-20"></div>
                            </div>

                            {/* 2B: Rewards Pool */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-3">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        <span className="text-gvc-gold">$10,000 (1%)</span> ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/60 text-base font-mundial leading-tight px-2">
                                        This is used to buy $VIBESTR, GVC NFTs, $PNKSTR and more as rewards for Badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Line Connecting 2A to Step 3 */}
                <motion.div variants={item} className="w-full max-w-4xl relative">
                    <div className="w-full flex md:block justify-center">
                        {/* Wrapper to position line correctly under left column on desktop */}
                        <div className="md:w-1/2 flex justify-center">
                            <ConnectingLine />
                        </div>
                    </div>
                </motion.div>

                {/* Step 3: Relisting */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 3" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            THE PROTOCOL IMMEDIATELY RELISTS THE <span className="text-gvc-gold">30 GVCS</span> AT A PREMIUM
                        </p>
                        <p className="text-white/60 font-mundial text-base leading-tight">
                            They're automatically relisted on OpenSea at <span className="text-gvc-gold font-bold">~1.2 ETH</span>. They never move until sold.
                        </p>
                        <p className="text-xs italic text-white/40 font-mundial">(Uses a randomized premium between 1.2-1.5x)</p>
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
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 4" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            AS THE <span className="text-gvc-gold">30 GVCS</span> SELL, THE PROTOCOL AUTOMATICALLY BUYS $VIBESTR
                        </p>
                        <p className="text-white/60 text-base font-mundial leading-tight">
                            This purchases <span className="text-gvc-gold font-bold">~36 ETH</span> worth of $VIBESTR once all 30 GVCs are sold.
                        </p>
                        <p className="text-xs italic text-white/40 font-mundial">(At $0.01, that = 9.6M $VIBESTR)</p>
                    </div>
                </motion.div>

                {/* Lines Forking to Step 5 Outcomes */}
                <motion.div variants={item} className="w-full max-w-4xl mx-auto">
                    <div className="flex justify-center relative h-16">
                        {/* Fork Graphic */}
                        <div className="absolute top-0 w-0.5 h-8 bg-white/10"></div>
                        <div className="absolute top-8 w-[50%] h-8 border-t-2 border-l-2 border-r-2 border-white/10 rounded-t-xl"></div>
                    </div>
                </motion.div>

                {/* Step 5 Outcomes: Burn & Volume */}
                <motion.div
                    variants={item}
                    className="w-full max-w-4xl mx-auto z-10 relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Burn Box (Step 5) */}
                        <div className="relative w-full">
                            <StepRibbon text="STEP 5" />
                            <div className="bg-[#111] border border-gvc-orange rounded-[32px] p-8 pt-16 w-full text-center overflow-hidden shadow-[0_0_30px_rgba(255,100,0,0.15)] h-full flex flex-col justify-center">
                                {/* Interactive glow effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-orange-500/5 to-transparent animate-pulse pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flame className="w-5 h-5 text-gvc-orange fill-gvc-orange animate-pulse" />
                                        <h3 className="text-white font-mundial font-bold tracking-widest text-sm uppercase">
                                            $VIBESTR BURNED
                                        </h3>
                                    </div>
                                    <p className="font-cooper font-bold text-gvc-orange text-4xl md:text-5xl leading-none tracking-tight">
                                        9.6M
                                    </p>
                                    <p className="text-white/60 font-mundial text-sm pt-2 px-4 leading-tight">
                                        All $VIBESTR purchased by the protocol is automatically burned.
                                    </p>
                                    <p className="text-gvc-green font-mundial font-bold text-sm pt-2">
                                        That = 0.96% of the total supply
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Green Box (Volume Loop) */}
                        <div className="relative w-full">
                            <div className="bg-[#111] border border-gvc-green rounded-[32px] p-8 pt-16 w-full text-center overflow-hidden shadow-[0_0_30px_rgba(0,255,100,0.15)] h-full flex flex-col justify-center">
                                {/* Interactive glow effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-green-500/5 to-transparent animate-pulse pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <RefreshCw className="w-5 h-5 text-gvc-green animate-spin-slow" />
                                        <h3 className="text-white font-mundial font-bold tracking-widest text-sm uppercase">
                                            CYCLE CONTINUES
                                        </h3>
                                    </div>

                                    <p className="font-cooper font-bold text-gvc-green text-2xl md:text-3xl leading-tight uppercase">
                                        GENERATES 36 ETH IN NEW TRADING VOLUME
                                    </p>

                                    <p className="text-white/60 font-mundial font-bold text-sm leading-relaxed max-w-[200px] mx-auto">
                                        On and on it goes. Forever. Automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
