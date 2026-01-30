'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown, Flame, RefreshCw, Trophy } from 'lucide-react';

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

// Start with a smaller subset of positions suitable for a smaller card
const BADGE_POSITIONS = [
    { className: "absolute -top-6 -right-6 w-12 h-12 drop-shadow-lg z-20", animate: { y: [0, -8, 0], rotate: [0, 5, 0] }, transition: { duration: 4 } },
    { className: "absolute -bottom-6 -right-4 w-14 h-14 drop-shadow-lg z-20", animate: { y: [0, 6, 0] }, transition: { duration: 5, delay: 0.5 } },
    { className: "absolute top-1/2 -right-8 w-10 h-10 drop-shadow-lg z-10", animate: { x: [0, 5, 0] }, transition: { duration: 4.5, delay: 1 } },
    { className: "absolute -top-4 right-1/2 w-10 h-10 drop-shadow-lg z-0 opacity-80", animate: { y: [0, -5, 0] }, transition: { duration: 3.5, delay: 1.5 } },
    { className: "absolute bottom-0 right-1/3 w-8 h-8 drop-shadow-lg z-0 opacity-60", animate: { scale: [1, 1.1, 1] }, transition: { duration: 4, delay: 2 } }
];

const StepRibbon = ({ text }: { text: string }) => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/90 border border-gvc-gold/40 px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
        <span className="text-[10px] md:text-xs font-mono text-gvc-gold tracking-widest uppercase font-bold italic">
            {text}
        </span>
    </div>
);

const ConnectingArrow = () => (
    <div className="flex flex-col items-center justify-center py-4">
        <ChevronsDown className="w-10 h-10 text-white/30 animate-bounce" />
    </div>
);

// Feedback Loop Arrow (The Swoosh - Option A style)
const FeedbackLoopArrow = () => (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible z-0">
        <svg className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="gradLoop" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                </linearGradient>
                <marker id="arrowhead-gold" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#D4AF37" />
                </marker>
            </defs>
            <path
                d="M calc(50% - 240px) 1150 C calc(50% - 350px) 1150, calc(50% - 350px) 200, calc(50% - 240px) 200"
                fill="none"
                stroke="url(#gradLoop)"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead-gold)"
                className="opacity-60"
            >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="30s" repeatCount="indefinite" />
            </path>
        </svg>
    </div>
);

export default function ExampleFlow() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Select random unique badges on mount
    const [randomBadges, setRandomBadges] = React.useState<string[]>([]);

    React.useEffect(() => {
        const shuffled = [...ALL_BADGES].sort(() => 0.5 - Math.random());
        setRandomBadges(shuffled.slice(0, BADGE_POSITIONS.length));
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 mb-20 px-4 relative">

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-0 relative"
            >
                {/* Intro Header */}
                <motion.div variants={item} className="mb-12 text-center max-w-2xl px-4 z-10 relative">
                    <h2 className="text-gvc-gold font-mundial font-bold tracking-widest text-sm md:text-base uppercase leading-relaxed">
                        BELOW IS A SIMULATED EXAMPLE TO SHOW HOW $$$ AUTOMATICALLY FLOWS THROUGH THE VIBESTRATEGY PROTOCOL AS $VIBESTR & GOOD VIBES CLUB NFTS TRADE ON THE MARKET.
                    </h2>
                </motion.div>

                {/* Global Feedback Loop Arrow */}
                <FeedbackLoopArrow />

                {/* Step 1: Volume */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    {/* Revert confirmed */}
                    <StepRibbon text="STEP 1" />
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        <h3 className="text-xl md:text-2xl font-cooper font-bold text-white uppercase leading-tight">
                            $VIBESTR HITS <span className="text-gvc-gold">$1M</span> IN DAILY TRADING VOLUME
                        </h3>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ConnectingArrow />
                </motion.div>

                {/* Step 2: The Split (Fork) */}
                <motion.div
                    variants={item}
                    className="w-full max-w-4xl mx-auto z-10 relative"
                >
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                            {/* 2A: Buys GVCs */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-l-2xl md:rounded-r-none rounded-xl border border-white/10 md:border-r-white/10 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                <StepRibbon text="STEP 2A" />
                                <div className="space-y-3">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        <span className="text-gvc-gold">$80,000 (8%)</span> IS RESERVED AS A FEE & AUTOMATICALLY BUYS GVCS
                                    </p>
                                    <p className="text-white/60 text-base font-mundial leading-tight px-2">
                                        The protocol buys <span className="text-gvc-gold font-bold">30 GVCs</span> from the OpenSea floor and adds them to the treasury.
                                    </p>
                                    <p className="text-xs italic text-white/40 font-mundial mt-2">(If ETH = $3,000 & the GVC floor is .9ETH)</p>
                                </div>
                                {/* Visual cue for continuation downwards - Desktop only */}
                                <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white/20 rounded-full z-20"></div>
                            </div>

                            {/* 2B: Rewards Pool */}
                            <div className="relative bg-white/5 backdrop-blur-sm md:rounded-r-2xl md:rounded-l-none rounded-xl border border-white/10 md:border-l-0 p-8 pt-16 text-center group hover:bg-white/10 transition-colors">
                                {/* Floating Badges Decoration */}
                                <div className="absolute inset-0 pointer-events-none hidden md:block overflow-visible">
                                    {randomBadges.map((badgeSrc, index) => {
                                        const pos = BADGE_POSITIONS[index % BADGE_POSITIONS.length];
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

                                <StepRibbon text="STEP 2B" />
                                <div className="space-y-3">
                                    <p className="font-cooper font-bold text-white uppercase text-lg leading-tight">
                                        <span className="text-gvc-gold">$10,000 (1%)</span> ACCRUES TO THE REWARDS POOL
                                    </p>
                                    <p className="text-white/60 text-base font-mundial leading-tight px-2">
                                        This is used to buy $VIBESTR, GVC NFTs, $PNKSTR and more as rewards for Badgeholders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Arrow Connecting 2A to Step 3 */}
                <motion.div variants={item} className="w-full max-w-4xl relative">
                    <div className="w-full flex md:block justify-center">
                        {/* Wrapper to position line correctly under left column on desktop */}
                        <div className="md:w-1/2 flex justify-center">
                            <ConnectingArrow />
                        </div>
                    </div>
                </motion.div>

                {/* Step 3: Relisting */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 3" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            THE PROTOCOL IMMEDIATELY RELISTS THE 30 GVCS AT A PREMIUM
                        </p>
                        <p className="text-white/60 font-mundial text-base leading-tight">
                            They're automatically relisted on OpenSea at ~1.6 ETH. They never move until sold.
                        </p>
                        <p className="text-xs italic text-white/40 font-mundial">(Uses a randomized premium between 1.2-2x)</p>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ConnectingArrow />
                </motion.div>

                {/* Step 4: Buy Pressure */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 bg-gvc-dark border border-white/20 rounded-xl p-8 pt-12 w-full max-w-md text-center backdrop-blur-sm cursor-default transition-colors hover:border-gvc-gold/50"
                >
                    <StepRibbon text="STEP 4" />
                    <div className="space-y-3">
                        <p className="font-cooper font-bold text-white text-lg leading-tight uppercase">
                            AS THE 30 GVCS SELL, THE PROTOCOL AUTOMATICALLY BUYS $VIBESTR
                        </p>
                        <p className="text-white/60 text-base font-mundial leading-tight">
                            This purchases <span className="text-gvc-gold font-bold">~48 ETH</span> worth of $VIBESTR once all 30 GVCs are sold.
                        </p>
                        <p className="text-xs italic text-white/40 font-mundial">(At $0.01, that = 13.2M $VIBESTR)</p>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div variants={item}>
                    <ConnectingArrow />
                </motion.div>

                {/* Step 5 Outcomes: Burn & Volume */}
                <motion.div
                    variants={item}
                    className="w-full max-w-4xl mx-auto z-10 relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Burn Box (Step 5) */}
                        <motion.div
                            className="relative w-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <StepRibbon text="STEP 5" />
                            <div className="bg-[#111] border border-gvc-orange rounded-[32px] p-8 pt-16 w-full text-center overflow-hidden shadow-[0_0_30px_rgba(255,100,0,0.15)] h-full flex flex-col justify-center transition-transform duration-300">
                                {/* Interactive glow effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-orange-500/5 to-transparent animate-pulse pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flame className="w-5 h-5 text-gvc-orange fill-gvc-orange animate-pulse" />
                                        <h3 className="text-white font-mundial font-bold tracking-widest text-sm uppercase">
                                            $VIBESTR BURNED
                                        </h3>
                                    </div>
                                    <p className="font-cooper font-bold text-gvc-orange text-4xl md:text-5xl leading-none tracking-tight">
                                        13.2M
                                    </p>
                                    <p className="text-white/60 font-mundial text-sm pt-2 px-4 leading-tight">
                                        All $VIBESTR purchased by the protocol via GVC sales is automatically burned.
                                    </p>
                                    <p className="text-gvc-orange font-mundial font-bold text-sm pt-2">
                                        That = 1.3% of the total supply
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Green Box (Volume Loop) */}
                        <motion.div
                            className="relative w-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="bg-[#111] border border-gvc-green rounded-[32px] p-8 pt-16 w-full text-center overflow-hidden shadow-[0_0_30px_rgba(0,255,100,0.15)] h-full flex flex-col justify-center transition-transform duration-300">
                                {/* Interactive glow effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-green-500/5 to-transparent animate-pulse pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <RefreshCw className="w-5 h-5 text-gvc-green animate-spin-slow" />
                                        <h3 className="text-white font-mundial font-bold tracking-widest text-sm uppercase">
                                            CYCLE CONTINUES
                                        </h3>
                                    </div>

                                    <p className="font-cooper font-bold text-gvc-green text-2xl md:text-3xl leading-tight uppercase">
                                        GENERATES 48 ETH IN NEW TRADING VOLUME
                                    </p>

                                    <p className="text-white/60 font-mundial font-bold text-sm leading-tight max-w-[200px] mx-auto">
                                        On and on it goes. Forever. Automatically.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Final Summary Note */}
                <motion.div
                    variants={item}
                    className="relative z-10 w-full max-w-2xl mx-auto text-center mt-12 mb-8"
                >
                    <div className="inline-block relative">
                        <p className="font-cooper font-bold text-white text-xl md:text-2xl leading-relaxed italic tracking-wide">
                            ...and that's just from a single day with <span className="text-gvc-gold">$1M</span> in trading volume!
                        </p>
                    </div>
                </motion.div>

            </motion.div>
        </div >
    );
}
