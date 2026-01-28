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
    '/badges/gradient_lover_1759173808918.webp',
    '/badges/gud_meat_1759173936766.webp',
    '/badges/high_noon_hustler_1759174007143.webp',
    '/badges/hoodie_up_society_1759174015984.webp',
    '/badges/king_1759173882056.webp',
    '/badges/nounish_vibes_1759173973218.webp',
    '/badges/party_in_the_back_1759173998578.webp',
    '/badges/plants_1759173871973.webp',
    '/badges/pothead_1759173827603.webp',
    '/badges/rainbow_boombox_1759173875165.webp',
    '/badges/ranger_1759173821753.webp',
    '/badges/stone_1759173815165.webp',
    '/badges/straw_man_1759173985595.webp',
    '/badges/tanks_a_lot_1759173976815.webp',
    '/badges/toy_bricks_1759173887659.webp',
    '/badges/vibefoot_fan_club_1759173939420.webp',
];

export default function DesignConcepts() {
    return (
        <main className="min-h-screen bg-gvc-black text-white p-8 md:p-12 overflow-x-hidden">
            <h1 className="text-4xl md:text-5xl font-cooper text-gvc-gold glowing-text mb-12 text-center">BADGE DISPLAY CONCEPTS</h1>

            {/* CONCEPT 1: MARQUEE */}
            <section className="mb-24">
                <h2 className="text-2xl font-mundial text-white/80 mb-6 border-b border-white/20 pb-2">OPTION 1: INFINITE MARQUEE</h2>
                <div className="relative w-full overflow-hidden bg-gvc-gray/30 py-12 rounded-2xl border border-white/5">

                    {/* Row 1: Left */}
                    <div className="flex gap-8 mb-8 overflow-hidden mask-linear">
                        {/* Duplicate list 3 times for seamless loop */}
                        <motion.div
                            className="flex gap-8 flex-shrink-0"
                            animate={{ x: '-50%' }}
                            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        >
                            {[...BADGE_IMAGES, ...BADGE_IMAGES].map((src, i) => (
                                <div key={i} className="w-24 h-24 flex-shrink-0 relative">
                                    <img src={src} alt="" className="w-full h-full object-contain drop-shadow-lg opacity-80" />
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            className="flex gap-8 flex-shrink-0"
                            animate={{ x: '-50%' }}
                            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        >
                            {[...BADGE_IMAGES, ...BADGE_IMAGES].map((src, i) => (
                                <div key={`dup-${i}`} className="w-24 h-24 flex-shrink-0 relative">
                                    <img src={src} alt="" className="w-full h-full object-contain drop-shadow-lg opacity-80" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Right */}
                    <div className="flex gap-8 overflow-hidden mask-linear">
                        <motion.div
                            className="flex gap-8 flex-shrink-0"
                            animate={{ x: '0%' }}
                            initial={{ x: '-50%' }}
                            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                        >
                            {[...BADGE_IMAGES, ...BADGE_IMAGES].map((src, i) => (
                                <div key={i} className="w-24 h-24 flex-shrink-0 relative">
                                    <img src={src} alt="" className="w-full h-full object-contain drop-shadow-lg opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            className="flex gap-8 flex-shrink-0"
                            animate={{ x: '0%' }}
                            initial={{ x: '-50%' }}
                            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                        >
                            {[...BADGE_IMAGES, ...BADGE_IMAGES].map((src, i) => (
                                <div key={`dup2-${i}`} className="w-24 h-24 flex-shrink-0 relative">
                                    <img src={src} alt="" className="w-full h-full object-contain drop-shadow-lg opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CONCEPT 2: PULSING GRID */}
            <section className="mb-24">
                <h2 className="text-2xl font-mundial text-white/80 mb-6 border-b border-white/20 pb-2">OPTION 2: THE WALL OF VIBES</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-8 bg-gvc-gray/20 rounded-2xl border border-white/5">
                    {BADGE_IMAGES.map((src, i) => (
                        <motion.div
                            key={i}
                            className="aspect-square relative flex items-center justify-center p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-gvc-gold/50 transition-colors cursor-pointer group"
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <motion.img
                                src={src}
                                alt=""
                                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,224,72,0.5)] transition-all"
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: Math.random() * 2
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CONCEPT 3: HERO CLUSTER */}
            <section className="mb-24 flex flex-col items-center">
                <h2 className="text-2xl font-mundial text-white/80 mb-12 border-b border-white/20 pb-2 w-full text-left">OPTION 3: HERO CLUSTER</h2>
                <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center">
                    {/* Center glow */}
                    <div className="absolute inset-0 bg-gvc-gold/20 blur-[100px] rounded-full" />

                    {BADGE_IMAGES.slice(0, 15).map((src, i) => {
                        const angle = (i / 15) * Math.PI * 2;
                        const radius = 120 + Math.random() * 60; // Spread out
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-20 h-20"
                                style={{ x, y }}
                                animate={{
                                    x: [x, x + (Math.random() - 0.5) * 20, x],
                                    y: [y, y + (Math.random() - 0.5) * 20, y],
                                    rotate: [0, (Math.random() - 0.5) * 10, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <img src={src} alt="" className="w-full h-full object-contain drop-shadow-xl" />
                            </motion.div>
                        );
                    })}

                    <div className="z-10 text-center">
                        <h3 className="text-4xl font-cooper text-white glowing-text">VIBESTR</h3>
                        <p className="font-mundial text-gvc-gold tracking-[0.2em]">BADGE COLLECTION</p>
                    </div>
                </div>
            </section>

        </main>
    );
}
