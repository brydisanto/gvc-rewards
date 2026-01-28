'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, TrendingUp, Coins, Trophy } from 'lucide-react';

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
        {/* Handle */}
        <path d="M12 3v7" />
        {/* Head */}
        <path d="M5 10h14a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a2 2 0 0 1 2-2z" />
        {/* Band */}
        <path d="M3 14h18" />
        {/* Bristles */}
        <path d="M12 14v8" />
        <path d="M8 14v8" />
        <path d="M16 14v8" />
        {/* Stars */}
        <path d="M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        <path d="M4 3l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" />
    </svg>
);

const ALL_BADGES = [
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
    '/badges/zoom_in_vibe_out_1759174018930.webp'
];

// Predefined positions and animations for the "swarm"
const BADGE_POSITIONS = [
    // Top Cluster
    { className: "absolute -top-12 -left-8 w-20 h-20 drop-shadow-lg z-20", animate: { y: [0, -12, 0], rotate: [0, -5, 0] }, transition: { duration: 4 } },
    { className: "absolute -top-20 left-12 w-16 h-16 drop-shadow-lg z-10", animate: { y: [0, 8, 0], x: [0, 5, 0] }, transition: { duration: 5, delay: 1 } },
    { className: "absolute -top-10 right-1/4 w-14 h-14 drop-shadow-lg z-20", animate: { y: [0, -10, 0] }, transition: { duration: 4.5, delay: 2 } },
    { className: "absolute -top-24 right-12 w-24 h-24 drop-shadow-lg z-20", animate: { y: [0, -15, 0] }, transition: { duration: 6, delay: 0.5 } },
    { className: "absolute -top-12 -right-8 w-16 h-16 drop-shadow-lg z-10", animate: { y: [0, 6, 0], rotate: [0, 10, 0] }, transition: { duration: 4.5, delay: 2 } },
    { className: "absolute -top-28 left-1/2 w-14 h-14 drop-shadow-lg opacity-80", animate: { y: [0, -8, 0] }, transition: { duration: 4, delay: 1.2 } },

    // Left Cluster
    { className: "absolute top-1/4 -left-20 w-20 h-20 drop-shadow-lg z-10", animate: { y: [0, -10, 0], x: [0, -5, 0] }, transition: { duration: 5.5, delay: 2 } },
    { className: "absolute top-1/2 -left-24 w-14 h-14 drop-shadow-lg opacity-90", animate: { y: [0, -8, 0] }, transition: { duration: 3.5, delay: 1.5 } },
    { className: "absolute bottom-1/4 -left-16 w-16 h-16 drop-shadow-lg z-20", animate: { y: [0, -8, 0] }, transition: { duration: 5, delay: 0.8 } },
    { className: "absolute top-10 -left-12 w-14 h-14 drop-shadow-lg opacity-80", animate: { y: [0, 8, 0] }, transition: { duration: 4, delay: 3 } },
    { className: "absolute top-2/3 -left-28 w-18 h-18 drop-shadow-lg z-10", animate: { rotate: [0, 5, 0], x: [0, 5, 0] }, transition: { duration: 6, delay: 1 } },

    // Right Cluster
    { className: "absolute top-1/3 -right-20 w-20 h-20 drop-shadow-lg z-10", animate: { y: [0, -10, 0], x: [0, -5, 0] }, transition: { duration: 5.5, delay: 2 } },
    { className: "absolute top-2/3 -right-16 w-16 h-16 drop-shadow-lg z-20", animate: { y: [0, 6, 0], rotate: [0, -10, 0] }, transition: { duration: 4, delay: 2.5 } },
    { className: "absolute bottom-1/3 -right-24 w-18 h-18 drop-shadow-lg opacity-90", animate: { y: [0, 10, 0] }, transition: { duration: 4.2, delay: 3 } },
    { className: "absolute top-10 -right-12 w-14 h-14 drop-shadow-lg z-10", animate: { y: [0, -8, 0] }, transition: { duration: 5, delay: 0.8 } },
    { className: "absolute bottom-1/2 -right-28 w-14 h-14 drop-shadow-lg z-0", animate: { scale: [1, 1.1, 1], rotate: [0, -5, 0] }, transition: { duration: 5, delay: 0.5 } },

    // Bottom Cluster
    { className: "absolute -bottom-16 left-1/4 w-20 h-20 drop-shadow-lg z-20", animate: { y: [0, -6, 0] }, transition: { duration: 3.5, delay: 0.5 } },
    { className: "absolute -bottom-20 left-12 w-16 h-16 drop-shadow-lg opacity-80", animate: { y: [0, 8, 0] }, transition: { duration: 4.5, delay: 1.5 } },
    { className: "absolute -bottom-14 right-1/4 w-16 h-16 drop-shadow-lg z-10", animate: { y: [0, 10, 0] }, transition: { duration: 4.2, delay: 3 } },
    { className: "absolute -bottom-18 -right-8 w-14 h-14 drop-shadow-lg z-20", animate: { y: [0, 6, 0] }, transition: { duration: 4, delay: 2.5 } },
    { className: "absolute -bottom-12 -left-12 w-18 h-18 drop-shadow-lg z-10", animate: { y: [0, -10, 0] }, transition: { duration: 5.5, delay: 2 } },
    { className: "absolute -bottom-24 right-1/2 w-14 h-14 drop-shadow-lg z-0", animate: { y: [0, 12, 0] }, transition: { duration: 6, delay: 1 } },

    // Extremities - Far corners
    { className: "absolute -top-24 -left-20 w-16 h-16 drop-shadow-lg z-0 opacity-60", animate: { scale: [1, 1.1, 1] }, transition: { duration: 4, delay: 0 } },
    { className: "absolute -top-24 -right-20 w-16 h-16 drop-shadow-lg z-0 opacity-60", animate: { scale: [1, 1.1, 1] }, transition: { duration: 4, delay: 1 } },
    { className: "absolute -bottom-24 -left-20 w-16 h-16 drop-shadow-lg z-0 opacity-60", animate: { scale: [1, 1.1, 1] }, transition: { duration: 4, delay: 2 } },
    { className: "absolute -bottom-24 -right-20 w-16 h-16 drop-shadow-lg z-0 opacity-60", animate: { scale: [1, 1.1, 1] }, transition: { duration: 4, delay: 3 } },

    // Inner Floating
    { className: "absolute top-0 left-0 w-14 h-14 drop-shadow-lg opacity-40", animate: { scale: [1, 1.2, 1] }, transition: { duration: 3, delay: 0 } },
    { className: "absolute bottom-0 right-0 w-14 h-14 drop-shadow-lg opacity-40", animate: { scale: [1, 1.2, 1] }, transition: { duration: 3, delay: 2 } },
];

export default function HowItWorks() {
    // Select random unique badges on mount
    const [randomBadges, setRandomBadges] = React.useState<string[]>([]);

    React.useEffect(() => {
        const shuffled = [...ALL_BADGES].sort(() => 0.5 - Math.random());
        setRandomBadges(shuffled.slice(0, BADGE_POSITIONS.length));
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-4">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-4"
            >
                {/* ... existing steps ... */}

                {/* ... existing steps ... */}

                {/* ... existing steps ... */}

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <TrendingUp className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-xl font-cooper font-bold text-white uppercase">USERS TRADE $VIBESTR</h3>
                    </div>
                    <p className="text-white/60 font-mundial text-sm">On either OpenSea or the TokenWorks website.</p>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ArrowDown className="w-8 h-8 text-white/20 animate-bounce" />
                </motion.div>

                {/* Step 2: Fees Generated */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Coins className="w-8 h-8 text-gvc-gold" />
                        <h3 className="text-xl font-cooper font-bold text-white uppercase">PROTOCOL GENERATES FEES</h3>
                    </div>
                    <p className="text-white/60 font-mundial text-sm">
                        <span className="font-bold text-gvc-gold">10%</span> of buy and sell volume is taken as a fee.
                        <br />
                        This flows primarily to 2 different places:
                    </p>
                </motion.div>

                {/* Split Arrow */}
                <motion.div variants={item} className="w-full max-w-2xl hidden md:flex justify-center h-12 relative">
                    <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-white/20 -translate-x-1/2" />
                    <div className="absolute top-6 left-1/4 right-1/4 h-0.5 bg-white/20 border-t border-white/20 rounded-full" />
                    <div className="absolute top-6 left-1/4 w-0.5 h-6 bg-white/20" />
                    <div className="absolute top-6 right-1/4 w-0.5 h-6 bg-white/20" />
                </motion.div>

                {/* Mobile Arrow */}
                <motion.div variants={item} className="md:hidden">
                    <ArrowDown className="w-8 h-8 text-white/20 animate-bounce" />
                </motion.div>

                {/* Split Branches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                    {/* Branch 1 */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gvc-dark border border-gvc-gold/30 rounded-xl p-6 text-center h-full hover:border-gvc-gold transition-colors cursor-default"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Trophy className="w-8 h-8 text-gvc-gold mb-2" />
                            <h3 className="text-lg font-cooper font-bold text-white uppercase">ADDS TO THE REWARDS POOL</h3>
                            <p className="text-white/60 text-sm font-mundial"><span className="font-bold text-gvc-gold">10%</span> of fees automatically accrue as ETH to the VibeStrategy.eth Rewards wallet.</p>
                        </div>
                    </motion.div>

                    {/* Branch 2 */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gvc-dark border border-gvc-gold/30 rounded-xl p-6 text-center h-full hover:border-gvc-gold transition-colors cursor-default"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <BroomIcon className="w-8 h-8 text-gvc-gold mb-2" />
                            <h3 className="text-lg font-cooper font-bold text-white uppercase">BUYS GVCS OFF THE FLOOR</h3>
                            <p className="text-white/60 text-sm font-mundial"><span className="font-bold text-gvc-gold">80%</span> of fees are used to buy GVCs off OpenSea. These are then added to the VibeStrategy™ treasury and re-listed at a premium. All sale proceeds buy & burn $VIBESTR.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Converging Bracket */}
                <motion.div variants={item} className="w-full max-w-3xl hidden md:flex justify-center h-24 relative">
                    {/* Vertical lines from boxes */}
                    <div className="absolute top-0 left-1/4 w-0.5 h-12 bg-white/20" />
                    <div className="absolute top-0 right-1/4 w-0.5 h-12 bg-white/20" />

                    {/* Horizontal connecting line */}
                    <div className="absolute top-12 left-1/4 right-1/4 h-0.5 bg-white/20" />

                    {/* Central downward line */}
                    <div className="absolute top-12 left-1/2 w-0.5 h-12 bg-white/20 -translate-x-1/2" />

                    {/* Arrow at the bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
                        <ArrowDown className="w-8 h-8 text-white/20 animate-bounce bg-gvc-black rounded-full" />
                    </div>
                </motion.div>

                {/* Mobile Arrow for small screens */}
                <motion.div variants={item} className="md:hidden pt-4">
                    <ArrowDown className="w-8 h-8 text-white/20 animate-bounce" />
                </motion.div>

                {/* Final Step: Rewards */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10 mt-8 bg-gradient-to-br from-gvc-gold/10 to-transparent border border-gvc-gold rounded-xl p-10 md:p-14 w-full max-w-3xl text-center backdrop-blur-sm shadow-[0_0_50px_rgba(255,224,72,0.2)] group cursor-default"
                >
                    {/* Floating Badges Decoration - Hidden on small screens to prevent clutter, visible on md+ */}
                    <div className="absolute inset-0 pointer-events-none hidden md:block overflow-visible">
                        {randomBadges.map((badgeSrc, index) => {
                            const pos = BADGE_POSITIONS[index % BADGE_POSITIONS.length];
                            // Only render if we have a position for it (safety check)
                            if (!pos) return null;

                            return (
                                <motion.img
                                    key={`${badgeSrc}-${index}`}
                                    src={badgeSrc}
                                    className={pos.className}
                                    animate={pos.animate}
                                    transition={{
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        ...pos.transition
                                    }}
                                />
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h3 className="text-3xl font-cooper font-bold text-gvc-gold uppercase">BADGE COLLECTORS WIN!</h3>
                    </div>
                    <p className="text-white/80 font-mundial text-lg leading-relaxed max-w-2xl mx-auto">
                        The Rewards Pool is used to support our collector ecosystem. Collect Badges to be eligible for distributions of $VIBESTR, $PNKSTR, GVCs, and special rewards like CryptoPunk #2457. More badges = greater access to the Rewards Pool.
                    </p>
                </motion.div>

            </motion.div>
        </div>
    );
}
