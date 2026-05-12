'use client';

import { motion } from 'framer-motion';
import { TIER_COLOR } from '@/data/badgeTiers';
import type { ShakaBreakdown } from '@/lib/shakaScore';
import CountUp from './CountUp';

export default function ShakaScoreCard({ breakdown }: { breakdown: ShakaBreakdown }) {
  const total = breakdown.basePoints || 1;
  const citizenPct = (breakdown.citizenPoints / total) * 100;
  const badgePct = (breakdown.badgePoints / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border border-gvc-gold/40 bg-gradient-to-br from-gvc-gold/[0.07] via-black/40 to-black/60 backdrop-blur-md p-6 md:p-8 shadow-[0_0_50px_rgba(255,224,72,0.12)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,224,72,0.08),transparent_60%)]" />

      <div className="relative z-10">
        <div className="flex items-baseline justify-between mb-1">
          <p className="font-mundial font-bold tracking-[0.2em] text-[11px] uppercase text-gvc-gold/90">
            Shaka Score
          </p>
          <p className="font-mundial text-[10px] uppercase tracking-wider text-white/30">Monthly · additive</p>
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <CountUp
            value={breakdown.shakaScore}
            className="text-6xl md:text-7xl font-cooper text-gvc-gold leading-none drop-shadow-[0_0_25px_rgba(255,224,72,0.35)]"
          />
          <p className="text-white/30 font-mundial text-sm">pts</p>
        </div>

        {/* Base points breakdown bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[11px] font-mundial uppercase tracking-wider text-white/40 mb-2">
            <span>Base Points</span>
            <span className="font-cooper text-base text-white normal-case tracking-normal">
              <CountUp value={breakdown.basePoints} />
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-white/5 overflow-hidden flex">
            {breakdown.citizenPoints > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${citizenPct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gvc-orange/80"
                style={{ borderRight: badgePct > 0 ? '1px solid rgba(0,0,0,0.5)' : 'none' }}
              />
            )}
            {breakdown.badgePoints > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${badgePct}%` }}
                transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
                className="h-full bg-gvc-gold"
              />
            )}
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mundial">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-gvc-orange/80" />
              <span className="text-white/60">Citizen</span>
              <span className="text-white/40">{breakdown.citizenPoints.toLocaleString()}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-gvc-gold" />
              <span className="text-white/60">Badges</span>
              <span className="text-white/40">{breakdown.badgePoints.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* Multiplier chips */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <MultiplierChip
            label="Highest Tier"
            tierName={breakdown.highestTier}
            multiplier={breakdown.highestTierMultiplier}
            color={TIER_COLOR[breakdown.highestTier]}
          />
          <MultiplierChip
            label="$VIBESTR Tier"
            tierName={breakdown.vibestrTierName ?? 'None'}
            multiplier={breakdown.vibestrTierMultiplier}
            color="#FFE048"
          />
        </div>

        <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-white/30 text-center tracking-tight">
          {breakdown.basePoints.toLocaleString()} × {breakdown.highestTierMultiplier.toFixed(2)} × {breakdown.vibestrTierMultiplier.toFixed(2)} = <span className="text-gvc-gold/80">{breakdown.shakaScore.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

function MultiplierChip({
  label,
  tierName,
  multiplier,
  color,
}: {
  label: string;
  tierName: string;
  multiplier: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-white/10 bg-black/30 p-3 hover:border-white/20 transition-colors"
    >
      <p className="font-mundial text-[9px] uppercase tracking-wider text-white/40 mb-1">{label}</p>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-cooper text-base uppercase truncate" style={{ color }}>
          {tierName}
        </span>
        <span className="font-mundial font-bold text-sm text-white shrink-0">
          ×{multiplier.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}
