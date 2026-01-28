'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, TrendingUp, Coins, Trophy } from 'lucide-react';

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

export default function LayoutOptions() {
    return (
        <div className="min-h-screen bg-gvc-black text-white p-8 space-y-20">
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-cooper text-gvc-gold mb-4">Layout Options</h1>
                <p className="text-white/60">Exploring different structures for the "How It Works" flow.</p>
            </header>

            {/* VARIANT 1: HORIZONTAL CIRCUIT */}
            <section className="max-w-6xl mx-auto border-t border-white/10 pt-10">
                <h2 className="text-2xl font-cooper text-gvc-gold mb-8 text-center">Option A: Horizontal Circuit</h2>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 relative">

                    {/* Step 1 */}
                    <div className="flex-1 bg-gvc-dark border border-white/20 rounded-xl p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                        <h3 className="text-lg font-cooper font-bold uppercase">USERS TRADE $VIBESTR</h3>
                        <p className="text-white/60 text-xs font-mundial mt-2">On either OpenSea or TokenWorks.</p>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-white/20 self-center" />

                    {/* Step 2 */}
                    <div className="flex-1 bg-gvc-dark border border-white/20 rounded-xl p-6 text-center">
                        <Coins className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                        <h3 className="text-lg font-cooper font-bold uppercase">PROTOCOL GENERATES FEES</h3>
                        <p className="text-white/60 text-xs font-mundial mt-2"><span className="font-bold text-gvc-gold">10%</span> of buy and sell volume is taken as a fee.</p>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-white/20 self-center" />

                    {/* Split Container */}
                    <div className="flex-[2] flex flex-col gap-4">
                        <div className="bg-gvc-dark border border-gvc-gold/30 rounded-xl p-4 flex items-center gap-4">
                            <Trophy className="w-8 h-8 text-gvc-gold shrink-0" />
                            <div className="text-left">
                                <h3 className="text-sm font-cooper font-bold uppercase">ADDS TO REWARDS POOL</h3>
                                <p className="text-white/60 text-xs font-mundial">10% accrues as ETH to Rewards wallet.</p>
                            </div>
                        </div>
                        <div className="bg-gvc-dark border border-gvc-gold/30 rounded-xl p-4 flex items-center gap-4">
                            <BroomIcon className="w-8 h-8 text-gvc-gold shrink-0" />
                            <div className="text-left">
                                <h3 className="text-sm font-cooper font-bold uppercase">BUYS GVCS OFF FLOOR</h3>
                                <p className="text-white/60 text-xs font-mundial">80% buys GVCs, re-listed at premium. Proceeds burn $VIBESTR.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center my-4">
                    <ArrowDown className="w-6 h-6 text-white/20" />
                </div>

                {/* Final */}
                <div className="bg-gradient-to-br from-gvc-gold/10 to-transparent border border-gvc-gold rounded-xl p-8 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-cooper font-bold text-gvc-gold uppercase">BADGE COLLECTORS WIN!</h3>
                    <p className="text-white/80 font-mundial mt-2">More badges = greater access to the Rewards Pool.</p>
                </div>
            </section>


            {/* VARIANT 2: VERTICAL TIMELINE */}
            <section className="max-w-3xl mx-auto border-t border-white/10 pt-10 relative">
                <h2 className="text-2xl font-cooper text-gvc-gold mb-12 text-center">Option B: Vertical Timeline</h2>

                <div className="absolute left-1/2 top-24 bottom-24 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block"></div>

                {/* Item Left */}
                <div className="flex flex-col md:flex-row items-center mb-12 relative">
                    <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
                        <h3 className="text-xl font-cooper font-bold text-gvc-gold uppercase">USERS TRADE $VIBESTR</h3>
                        <p className="text-white/60 text-sm font-mundial">On either OpenSea or TokenWorks.</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 p-2 bg-gvc-black border border-gvc-gold rounded-full z-10 hidden md:block">
                        <TrendingUp className="w-6 h-6 text-gvc-gold" />
                    </div>
                    <div className="md:w-1/2 order-3 md:order-2"></div>
                </div>

                {/* Item Right */}
                <div className="flex flex-col md:flex-row items-center mb-12 relative">
                    <div className="md:w-1/2 order-2 md:order-1"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 p-2 bg-gvc-black border border-gvc-gold rounded-full z-10 hidden md:block">
                        <Coins className="w-6 h-6 text-gvc-gold" />
                    </div>
                    <div className="md:w-1/2 md:pl-12 text-center md:text-left order-3 md:order-2">
                        <h3 className="text-xl font-cooper font-bold text-gvc-gold uppercase">PROTOCOL GENERATES FEES</h3>
                        <p className="text-white/60 text-sm font-mundial"><span className="font-bold text-gvc-gold">10%</span> of buy and sell volume is taken as a fee.</p>
                    </div>
                </div>

                {/* Split Items */}
                <div className="flex flex-col md:flex-row gap-6 justify-between relative z-10 mb-12">
                    <div className="flex-1 bg-gvc-dark border border-white/20 rounded-xl p-6 text-center mx-4">
                        <Trophy className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                        <h3 className="text-md font-cooper font-bold uppercase">ADDS TO THE REWARDS POOL</h3>
                        <p className="text-white/60 text-xs font-mundial"><span className="font-bold text-gvc-gold">10%</span> accrues as ETH.</p>
                    </div>
                    <div className="flex-1 bg-gvc-dark border border-white/20 rounded-xl p-6 text-center mx-4">
                        <BroomIcon className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                        <h3 className="text-md font-cooper font-bold uppercase">BUYS GVCS OFF THE FLOOR</h3>
                        <p className="text-white/60 text-xs font-mundial"><span className="font-bold text-gvc-gold">80%</span> buys GVCs.</p>
                    </div>
                </div>

                <div className="text-center relative z-20">
                    <div className="inline-block bg-gvc-gold text-gvc-black px-8 py-4 rounded-full font-cooper font-bold text-xl uppercase shadow-[0_0_30px_rgba(255,224,72,0.4)]">
                        BADGE COLLECTORS WIN!
                    </div>
                </div>
            </section>


            {/* VARIANT 3: BENTO GRID */}
            <section className="max-w-4xl mx-auto border-t border-white/10 pt-10">
                <h2 className="text-2xl font-cooper text-gvc-gold mb-8 text-center">Option C: Bento Grid</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* Trade + Fees */}
                    <div className="md:col-span-1 bg-gvc-dark border border-white/20 rounded-2xl p-6 flex flex-col justify-between">
                        <TrendingUp className="w-8 h-8 text-gvc-gold" />
                        <div>
                            <h3 className="text-lg font-cooper font-bold uppercase leading-tight mb-2">USERS TRADE $VIBESTR</h3>
                            <p className="text-white/50 text-xs">Trading activity generates volume.</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-gvc-dark border border-white/20 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-gvc-gold/10 rounded-full blur-2xl"></div>
                        <div className="flex justify-between items-start">
                            <Coins className="w-8 h-8 text-gvc-gold" />
                            <span className="bg-gvc-gold/20 text-gvc-gold text-xs px-2 py-1 rounded font-bold">10% FEE</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-cooper font-bold uppercase mb-2">PROTOCOL GENERATES FEES</h3>
                            <p className="text-white/60 text-sm">Every transaction contributes to the ecosystem sustainability.</p>
                        </div>
                    </div>

                    {/* Split */}
                    <div className="md:col-span-1 bg-gradient-to-br from-gvc-dark to-gvc-black border border-gvc-gold/30 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2">
                        <Trophy className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-sm font-cooper font-bold text-gvc-gold uppercase">REWARDS POOL</h3>
                        <p className="text-white/50 text-xs">10% accrues as ETH</p>
                    </div>

                    <div className="md:col-span-1 bg-gradient-to-br from-gvc-dark to-gvc-black border border-gvc-gold/30 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2">
                        <BroomIcon className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-sm font-cooper font-bold text-gvc-gold uppercase">BUY GVCs</h3>
                        <p className="text-white/50 text-xs">80% sweeps the floor</p>
                    </div>

                    {/* Win */}
                    <div className="md:col-span-1 bg-gvc-gold text-gvc-black rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-2xl font-cooper font-bold uppercase leading-none">BADGE COLLECTORS WIN!</h3>
                    </div>

                </div>
            </section>

        </div>
    );
}
