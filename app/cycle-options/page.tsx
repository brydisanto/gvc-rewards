'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Simplified Step Component for the demo
const DemoStep = ({ label, className = "" }) => (
    <div className={`p-6 bg-white/5 border border-white/10 rounded-xl text-center backdrop-blur-sm ${className}`}>
        <span className="font-bold text-white/50">{label}</span>
    </div>
);

// Option A: Curved SVG Arrow (The Swoosh)
const OptionA = () => (
    <div className="relative p-8 border border-white/10 rounded-3xl bg-black/20">
        <div className="absolute top-4 left-4 text-gvc-gold font-bold">OPTION A: THE SWOOSH</div>
        <div className="max-w-md mx-auto space-y-8 relative py-12">
            <DemoStep label="STEP 1: VOLUME" className="relative z-10" />
            <DemoStep label="STEP 2: SPLIT" className="opacity-50" />
            <DemoStep label="STEP 3: RELIST" className="opacity-50" />
            <DemoStep label="STEP 4: BUY PRESSURE" className="relative z-10" />
            <DemoStep label="STEP 5: BURN" className="opacity-50" />

            {/* The SVG Arrow - Left Side */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
                {/* Path from Left of Step 4 to Left of Step 1 */}
                <defs>
                    <linearGradient id="gradA" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#D4AF37" />
                    </marker>
                </defs>
                <path
                    d="M 50 280 C -50 280, -50 40, 50 40"
                    fill="none"
                    stroke="url(#gradA)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className="opacity-60"
                />
            </svg>
        </div>
    </div>
);

// Option B: Tech Circuit (Right Angled)
const OptionB = () => (
    <div className="relative p-8 border border-white/10 rounded-3xl bg-black/20">
        <div className="absolute top-4 left-4 text-gvc-gold font-bold">OPTION B: TECH CIRCUIT</div>
        <div className="max-w-md mx-auto space-y-8 relative py-12">
            <DemoStep label="STEP 1: VOLUME" className="relative z-10" />
            <DemoStep label="STEP 2: SPLIT" className="opacity-50" />
            <DemoStep label="STEP 3: RELIST" className="opacity-50" />
            <DemoStep label="STEP 4: BUY PRESSURE" className="relative z-10" />
            <DemoStep label="STEP 5: BURN" className="opacity-50" />

            {/* Right Angled Line */}
            <div className="absolute top-[40px] right-[20px] bottom-[160px] w-20 border-r-2 border-t-2 border-b-2 border-gvc-gold/30 rounded-r-xl pointer-events-none" />
            {/* Arrow on top connecting back to Step 1 */}
            <div className="absolute top-[40px] right-[40px] text-gvc-gold/50 -rotate-90">➤</div>
        </div>
    </div>
);

// Option C: Dashed Animated Loop
const OptionC = () => (
    <div className="relative p-8 border border-white/10 rounded-3xl bg-black/20">
        <div className="absolute top-4 left-4 text-gvc-gold font-bold">OPTION C: PULSE LOOP</div>
        <div className="max-w-md mx-auto space-y-8 relative py-12">
            <DemoStep label="STEP 1: VOLUME" className="relative z-10" />
            <DemoStep label="STEP 2: SPLIT" className="opacity-50" />
            <DemoStep label="STEP 3: RELIST" className="opacity-50" />
            <DemoStep label="STEP 4: BUY PRESSURE" className="relative z-10" />
            <DemoStep label="STEP 5: BURN" className="opacity-50" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <path
                    d="M 380 280 C 480 280, 480 40, 380 40"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    className="opacity-40"
                >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                {/* Return Arrow */}
                <path d="M 370 40 L 385 35 L 385 45 Z" fill="#D4AF37" />
            </svg>
        </div>
    </div>
);

export default function CycleOptions() {
    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gvc-gold to-white">
                FEEDBACK LOOP VISUALIZATION CONCEPTS
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <OptionA />
                <OptionB />
                <OptionC />
            </div>
            <div className="text-center mt-12 text-white/40">
                Visualizing the connection from Step 4 (Buy Pressure) back to Step 1 (Volume)
            </div>
        </div>
    );
}
