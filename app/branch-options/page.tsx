'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Trophy } from 'lucide-react';

// Reusing BroomIcon locally for the prototype
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

export default function BranchOptions() {
    return (
         <main className="min-h-screen bg-gvc-black text-white p-8 md:p-12 space-y-32">
            <div className="max-w-4xl mx-auto text-center mb-16">
                 <h1 className="text-4xl md:text-5xl font-cooper text-gvc-gold mb-4">BRANCHING LOGIC CONCEPTS</h1>
                 <p className="text-white/60 font-mundial">Exploring visuals to better indicate the 2-path flow.</p>
            </div>

            {/* CONCEPT 1: ANIMATED PIPES */}
            <section className="max-w-5xl mx-auto">
                <div className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Option 1: Animated Flow (Pipes)</div>
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12">
                    
                    {/* Source Box */}
                    <div className="relative z-10 max-w-md mx-auto bg-gvc-dark border border-gvc-gold/30 rounded-2xl p-6 text-center shadow-lg shadow-gvc-gold/5 mb-24">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 rounded-full bg-gvc-gold/10 flex items-center justify-center border border-gvc-gold/20">
                                <Coins className="w-6 h-6 text-gvc-gold" />
                            </div>
                        </div>
                        <h3 className="text-lg font-cooper font-bold text-white uppercase mb-2">PROTOCOL GENERATES FEES</h3>
                        <p className="text-white/60 font-mundial text-xs leading-relaxed">
                            <span className="font-bold text-gvc-gold">10%</span> of buy/sell volume is taken as a fee.
                        </p>
                        
                        {/* Output Connector */}
                        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 bg-gvc-dark border border-gvc-gold/50 rounded-full z-20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-gvc-gold rounded-full" />
                        </div>
                    </div>

                    {/* SVG Connections Layer */}
                    <div className="absolute top-[180px] left-0 w-full h-[100px] pointer-events-none">
                         <svg className="w-full h-full overflow-visible">
                            {/* Left Path */}
                            <path 
                                d="M 50% 0 L 50% 40 Q 50% 80 25% 80 L 25% 120"
                                fill="none"
                                stroke="#FFE048"
                                strokeOpacity="0.2"
                                strokeWidth="2"
                            />
                             <motion.path 
                                d="M 50% 0 L 50% 40 Q 50% 80 25% 80 L 25% 120"
                                fill="none"
                                stroke="#FFE048"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Right Path */}
                             <path 
                                d="M 50% 0 L 50% 40 Q 50% 80 75% 80 L 75% 120"
                                fill="none"
                                stroke="#FFE048"
                                strokeOpacity="0.2"
                                strokeWidth="2"
                            />
                             <motion.path 
                                d="M 50% 0 L 50% 40 Q 50% 80 75% 80 L 75% 120"
                                fill="none"
                                stroke="#FFE048"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                         </svg>
                    </div>

                    {/* Destination Boxes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-8">
                         {/* Dest 1 */}
                         <div className="relative bg-gvc-dark border border-white/10 rounded-2xl p-6 hover:border-gvc-gold/30 transition-colors group">
                            {/* Input Connector */}
                            <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-4 h-4 bg-gvc-dark border border-gvc-gold/50 rounded-full z-20" />
                            
                            <div className="flex flex-col items-center text-center gap-3">
                                <Trophy className="w-8 h-8 text-gvc-gold group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-cooper font-bold text-white uppercase">ADDS TO THE REWARDS POOL</h3>
                                <p className="text-white/50 text-xs font-mundial leading-relaxed">
                                    A % of protocol fees automatically accrue as ETH to the VibeStrategy.eth Rewards wallet.
                                </p>
                            </div>
                         </div>

                         {/* Dest 2 */}
                         <div className="relative bg-gvc-dark border border-white/10 rounded-2xl p-6 hover:border-gvc-gold/30 transition-colors group">
                             {/* Input Connector */}
                             <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-4 h-4 bg-gvc-dark border border-gvc-gold/50 rounded-full z-20" />

                             <div className="flex flex-col items-center text-center gap-3">
                                <BroomIcon className="w-8 h-8 text-gvc-gold group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-cooper font-bold text-white uppercase">BUYS GVCS OFF THE FLOOR</h3>
                                <p className="text-white/50 text-xs font-mundial leading-relaxed">
                                    Another % of those fees are used to buy GVCs off OpenSea. All sale proceeds buy & burn $VIBESTR.
                                </p>
                            </div>
                         </div>
                    </div>

                </div>
            </section>


            {/* CONCEPT 2: CIRCUIT BOARD */}
            <section className="max-w-5xl mx-auto">
                <div className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Option 2: Circuit Diagrams</div>
                <div className="relative bg-gvc-black border border-white/10 rounded-3xl p-12 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gvc-gold via-transparent to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">
                        
                        {/* Source Column */}
                        <div className="md:col-span-3 flex justify-center mb-16 relative">
                             <div className="relative z-10 w-full max-w-sm bg-stone-900 border-2 border-gvc-gold rounded-xl p-6 shadow-[0_0_30px_rgba(255,224,72,0.1)]">
                                <div className="absolute top-1/2 right-full w-full h-[2px] bg-gradient-to-l from-gvc-gold/50 to-transparent" />
                                <div className="absolute top-1/2 left-full w-full h-[2px] bg-gradient-to-r from-gvc-gold/50 to-transparent" />
                                
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gvc-gold text-black rounded-lg font-bold">FEES</div>
                                    <div>
                                        <h3 className="font-cooper text-white uppercase text-lg">PROTOCOL LEVEL</h3>
                                        <p className="text-white/50 text-xs font-mono">10% VOLUME CAPTURE</p>
                                    </div>
                                </div>

                                {/* Vertical Line Down */}
                                <div className="absolute left-1/2 top-full w-[2px] h-16 bg-gvc-gold">
                                    <motion.div 
                                        className="w-full bg-white h-4 shadow-[0_0_10px_white]"
                                        animate={{ y: [0, 64] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                             </div>
                        </div>

                        {/* Split Logic */}
                        <div className="md:col-span-3 h-8 relative mb-8">
                             {/* Horizontal Bar */}
                             <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-gvc-gold/50">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gvc-gold rounded-full shadow-[0_0_10px_#FFE048]" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gvc-gold rounded-full shadow-[0_0_10px_#FFE048]" />
                                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-gvc-gold rounded-full z-10" />
                             </div>
                             {/* Vertical Drops */}
                             <div className="absolute top-0 left-[25%] w-[2px] h-8 bg-gradient-to-b from-gvc-gold/50 to-gvc-gold/20" />
                             <div className="absolute top-0 right-[25%] w-[2px] h-8 bg-gradient-to-b from-gvc-gold/50 to-gvc-gold/20" />
                        </div>

                        {/* Destinations */}
                        <div className="md:col-span-3 flex flex-col md:flex-row gap-8 justify-center">
                            
                            {/* Card 1 */}
                            <div className="flex-1 max-w-sm bg-white/5 border border-white/10 p-1 relative group">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gvc-gold" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gvc-gold" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gvc-gold" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gvc-gold" />

                                <div className="bg-black/50 p-6 h-full flex flex-col items-center text-center">
                                    <Trophy className="w-10 h-10 text-white mb-4 opacity-50 group-hover:opacity-100 group-hover:text-gvc-gold transition-all" />
                                    <h4 className="font-mono text-gvc-gold text-sm mb-2 tracking-widest">DEST_01</h4>
                                    <h3 className="font-cooper text-xl text-white mb-2">REWARDS POOL</h3>
                                    <p className="text-white/40 text-xs">ETH accrues to VibeStrategy.eth wallet</p>
                                </div>
                            </div>

                             {/* Card 2 */}
                             <div className="flex-1 max-w-sm bg-white/5 border border-white/10 p-1 relative group">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gvc-gold" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gvc-gold" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gvc-gold" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gvc-gold" />

                                <div className="bg-black/50 p-6 h-full flex flex-col items-center text-center">
                                    <BroomIcon className="w-10 h-10 text-white mb-4 opacity-50 group-hover:opacity-100 group-hover:text-gvc-gold transition-all" />
                                    <h4 className="font-mono text-gvc-gold text-sm mb-2 tracking-widest">DEST_02</h4>
                                    <h3 className="font-cooper text-xl text-white mb-2">SWEEP FLOOR</h3>
                                    <p className="text-white/40 text-xs">Buy & Burn $VIBESTR programmatically</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

             {/* CONCEPT 3: SPLIT FOLDER */}
             <section className="max-w-5xl mx-auto">
                <div className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Option 3: Integrated Stack</div>
                <div className="flex flex-col items-center">
                    
                    {/* Top Card */}
                    <div className="w-full max-w-2xl bg-gradient-to-b from-stone-800 to-stone-900 rounded-t-3xl border border-white/10 p-8 text-center relative z-20 shadow-2xl">
                         <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-white/10" />
                         <h3 className="text-2xl font-cooper text-white mb-2">PROTOCOL GENERATES FEES</h3>
                         <p className="text-white/50">10% of volume is captured automatically.</p>
                         <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-stone-900 rounded-full border border-white/10 flex items-center justify-center z-30">
                            <ArrowDown className="w-6 h-6 text-white/50" />
                         </div>
                    </div>

                    {/* Bottom Split */}
                    <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2">
                        {/* Left Side */}
                        <div className="bg-stone-900/50 border-l border-b border-white/10 rounded-bl-3xl p-8 pt-12 md:pr-12 text-right hover:bg-white/5 transition-colors cursor-default">
                             <div className="flex flex-col items-end">
                                <Trophy className="w-8 h-8 text-gvc-gold mb-3" />
                                <h4 className="font-bold text-white mb-1">REWARDS POOL</h4>
                                <p className="text-white/40 text-xs leading-relaxed max-w-[250px]">
                                    Accrues ETH directly to the Rewards Wallet.
                                </p>
                             </div>
                        </div>

                         {/* Right Side */}
                         <div className="bg-stone-900/50 border-r border-b border-white/10 rounded-br-3xl p-8 pt-12 md:pl-12 text-left hover:bg-white/5 transition-colors cursor-default">
                             <div className="flex flex-col items-start">
                                <BroomIcon className="w-8 h-8 text-gvc-gold mb-3" />
                                <h4 className="font-bold text-white mb-1">SWEEP FLOOR</h4>
                                <p className="text-white/40 text-xs leading-relaxed max-w-[250px]">
                                    Buys GVCs and burns $VIBESTR automatically.
                                </p>
                             </div>
                        </div>
                    </div>

                </div>
            </section>

         </main>
    );
}

function ArrowDown({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    )
} 
