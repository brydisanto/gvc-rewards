'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { VIBESTR_TIERS, getVibestrTier, getNextVibestrTier } from '@/data/badgeTiers';
import { getVibestrTierImage } from '@/data/badgeImages';
import CountUp from './CountUp';

function fmtAmount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return Math.round(n).toLocaleString();
}

export default function VibestrThermometer({ balance }: { balance: number }) {
  const current = getVibestrTier(balance);
  const next = getNextVibestrTier(balance);
  const activeIndex = current ? VIBESTR_TIERS.findIndex((t) => t.name === current.name) : -1;
  const totalTiers = VIBESTR_TIERS.length;

  // Position 0..1 along the track: completed tiers + partial within current
  let progressFraction = 0;
  if (activeIndex >= 0) {
    const completedSegments = activeIndex; // segments fully crossed
    let inSegment = 1; // default fully filled at top
    if (next) {
      const span = next.threshold - current!.threshold;
      inSegment = span > 0 ? Math.min(1, Math.max(0, (balance - current!.threshold) / span)) : 1;
    }
    progressFraction = (completedSegments + inSegment) / (totalTiers - 1);
  }
  progressFraction = Math.min(1, Math.max(0, progressFraction));

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-black/60 via-black/50 to-black/60 border border-white/10 backdrop-blur-md p-6 md:p-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,224,72,0.06),transparent_55%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-gvc-gold/90 font-mundial font-bold tracking-[0.2em] text-[11px] uppercase mb-2">
              $VIBESTR Tier
            </p>
            <h3 className="text-4xl md:text-5xl font-cooper text-white uppercase leading-none">
              {current?.name ?? 'No Tier'}
            </h3>
            <p className="font-mundial text-white/50 text-sm mt-2">
              Holding <span className="text-gvc-gold font-bold">
                <CountUp value={balance} format={(n) => fmtAmount(n)} />
              </span> $VIBESTR
            </p>
          </div>
          {current && (
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 md:w-20 md:h-20 animate-pulse-slow">
                <Image
                  src={getVibestrTierImage(current.badgeId)}
                  alt={`${current.name} tier`}
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(255,224,72,0.55)]"
                  sizes="80px"
                />
              </div>
              <div className="text-right">
                <p className="text-white/40 font-mundial text-[10px] uppercase tracking-wider">Multiplier</p>
                <p className="font-cooper text-3xl text-gvc-gold leading-none mt-1">
                  ×{current.multiplier.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stepped tier track */}
        <div className="relative pt-6 pb-2">
          {/* Background line */}
          <div className="absolute left-3 right-3 top-[2.55rem] h-1 rounded-full bg-white/5" />
          {/* Animated fill line */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `calc(${progressFraction * 100}% - ${progressFraction * 0.75}rem)` }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-3 top-[2.55rem] h-1 rounded-full bg-gradient-to-r from-gvc-orange via-gvc-gold to-gvc-gold shadow-[0_0_15px_rgba(255,224,72,0.5)]"
          />

          <div className="grid gap-2 relative" style={{ gridTemplateColumns: `repeat(${totalTiers}, minmax(0, 1fr))` }}>
            {VIBESTR_TIERS.map((tier, i) => {
              const reached = i <= activeIndex;
              const isCurrent = i === activeIndex;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="flex flex-col items-center text-center group"
                >
                  <p
                    className={`font-mundial text-[9px] md:text-[10px] uppercase tracking-wider mb-2 transition-colors ${
                      isCurrent ? 'text-white' : reached ? 'text-white/60' : 'text-white/25'
                    }`}
                  >
                    {tier.name}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'border-gvc-gold bg-gvc-gold shadow-[0_0_20px_rgba(255,224,72,0.7)]'
                        : reached
                        ? 'border-gvc-gold/70 bg-gvc-gold/60'
                        : 'border-white/15 bg-black/60'
                    }`}
                  >
                    {isCurrent && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-gvc-gold"
                      />
                    )}
                  </motion.div>
                  <p
                    className={`font-cooper text-xs md:text-sm mt-2 transition-colors ${
                      isCurrent ? 'text-gvc-gold' : reached ? 'text-white/70' : 'text-white/25'
                    }`}
                  >
                    ×{tier.multiplier.toFixed(2)}
                  </p>
                  <p
                    className={`font-mundial text-[9px] mt-0.5 transition-colors ${
                      reached ? 'text-white/40' : 'text-white/20'
                    }`}
                  >
                    {fmtAmount(tier.threshold)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer — progress to next */}
        {next ? (
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mundial text-[10px] uppercase tracking-wider text-white/40">
                Progress to <span className="text-white font-bold">{next.name}</span>
              </p>
              <p className="font-mundial text-xs">
                <span className="text-gvc-gold font-bold">
                  <CountUp value={next.threshold - balance} format={(n) => fmtAmount(Math.max(0, n))} />
                </span>
                <span className="text-white/40"> more $VIBESTR</span>
              </p>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      ((balance - (current?.threshold ?? 0)) /
                        (next.threshold - (current?.threshold ?? 0))) *
                        100
                    )
                  )}%`,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gvc-gold to-gvc-orange"
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="font-mundial text-[11px] uppercase tracking-[0.2em] text-gvc-gold">
              Top Tier Reached
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
