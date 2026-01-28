'use client';

import { motion } from 'framer-motion';

const BADGE_IMAGES = [
    '/badges/any_gvc_1759173799963.webp',
    '/badges/astro_balls_1759173838889.webp',
    '/badges/baller_1759173868839.webp',
    '/badges/billiards_1759173890603.webp',
    '/badges/captain_1759173895611.webp',
    '/badges/cosmic_1759173818340.webp',
    '/badges/doge_1759173842640.webp',
    '/badges/funky_fresh_1759174001274.webp',
    '/badges/gold_member_1759173793799.webp',
    '/badges/homerun_1759174013207.webp',
    '/badges/king_1759173882056.webp',
    '/badges/pepe_1759173846260.webp',
];

export default function TextOptions() {
    return (
        <main className="min-h-screen bg-gvc-black text-white p-8 md:p-12 overflow-x-hidden space-y-24">
            <h1 className="text-4xl md:text-5xl font-cooper text-gvc-gold glowing-text mb-12 text-center">TEXT VISIBILITY OPTIONS</h1>

            {/* OPTION 1: HEAVY SHADOW */}
            <section className="relative h-64 w-full border border-white/10 rounded-2xl overflow-hidden group">
                <MarqueeBackground />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <p className="absolute top-4 left-4 text-xs tracking-widest text-white/50 font-mono">OPTION 1: HEAVY DROP SHADOW</p>
                    <h2 className="text-5xl md:text-7xl font-cooper font-bold text-gvc-gold leading-none tracking-tight drop-shadow-[0_4px_0_rgba(0,0,0,1)] filter">
                        BADGES ARE
                    </h2>
                    <h2 className="text-6xl md:text-8xl font-cooper font-bold text-white leading-none tracking-tight mt-1 drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)]">
                        THE ALPHA
                    </h2>
                </div>
            </section>

            {/* OPTION 2: GLASSMORPHISM */}
            <section className="relative h-64 w-full border border-white/10 rounded-2xl overflow-hidden group">
                <MarqueeBackground />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <p className="absolute top-4 left-4 text-xs tracking-widest text-white/50 font-mono">OPTION 2: FROSTED GLASS BACKDROP</p>
                    <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                        <h2 className="text-5xl md:text-7xl font-cooper font-bold text-gvc-gold glowing-text leading-none tracking-tight">
                            BADGES ARE
                        </h2>
                        <h2 className="text-6xl md:text-8xl font-cooper font-bold text-white drop-shadow-[0_4px_0_#FFE048] leading-none tracking-tight mt-1">
                            THE ALPHA
                        </h2>
                    </div>
                </div>
            </section>

            {/* OPTION 3: THICK STROKE & GLOW */}
            <section className="relative h-64 w-full border border-white/10 rounded-2xl overflow-hidden group">
                <MarqueeBackground />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <p className="absolute top-4 left-4 text-xs tracking-widest text-white/50 font-mono">OPTION 3: THICK STROKE (NEON)</p>
                    {/* Using text-stroke utility if available or style prop */}
                    <h2 className="text-5xl md:text-7xl font-cooper font-bold text-transparent leading-none tracking-tight" style={{ WebkitTextStroke: '2px #FFE048', textShadow: '0 0 20px rgba(255, 224, 72, 0.5)' }}>
                        BADGES ARE
                    </h2>
                    <h2 className="text-6xl md:text-8xl font-cooper font-bold text-transparent leading-none tracking-tight mt-1" style={{ WebkitTextStroke: '2px white', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
                        THE ALPHA
                    </h2>
                </div>
            </section>

            {/* OPTION 4: SOLID STRIP */}
            <section className="relative h-64 w-full border border-white/10 rounded-2xl overflow-hidden group">
                <MarqueeBackground />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <p className="absolute top-4 left-4 text-xs tracking-widest text-white/50 font-mono z-20">OPTION 4: SOLID STRIP</p>
                    <div className="w-full bg-gvc-black/90 py-6 text-center border-y border-gvc-gold/20 transform -skew-y-2">
                        <div className="transform skew-y-2">
                            <h2 className="text-5xl md:text-7xl font-cooper font-bold text-gvc-gold glowing-text leading-none tracking-tight">
                                BADGES ARE
                            </h2>
                            <h2 className="text-6xl md:text-8xl font-cooper font-bold text-white drop-shadow-[0_4px_0_#FFE048] leading-none tracking-tight mt-1">
                                THE ALPHA
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

function MarqueeBackground() {
    return (
        <div className="absolute inset-y-0 -left-10 -right-10 bg-gvc-gold/5 -skew-y-2 transform flex items-center justify-center opacity-60">
            <div className="flex gap-12 overflow-hidden w-full mask-linear py-6">
                {[1, 2, 3].map((key) => (
                    <motion.div
                        key={key}
                        className="flex gap-12 flex-shrink-0"
                        animate={{ x: '-100%' }}
                        transition={{ ease: "linear", duration: 60, repeat: Infinity }}
                    >
                        {BADGE_IMAGES.map((src, i) => (
                            <div key={i} className="w-24 h-24 flex-shrink-0 relative">
                                <img src={src} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
