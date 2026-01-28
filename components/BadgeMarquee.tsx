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

export default function BadgeMarquee() {
    // Split images into chunks for varied rows
    const row1 = BADGE_IMAGES.slice(0, 12);
    const row2 = BADGE_IMAGES.slice(12, 25);
    const row3 = BADGE_IMAGES.slice(0, 12).reverse(); // Duplicate/reverse for variation

    return (
        <div className="fixed inset-0 pointer-events-none z-0 flex flex-col justify-between opacity-30 py-10 scale-110">
            {/* Top Row - Left */}
            <div className="flex gap-4 overflow-hidden w-full rotate-[-2deg]">
                <MarqueeRow images={row1} direction="left" speed={40} />
            </div>

            {/* Middle Row - Right */}
            <div className="flex gap-4 overflow-hidden w-full rotate-[2deg]">
                <MarqueeRow images={row2} direction="right" speed={50} />
            </div>

            {/* Middle-Bottom Row - Left */}
            <div className="flex gap-4 overflow-hidden w-full rotate-[-1deg]">
                <MarqueeRow images={row3} direction="left" speed={45} />
            </div>

            {/* Bottom Row - Right */}
            <div className="flex gap-4 overflow-hidden w-full rotate-[3deg]">
                <MarqueeRow images={row2} direction="right" speed={60} />
            </div>
        </div>
    );
}

function MarqueeRow({ images, direction, speed }: { images: string[], direction: 'left' | 'right', speed: number }) {
    return (
        <div className="flex gap-4 flex-shrink-0">
            {/* Duplicate 4 times to ensure coverage on wide screens */}
            {[1, 2, 3, 4].map((key) => (
                <motion.div
                    key={key}
                    className="flex gap-4 flex-shrink-0"
                    initial={{ x: direction === 'left' ? '0%' : '-100%' }}
                    animate={{ x: direction === 'left' ? '-100%' : '0%' }}
                    transition={{ ease: "linear", duration: speed, repeat: Infinity }}
                >
                    {images.map((src, i) => (
                        <div key={i} className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative">
                            <img src={src} alt="" className="w-full h-full object-contain drop-shadow-lg opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
}
