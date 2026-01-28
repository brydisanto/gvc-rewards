'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronDown, ChevronsDown, MoveDown } from 'lucide-react';

export default function ArrowOptionsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20 font-mundial">
            <h1 className="text-3xl font-cooper text-gvc-gold mb-16 text-center">Arrow Styles</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                {/* Option 1: Bold Chevron */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 1: Bold Chevron</h2>
                    <div className="h-32 flex items-center justify-center">
                        <ChevronDown className="w-16 h-16 text-white animate-bounce" />
                    </div>
                </div>

                {/* Option 2: Double Chevron */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 2: Double Chevron</h2>
                    <div className="h-32 flex items-center justify-center">
                        <ChevronsDown className="w-16 h-16 text-white/80 animate-bounce" />
                    </div>
                </div>

                {/* Option 3: Long Arrow */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 3: Long Arrow</h2>
                    <div className="h-32 flex items-center justify-center">
                        <MoveDown className="w-16 h-16 text-white/90 animate-pulse" />
                    </div>
                </div>

                {/* Option 4: Glowing Container */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 4: Glowing Bubble</h2>
                    <div className="h-32 flex items-center justify-center">
                        <div className="bg-gvc-gold/20 p-4 rounded-full border border-gvc-gold shadow-[0_0_15px_rgba(255,224,72,0.3)] animate-bounce">
                            <ArrowDown className="w-8 h-8 text-gvc-gold" />
                        </div>
                    </div>
                </div>

                {/* Option 5: Animated Flow Line */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 5: Flow Line</h2>
                    <div className="h-32 w-full flex justify-center relative overflow-hidden">
                        <div className="w-[2px] h-full bg-white/10 relative">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-gvc-gold to-transparent"
                                animate={{ top: ["-50%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <div className="absolute bottom-4">
                            <ChevronDown className="w-8 h-8 text-gvc-gold" />
                        </div>
                    </div>
                </div>

                {/* Option 6: Retro Pixel */}
                <div className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="font-mono text-gvc-gold opacity-50">Option 6: Thick Block</h2>
                    <div className="h-32 flex items-center justify-center">
                        <svg width="40" height="60" viewBox="0 0 40 60" className="fill-current text-white animate-bounce">
                            <path d="M15 0H25V35H40L20 60L0 35H15V0Z" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
}
