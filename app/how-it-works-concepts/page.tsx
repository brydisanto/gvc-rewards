'use client';

import { motion } from 'framer-motion';
import { Users, Coins, Percent, Store, Trophy, ArrowRight, ArrowDown } from 'lucide-react';

export default function HowItWorksConcepts() {
    return (
        <main className="min-h-screen bg-gvc-black text-white p-8 md:p-12 overflow-x-hidden space-y-32">
            <h1 className="text-4xl md:text-5xl font-cooper text-gvc-gold glowing-text text-center">HOW IT WORKS: CONCEPTS</h1>

            {/* CONCEPT 1: NEON TIMELINE */}
            <section className="max-w-4xl mx-auto">
                <p className="text-white/50 text-xs tracking-widest font-mono text-center mb-12">CONCEPT 1: NEON TIMELINE (ENHANCED CURRENT)</p>
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gvc-gold/50 to-transparent -translate-x-1/2 rounded-full hidden md:block" />

                    <div className="space-y-12 relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="hidden md:block w-1/2 text-right pr-12">
                                <h3 className="text-2xl font-cooper text-gvc-gold">1. Users Trade</h3>
                                <p className="text-white/60 font-mundial">Buying and selling $VIBESTR on Uniswap</p>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gvc-gold blur-lg opacity-20" />
                                <div className="bg-gvc-dark border border-gvc-gold text-gvc-gold p-4 rounded-full relative z-10">
                                    <Users className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="md:hidden text-center">
                                <h3 className="text-xl font-cooper text-gvc-gold">1. Users Trade</h3>
                                <p className="text-white/60 text-sm">Buying and selling on Uniswap</p>
                            </div>
                            <div className="hidden md:block w-1/2 pl-12"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="hidden md:block w-1/2"></div>
                            <div className="relative">
                                <div className="bg-gvc-dark border border-white/20 text-white p-4 rounded-full relative z-10">
                                    <Coins className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="md:w-1/2 text-center md:text-left md:pl-12">
                                <h3 className="text-2xl font-cooper text-white">2. Fees Generated</h3>
                                <p className="text-white/60 font-mundial">A portion of every transaction is collected</p>
                            </div>
                        </div>

                        {/* Split Connector */}
                        <div className="hidden md:block relative h-16 w-full my-4">
                            <div className="absolute left-1/2 top-0 h-1/2 w-0.5 bg-gvc-gold/50 -translate-x-1/2"></div>
                            <div className="absolute left-[calc(50%-9rem)] right-[calc(50%-9rem)] top-1/2 h-0.5 bg-gvc-gold/50 rounded-full"></div>
                            <div className="absolute left-[calc(50%-9rem)] top-1/2 h-full w-0.5 bg-gvc-gold/50">
                                <ArrowDown className="absolute -bottom-2 -left-3 w-6 h-6 text-gvc-gold" />
                            </div>
                            <div className="absolute right-[calc(50%-9rem)] top-1/2 h-full w-0.5 bg-gvc-gold/50">
                                <ArrowDown className="absolute -bottom-2 -left-3 w-6 h-6 text-gvc-gold" />
                            </div>
                        </div>

                        {/* Step 3 (Split) */}
                        <div className="flex flex-col md:flex-row items-center gap-6 justify-center relative z-20">
                            <div className="bg-gvc-dark/50 border border-white/10 p-6 rounded-xl text-center w-64 md:mr-12 backdrop-blur-sm">
                                <Percent className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                                <h4 className="font-bold">1% to Rewards</h4>
                                <p className="text-xs text-white/50">Directly deposited to pool</p>
                            </div>
                            <div className="bg-gvc-dark/50 border border-white/10 p-6 rounded-xl text-center w-64 md:ml-12 backdrop-blur-sm">
                                <Store className="w-8 h-8 text-gvc-gold mx-auto mb-2" />
                                <h4 className="font-bold">8% buys NFTs</h4>
                                <p className="text-xs text-white/50">Sweeps floor assets like Punks</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center pt-8">
                            <div className="bg-gradient-to-b from-gvc-gold/20 to-gvc-gold/5 border border-gvc-gold p-8 rounded-2xl text-center max-w-lg w-full shadow-[0_0_50px_rgba(255,224,72,0.15)] transform hover:scale-105 transition-transform duration-500">
                                <Trophy className="w-12 h-12 text-gvc-gold mx-auto mb-4" />
                                <h3 className="text-3xl font-cooper text-gvc-gold mb-2">Badgeholders Earn</h3>
                                <p className="text-white/80">The entire pool value backs the ecosystem.<br />Diamond Hands share the rewards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONCEPT 2: HORIZONTAL CARDS */}
            <section className="w-full">
                <p className="text-white/50 text-xs tracking-widest font-mono text-center mb-12">CONCEPT 2: HORIZONTAL FLOW</p>
                <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center max-w-7xl mx-auto px-4">

                    {/* Card 1 */}
                    <div className="flex-1 bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start hover:bg-white/10 transition-colors group">
                        <span className="text-6xl font-cooper text-white/10 mb-auto group-hover:text-gvc-gold/20 transition-colors">01</span>
                        <Users className="w-10 h-10 text-gvc-gold mb-4 mt-8" />
                        <h3 className="text-xl font-bold mb-2">Users Trade</h3>
                        <p className="text-white/50 text-sm">Buy/Sell on Uniswap</p>
                    </div>

                    <ArrowRight className="hidden md:block w-8 h-8 text-white/20 self-center" />

                    {/* Card 2 */}
                    <div className="flex-1 bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start hover:bg-white/10 transition-colors group">
                        <span className="text-6xl font-cooper text-white/10 mb-auto group-hover:text-white/20 transition-colors">02</span>
                        <Coins className="w-10 h-10 text-white mb-4 mt-8" />
                        <h3 className="text-xl font-bold mb-2">Fees Collected</h3>
                        <p className="text-white/50 text-sm">Transaction taxes</p>
                    </div>

                    <ArrowRight className="hidden md:block w-8 h-8 text-white/20 self-center" />

                    {/* Card 3 */}
                    <div className="flex-1 bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start hover:bg-white/10 transition-colors group">
                        <span className="text-6xl font-cooper text-white/10 mb-auto group-hover:text-white/20 transition-colors">03</span>
                        <div className="flex gap-2 mt-8 mb-4">
                            <Percent className="w-10 h-10 text-gvc-gold" />
                            <Store className="w-10 h-10 text-gvc-gold" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Pool Grows</h3>
                        <p className="text-white/50 text-sm">1% Rewards + 8% NFTs</p>
                    </div>

                    <ArrowRight className="hidden md:block w-8 h-8 text-gvc-gold self-center animate-pulse" />

                    {/* Card 4 */}
                    <div className="flex-[1.2] bg-gvc-gold border border-gvc-gold p-8 rounded-2xl flex flex-col items-start shadow-xl transform scale-105 origin-center">
                        <span className="text-6xl font-cooper text-black/10 mb-auto">04</span>
                        <Trophy className="w-10 h-10 text-black mb-4 mt-8" />
                        <h3 className="text-xl font-bold mb-2 text-black">You Earn</h3>
                        <p className="text-black/60 text-sm">Badgeholders share the pot</p>
                    </div>

                </div>
            </section>

            {/* CONCEPT 3: BENTO GRID */}
            <section className="max-w-4xl mx-auto">
                <p className="text-white/50 text-xs tracking-widest font-mono text-center mb-12">CONCEPT 3: BENTO GRID</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gvc-dark border border-white/10 p-8 rounded-3xl flex items-center gap-6 group hover:border-gvc-gold/50 transition-colors">
                        <div className="bg-white/5 p-4 rounded-xl group-hover:bg-gvc-gold/20 transition-colors">
                            <Users className="w-8 h-8 text-white group-hover:text-gvc-gold" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">1. Trade</h3>
                            <p className="text-white/50 text-sm">Users buy & sell $VIBESTR</p>
                        </div>
                    </div>

                    <div className="bg-gvc-dark border border-white/10 p-8 rounded-3xl flex items-center gap-6 group hover:border-white/30 transition-colors">
                        <div className="bg-white/5 p-4 rounded-xl">
                            <Coins className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">2. Tax</h3>
                            <p className="text-white/50 text-sm">Fees are collected automatically</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gvc-dark border border-white/10 p-6 rounded-3xl flex flex-col justify-center text-center items-center gap-2">
                            <Percent className="w-6 h-6 text-gvc-gold" />
                            <span className="font-bold">1% Direct Rewards</span>
                        </div>
                        <div className="bg-gvc-dark border border-white/10 p-6 rounded-3xl flex flex-col justify-center text-center items-center gap-2">
                            <Store className="w-6 h-6 text-gvc-gold" />
                            <span className="font-bold">8% NFT Sweeps</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-gradient-to-r from-gvc-gold to-orange-400 p-8 rounded-3xl text-black flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-cooper mb-2">Badgeholders Win</h3>
                            <p className="opacity-80 max-w-md">The entire ecosystem value backs your badges. Hold to earn.</p>
                        </div>
                        <Trophy className="w-24 h-24 text-black opacity-20 rotate-12" />
                    </div>
                </div>
            </section>

        </main>
    );
}
