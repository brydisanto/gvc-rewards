'use client';

import { motion } from 'framer-motion';

const BADGE_IMAGES = [
    '/badges/any_gvc_1759173799963.webp',
    '/badges/astro_balls_1759173838889.webp',
    '/badges/baller_1759173868839.webp',
    '/badges/billiards_1759173890603.webp',
    '/badges/captain_1759173895611.webp',
    '/badges/checkmate_1759173863329.webp',
    '/badges/cosmic_1759173818340.webp',
    '/badges/doge_1759173842640.webp',
    '/badges/funky_fresh_1759174001274.webp',
    '/badges/gold_member_1759173793799.webp',
    '/badges/gradient_lover_1759173808918.webp',
    '/badges/grayscale_seeker_1759173797002.webp',
    '/badges/great_stacheby_1759173956903.webp',
    '/badges/gud_meat_1759173936766.webp',
    '/badges/hail_mary_heroes_1759173953534.webp',
    '/badges/high_noon_hustler_1759174007143.webp',
    '/badges/homerun_1759174013207.webp',
    '/badges/hoodie_up_society_1759174015984.webp',
    '/badges/king_1759173882056.webp',
    '/badges/nounish_vibes_1759173973218.webp',
    '/badges/party_in_the_back_1759173998578.webp',
    '/badges/pepe_1759173846260.webp',
    '/badges/plants_1759173871973.webp',
    '/badges/plastic_lover_1759173806081.webp',
    '/badges/poker_face_1759173884906.webp',
    '/badges/pothead_1759173827603.webp',
    '/badges/power_duo_1759173963251.webp',
    '/badges/rainbow_boombox_1759173875165.webp',
    '/badges/ranger_1759173821753.webp',
    '/badges/robot_lover_1759173802514.webp',
    '/badges/showtime_1759173995136.webp',
    '/badges/stone_1759173815165.webp',
    '/badges/straw_man_1759173985595.webp',
    '/badges/suited_up_1759173934070.webp',
    '/badges/super_rare_1759173833292.webp',
    '/badges/tanks_a_lot_1759173976815.webp',
    '/badges/toy_bricks_1759173887659.webp',
    '/badges/varsity_vibes_1759173950723.webp',
    '/badges/vibefoot_fan_club_1759173939420.webp',
    '/badges/vibestr_blue_tier_1762440817215.webp',
    '/badges/vibestr_bounty_hunter_1759174044563.webp',
    '/badges/vibestr_cosmic_tier_1764590448508.webp',
    '/badges/vibestr_gold_tier_1759174041345.webp',
    '/badges/vibestr_silver_tier_1759174037847.webp',
    '/badges/zoom_in_vibe_out_1759174018930.webp',
];

interface BadgeDividerProps {
    reverse?: boolean;
}

export default function BadgeDivider({ reverse = false }: BadgeDividerProps) {
    return (
        <div className="w-full py-10 my-16 relative overflow-hidden flex flex-col items-center justify-center group cursor-default">

            {/* Background Marquee - Slight Tilt (reversed if prop set) */}
            <div className={`absolute inset-y-0 -left-10 -right-10 bg-gvc-gold/5 ${reverse ? 'skew-y-2' : '-skew-y-2'} transform flex items-center justify-center`}>
                <div className="flex gap-12 overflow-hidden w-full mask-linear py-6">
                    {/* Duplicate 3 times for coverage */}
                    {[1, 2, 3].map((key) => (
                        <motion.div
                            key={key}
                            className="flex gap-12 flex-shrink-0"
                            initial={{ x: reverse ? '-100%' : '0%' }}
                            animate={{ x: reverse ? '0%' : '-100%' }}
                            transition={{ ease: "linear", duration: 80, repeat: Infinity }}
                        >
                            {BADGE_IMAGES.map((src, i) => (
                                <div key={i} className="w-28 h-28 flex-shrink-0 relative transition-transform duration-300 hover:scale-125 hover:z-10">
                                    <img src={src} alt="" className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Foreground Text - Hidden by default, grows and fades in on hover */}
            {/* OPTION 1 STYLE AS REQUESTED */}
            <div className="relative z-10 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90">
                <h2 className="text-4xl md:text-6xl font-cooper font-bold text-gvc-gold leading-none tracking-tight drop-shadow-[0_4px_0_rgba(0,0,0,1)] filter">
                    BADGES ARE
                </h2>
                <h2 className="text-5xl md:text-7xl font-cooper font-bold text-white leading-none tracking-tight mt-1 drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)]">
                    THE ALPHA
                </h2>
            </div>

        </div>
    );
}
