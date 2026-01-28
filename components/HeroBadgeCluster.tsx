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

export default function HeroBadgeCluster() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none z-0">
            {/* Center glow */}
            <div className="absolute inset-0 bg-gvc-gold/10 blur-[120px] rounded-full scale-50" />

            {/* We'll pick ~18 badges to float around */}
            {BADGE_IMAGES.slice(0, 18).map((src, i) => {
                // Calculate position in a circle/oval
                const count = 18;
                const angle = (i / count) * Math.PI * 2;

                // Elliptical spread: wider horizontally
                const xRadius = 350 + Math.random() * 50;
                const yRadius = 200 + Math.random() * 50;

                const x = Math.cos(angle) * xRadius;
                const y = Math.sin(angle) * yRadius;

                return (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-16 h-16 md:w-20 md:h-20"
                        style={{ x, y }} // animate x/y from center would be nice but let's just place them
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: [x, x + (Math.random() - 0.5) * 30, x],
                            y: [y, y + (Math.random() - 0.5) * 30, y],
                            rotate: [0, (Math.random() - 0.5) * 20, 0]
                        }}
                        transition={{
                            opacity: { duration: 1, delay: i * 0.05 },
                            scale: { duration: 1, delay: i * 0.05 },
                            default: {
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2
                            }
                        }}
                    >
                        <img
                            src={src}
                            alt=""
                            className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-125 transition-transform duration-300"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
