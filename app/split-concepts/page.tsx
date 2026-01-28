'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Trophy, ArrowDown } from 'lucide-react';

const BroomIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 3v7" />
        <path d="M5 10h14a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a2 2 0 0 1 2-2z" />
        <path d="M3 14h18" />
        <path d="M12 14v8" />
        <path d="M8 14v8" />
        <path d="M16 14v8" />
        <path d="M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        <path d="M4 3l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" />
    </svg>
);

export default function SplitConceptsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20 font-mundial">
            <h1 className="text-3xl font-cooper text-gvc-gold mb-4 text-center">Split Concepts</h1>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
                Exploring ways to represent the two fee destinations as parts of the same step.
            </p>

            {/* CONCEPT 1: THE UNIFIED CARD */}
            <section className="mb-24">
                <h2 className="text-xl font-mono text-gvc-gold/50 mb-8 border-b border-white/10 pb-2">OPTION A: Unified "Dual-Chamber" Card</h2>
                <div className="max-w-4xl mx-auto">

                    {/* Source */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-gvc-dark border border-white/20 rounded-xl p-4 flex items-center gap-3">
                            <Coins className="w-6 h-6 text-gvc-gold" />
                            <span className="font-cooper font-bold uppercase">Protocol Fees (10%)</span>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center mb-4">
                        <ArrowDown className="text-white/20 w-6 h-6" />
                    </div>

                    {/* The Unified Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
                        {/* Shared Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gvc-gold/5 to-transparent pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            {/* Bucket 1 */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors">
                                <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-gvc-gold/20 group-hover:border-gvc-gold">
                                    <Trophy className="w-8 h-8 text-gvc-gold" />
                                </div>
                                <h3 className="text-xl font-cooper font-bold text-white uppercase mb-2">1/ GROWS THE REWARDS POOL</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    A % of the protocol fee automatically accrues as ETH to the VibeStrategy.eth Rewards wallet. This reserve is used to build the community Rewards Pool.
                                </p>
                            </div>

                            {/* Bucket 2 */}
                            <div className="p-8 md:p-12 text-center group hover:bg-white/5 transition-colors">
                                <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-gvc-gold/20 group-hover:border-gvc-gold">
                                    <BroomIcon className="w-8 h-8 text-gvc-gold" />
                                </div>
                                <h3 className="text-xl font-cooper font-bold text-white uppercase mb-2">2/ BUYS GVCS</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    A % of the protocol fee is used to buy GVCs off OpenSea. These are then added to the VibeStrategy treasury and re-listed at a premium. All sale proceeds buy & burn $VIBESTR.
                                </p>
                            </div>
                        </div>

                        {/* Unified Footer/Label */}
                        <div className="bg-black/40 py-3 text-center border-t border-white/10">
                            <span className="text-xs font-mono text-gvc-gold uppercase tracking-widest">Automatic Protocol Step</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* CONCEPT 2: THE CONNECTED HEADER */}
            <section className="mb-24">
                <h2 className="text-xl font-mono text-gvc-gold/50 mb-8 border-b border-white/10 pb-2">OPTION B: Shared Header Beam</h2>
                <div className="max-w-4xl mx-auto">

                    {/* The Beam */}
                    <div className="relative">
                        {/* Beam Top */}
                        <div className="bg-gvc-gold h-2 rounded-t-xl w-full shadow-[0_0_15px_rgba(255,224,72,0.4)]" />

                        {/* Beam Content */}
                        <div className="bg-stone-900 border-x border-b border-gvc-gold/30 p-4 text-center flex items-center justify-center gap-3">
                            <Coins className="w-5 h-5 text-gvc-gold" />
                            <span className="font-cooper font-bold text-white uppercase tracking-wide">10% FEE SPLIT AT PROTOCOL LEVEL</span>
                        </div>
                    </div>

                    {/* Columns connected to Beam */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Card */}
                        <div className="bg-white/5 border-l border-b border-r md:border-r-0 border-white/10 p-8 pt-10 text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gvc-gold/30 to-transparent" />
                            <Trophy className="w-10 h-10 text-white/80 mx-auto mb-4" />
                            <h3 className="text-lg font-cooper text-gvc-gold mb-2">1/ GROWS REWARDS</h3>
                            <p className="text-xs text-white/50">Accrues as ETH to VibeStrategy.eth wallet.</p>
                        </div>

                        {/* Right Card */}
                        <div className="bg-white/5 border-l md:border-l-1 border-r border-b border-white/10 p-8 pt-10 text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gvc-gold/30 to-transparent" />
                            <BroomIcon className="w-10 h-10 text-white/80 mx-auto mb-4" />
                            <h3 className="text-lg font-cooper text-gvc-gold mb-2">2/ BUYS GVCS</h3>
                            <p className="text-xs text-white/50">Buy & Burn $VIBESTR programmatically.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* CONCEPT 3: THE EMBEDDED CONTAINER */}
            <section className="mb-24">
                <h2 className="text-xl font-mono text-gvc-gold/50 mb-8 border-b border-white/10 pb-2">OPTION C: Nested Process Wrapper</h2>
                <div className="max-w-4xl mx-auto">

                    <div className="border border-white/10 rounded-3xl p-6 md:p-10 bg-white/5 relative overflow-hidden">
                        {/* Label tag */}
                        <div className="absolute top-0 right-0 bg-white/10 px-4 py-1 rounded-bl-xl border-b border-l border-white/10">
                            <span className="text-xs font-mono text-white/60">AUTOMATED SEQUENCE</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                            {/* Step A: Generation */}
                            <div className="md:col-span-4 text-center md:text-right flex flex-col items-center md:items-end">
                                <div className="mb-4 p-4 bg-stone-900 rounded-full border border-gvc-gold text-gvc-gold shadow-[0_0_20px_rgba(255,224,72,0.1)]">
                                    <Coins className="w-8 h-8" />
                                </div>
                                <h3 className="font-cooper text-white text-lg leading-tight mb-2">FEES GENERATED</h3>
                                <p className="text-xs text-white/50 max-w-[200px]">10% of volume is reserved and instantly split.</p>
                            </div>

                            {/* Connector */}
                            <div className="md:col-span-1 flex md:flex-col items-center justify-center">
                                <div className="w-[2px] h-12 md:h-full md:w-full md:h-[2px] bg-white/10 relative">
                                    <div className="absolute inset-0 bg-gvc-gold opacity-50 blur-[2px]" />
                                    {/* Arrow Head for Desktop */}
                                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-gvc-gold rotate-45" />
                                    {/* Arrow Head for Mobile */}
                                    <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-r-2 border-b-2 border-gvc-gold rotate-45" />
                                </div>
                            </div>

                            {/* Step B: The buckets */}
                            <div className="md:col-span-7 grid grid-cols-1 gap-4">
                                {/* Bucket 1 Item */}
                                <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:border-gvc-gold/50 transition-colors">
                                    <div className="p-2 bg-white/5 rounded-lg shrink-0 text-gvc-gold">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-cooper text-white text-sm mb-1">1/ GROWS REWARDS</h4>
                                        <p className="text-white/40 text-xs text-left">Accrues as ETH to build the pool.</p>
                                    </div>
                                </div>

                                {/* Bucket 2 Item */}
                                <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:border-gvc-gold/50 transition-colors">
                                    <div className="p-2 bg-white/5 rounded-lg shrink-0 text-gvc-gold">
                                        <BroomIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-cooper text-white text-sm mb-1">2/ BUYS GVCS</h4>
                                        <p className="text-white/40 text-xs text-left">Buys floor items & burns $VIBESTR.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
