'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Mock components for the design page
const StepRibbon = ({ text }: { text: string }) => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/90 border border-gvc-gold/40 px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
        <span className="text-[10px] md:text-xs font-mono text-gvc-gold tracking-widest uppercase font-bold italic">
            {text}
        </span>
    </div>
);

export default function SimulatorDesignPage() {
    return (
        <div className="min-h-screen bg-black/90 p-8 md:p-20 overflow-y-auto font-mundial">
            <div className="max-w-6xl mx-auto space-y-24">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl text-gvc-gold font-cooper">Simulator Design Options</h1>
                    <p className="text-white/60">Exploring negative space and layout variations for Step 2.</p>
                </div>

                {/* OPTION 1: "More Padding & Vertical Rhythm" */}
                {/* Changes: p-8 -> p-10/12. Increased space-y-4. */}
                <section>
                    <h2 className="text-2xl text-white mb-8 border-b border-white/10 pb-2">Option 1: Increased Padding (The "Breathing Room" Approach)</h2>
                    <p className="text-white/40 mb-8 text-sm">Increased internal padding from p-8 to p-12. Increased vertical gap between elements.</p>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/5 relative">
                        {/* MOCK STEP 2 GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-4xl mx-auto">
                            {/* 2A */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-10 pt-20 text-center">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-6">
                                    <p className="font-cooper font-bold text-white uppercase text-xl leading-tight">
                                        <span className="text-gvc-gold">$80,000 (8%)</span> IS RESERVED AS A FEE & AUTOMATICALLY BUYS GVCS
                                    </p>
                                    <p className="text-white/70 text-base font-mundial leading-relaxed px-4">
                                        The protocol buys <span className="text-gvc-gold font-bold">30 GVCs</span> from the OpenSea floor and adds them to the treasury.
                                    </p>
                                    <p className="text-xs italic text-white/40 font-mundial mt-4">(If ETH = $3,000 & the GVC floor is .9ETH)</p>
                                </div>
                            </div>

                            {/* 2B */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-10 pt-20 text-center">
                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-6">
                                    <p className="font-cooper font-bold text-white uppercase text-xl leading-tight">
                                        <span className="text-gvc-gold">$10,000 (1%)</span> ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/70 text-base font-mundial leading-relaxed px-4">
                                        This is used to buy $VIBESTR, GVC NFTs, $PNKSTR and more as rewards for Badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* OPTION 2: "Refined Typography" */}
                {/* Changes: Slightly smaller body text (text-base -> text-[15px]), lighter font weights, looser leading. */}
                <section>
                    <h2 className="text-2xl text-white mb-8 border-b border-white/10 pb-2">Option 2: Refined Typography</h2>
                    <p className="text-white/40 mb-8 text-sm">Maintained standard padding but reduced body text visual weight to create white space. Increased line-height.</p>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/5 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-4xl mx-auto">
                            {/* 2A */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-8 pt-16 text-center">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-snug tracking-wide">
                                        <span className="text-gvc-gold">$80,000 (8%)</span> IS RESERVED AS A FEE & AUTOMATICALLY BUYS GVCS
                                    </p>
                                    <p className="text-white/60 text-[15px] font-mundial leading-loose px-2">
                                        The protocol buys <span className="text-gvc-gold font-medium">30 GVCs</span> from the OpenSea floor and adds them to the treasury.
                                    </p>
                                    <p className="text-[11px] uppercase tracking-wider text-white/30 font-mundial mt-4">(If ETH = $3,000 & the GVC floor is .9ETH)</p>
                                </div>
                            </div>

                            {/* 2B */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-8 pt-16 text-center">
                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-snug tracking-wide">
                                        <span className="text-gvc-gold">$10,000 (1%)</span> ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/60 text-[15px] font-mundial leading-loose px-2">
                                        This is used to buy $VIBESTR, GVC NFTs, $PNKSTR and more as rewards for Badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* OPTION 3: "Wider Canvas" */}
                {/* Changes: Increased max-width of container. */}
                <section>
                    <h2 className="text-2xl text-white mb-8 border-b border-white/10 pb-2">Option 3: Wider Canvas</h2>
                    <p className="text-white/40 mb-8 text-sm">Increased container width from max-w-4xl to max-w-5xl. Creates natural spacing by un-stacking text.</p>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/5 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-5xl mx-auto">
                            {/* 2A */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-10 pt-16 text-center">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-xl leading-tight">
                                        <span className="text-gvc-gold">$80,000 (8%)</span> IS RESERVED AS A FEE & AUTOMATICALLY BUYS GVCS
                                    </p>
                                    <p className="text-white/60 text-lg font-mundial leading-relaxed px-6">
                                        The protocol buys <span className="text-gvc-gold font-bold">30 GVCs</span> from the OpenSea floor and adds them to the treasury.
                                    </p>
                                    <p className="text-xs italic text-white/40 font-mundial mt-2">(If ETH = $3,000 & the GVC floor is .9ETH)</p>
                                </div>
                            </div>

                            {/* 2B */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-10 pt-16 text-center">
                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-4">
                                    <p className="font-cooper font-bold text-white uppercase text-xl leading-tight">
                                        <span className="text-gvc-gold">$10,000 (1%)</span> ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/60 text-lg font-mundial leading-relaxed px-6">
                                        This is used to buy $VIBESTR, GVC NFTs, $PNKSTR and more as rewards for Badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
