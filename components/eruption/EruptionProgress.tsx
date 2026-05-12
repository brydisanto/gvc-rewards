'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface Props {
  balanceEth: number;
  progressEth: number;
  remainingEth: number;
  progressPct: number;
  completedEruptions: number;
  threshold: number;
  isLoading: boolean;
}

export default function EruptionProgress({
  balanceEth,
  progressEth,
  remainingEth,
  progressPct,
  completedEruptions,
  threshold,
  isLoading,
}: Props) {
  const pct = Math.max(0, Math.min(100, progressPct));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-10 shadow-[0_0_40px_rgba(255,95,31,0.15)]">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-b from-transparent via-transparent to-gvc-orange/20" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-gvc-orange/90 font-mundial font-bold tracking-[0.2em] text-xs uppercase mb-2">
                Next Rewards Eruption
              </p>
              <h2 className="text-3xl md:text-5xl font-cooper text-white uppercase leading-tight">
                {isLoading ? '...' : `${progressEth.toFixed(3)} / ${threshold} ETH`}
              </h2>
              <p className="font-mundial text-white/60 text-sm mt-2">
                Triggered every {threshold} ETH that flows into <span className="text-gvc-gold font-bold">vibestrategy.eth</span>.
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/50 font-mundial text-xs uppercase tracking-wider">Eruptions To Date</p>
              <p className="text-4xl font-cooper text-gvc-orange leading-none mt-1">
                {isLoading ? '—' : completedEruptions}
              </p>
            </div>
          </div>

          <div className="relative h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gvc-orange via-gvc-gold to-gvc-orange shadow-[0_0_20px_rgba(255,95,31,0.6)]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-cooper font-bold text-sm text-black mix-blend-difference">
              {pct.toFixed(1)}%
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-mundial">
            <div className="flex items-center gap-2 text-white/70">
              <Flame className="w-4 h-4 text-gvc-orange" />
              <span>Wallet holds <span className="text-gvc-gold font-bold">{isLoading ? '...' : balanceEth.toFixed(3)} ETH</span></span>
            </div>
            <div className="text-white/70">
              <span className="text-white/50 uppercase tracking-wider text-xs">Until next: </span>
              <span className="text-gvc-orange font-bold">{isLoading ? '...' : remainingEth.toFixed(3)} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
