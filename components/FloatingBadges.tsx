'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BADGE_IMAGES = [
    '/rewards-pool/badges/any_gvc_1759173799963.webp',
    '/rewards-pool/badges/astro_balls_1759173838889.webp',
    '/rewards-pool/badges/baller_1759173868839.webp',
    '/rewards-pool/badges/billiards_1759173890603.webp',
    '/rewards-pool/badges/captain_1759173895611.webp',
    '/rewards-pool/badges/cosmic_1759173818340.webp',
    '/rewards-pool/badges/doge_1759173842640.webp',
    '/rewards-pool/badges/funky_fresh_1759174001274.webp',
    '/rewards-pool/badges/gold_member_1759173793799.webp',
    '/rewards-pool/badges/gradient_lover_1759173808918.webp',
    '/rewards-pool/badges/gud_meat_1759173936766.webp',
    '/rewards-pool/badges/high_noon_hustler_1759174007143.webp',
    '/rewards-pool/badges/hoodie_up_society_1759174015984.webp',
    '/rewards-pool/badges/king_1759173882056.webp',
    '/rewards-pool/badges/nounish_vibes_1759173973218.webp',
    '/rewards-pool/badges/party_in_the_back_1759173998578.webp',
    '/rewards-pool/badges/plants_1759173871973.webp',
    '/rewards-pool/badges/pothead_1759173827603.webp',
    '/rewards-pool/badges/rainbow_boombox_1759173875165.webp',
    '/rewards-pool/badges/ranger_1759173821753.webp',
    '/rewards-pool/badges/stone_1759173815165.webp',
    '/rewards-pool/badges/straw_man_1759173985595.webp',
    '/rewards-pool/badges/tanks_a_lot_1759173976815.webp',
    '/rewards-pool/badges/toy_bricks_1759173887659.webp',
    '/rewards-pool/badges/vibefoot_fan_club_1759173939420.webp',
];

interface FloatingItem {
    id: number;
    image: string;
    left: number; // percentage 0-100
    duration: number; // seconds
    delay: number; // seconds
    size: number; // px
    opacity: number;
}

export default function FloatingBadges() {
    const [items, setItems] = useState<FloatingItem[]>([]);

    useEffect(() => {
        // Generate random items on client side to avoid hydration mismatch
        const count = 25; // Number of floating badges
        const newItems: FloatingItem[] = [];

        for (let i = 0; i < count; i++) {
            newItems.push({
                id: i,
                image: BADGE_IMAGES[Math.floor(Math.random() * BADGE_IMAGES.length)],
                left: Math.random() * 100,
                duration: 15 + Math.random() * 20, // Slow float: 15-35s
                delay: Math.random() * -30, // Negative delay to start mid-animation
                size: 60 + Math.random() * 50, // 60px - 110px
                opacity: 0.1 + Math.random() * 0.15, // 0.1 - 0.25 opacity
            });
        }

        // Wrap in setTimeout to avoid synchronous setState in effect warning
        setTimeout(() => setItems(newItems), 0);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {items.map((item) => (
                <motion.img
                    key={item.id}
                    src={item.image}
                    alt=""
                    className="absolute"
                    style={{
                        left: `${item.left}%`,
                        width: item.size,
                        height: item.size, // Assuming square aspect ratio for badges
                        opacity: item.opacity,
                    }}
                    initial={{ y: '110vh', rotate: 0 }}
                    animate={{
                        y: '-10vh',
                        rotate: 360
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay, // Use standard delay, negative value might work differently in framer motion?
                        // Framer motion negative delay basically starts animation 'in the past'.
                    }}
                />
            ))}

            {/* Gradient overlay to fade them out at top/bottom? Optional */}
        </div>
    );
}
