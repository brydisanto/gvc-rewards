'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LOYALTY_TIERS, LOYALTY_START } from '@/lib/shakaScore';
import CountUp from './CountUp';

interface Props {
  shakaScore: number;
  loyaltyMonths: number;
  loyaltyName: string;
  loyaltyMultiplier: number;
  punkScore: number;
}

export default function PunkScoreCard({
  shakaScore,
  loyaltyMonths,
  loyaltyName,
  loyaltyMultiplier,
  punkScore,
}: Props) {
  const beforeLoyalty = new Date() < LOYALTY_START;
  const activeIndex = LOYALTY_TIERS.findIndex((t) => t.name === loyaltyName);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative rounded-3xl border border-gvc-orange/40 bg-gradient-to-br from-gvc-orange/[0.08] via-black/40 to-black/60 backdrop-blur-md p-6 md:p-8 shadow-[0_0_50px_rgba(255,95,31,0.15)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,95,31,0.1),transparent_60%)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="font-mundial font-bold tracking-[0.2em] text-[11px] uppercase text-gvc-orange/90">
            Punk Score
          </p>
          <div className="relative w-9 h-9 flex-shrink-0 opacity-90">
            <Image src="/icon-punk.png" alt="Punk" fill className="object-contain" sizes="36px" />
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <CountUp
            value={punkScore}
            className="text-6xl md:text-7xl font-cooper text-gvc-orange leading-none drop-shadow-[0_0_25px_rgba(255,95,31,0.45)]"
          />
          <p className="text-white/30 font-mundial text-sm">pts</p>
        </div>

        {/* Formula breakdown — visual */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <FormulaCell label="Shaka" value={<CountUp value={shakaScore} className="font-cooper text-2xl text-gvc-gold" />} />
          <FormulaCell label="Loyalty" value={<span className="font-cooper text-2xl text-white">×{loyaltyMultiplier.toFixed(2)}</span>} />
          <FormulaCell label="Punk" value={<CountUp value={punkScore} className="font-cooper text-2xl text-gvc-orange" />} highlight />
        </div>

        {/* Loyalty Ladder */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="font-mundial text-[10px] uppercase tracking-[0.15em] text-white/40">Loyalty Ladder</p>
            <p className="font-mundial text-[10px] uppercase tracking-wider text-white/50">
              <span className="text-white/70">{loyaltyMonths}</span> mo continuous
            </p>
          </div>
          <div className="relative">
            {/* Track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeIndex >= 0 ? (activeIndex + 1) / LOYALTY_TIERS.length : 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gvc-orange/70 origin-left"
              style={{ width: '100%' }}
            />
            <div className="relative grid grid-cols-4 gap-2">
              {LOYALTY_TIERS.map((t, i) => {
                const active = t.name === loyaltyName;
                const reached = i <= activeIndex;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className={`relative rounded-lg border px-2 py-2.5 text-center transition-all ${
                      active
                        ? 'border-gvc-orange/70 bg-gvc-orange/15 shadow-[0_0_20px_rgba(255,95,31,0.25)]'
                        : reached
                        ? 'border-white/15 bg-white/[0.03]'
                        : 'border-white/5 bg-black/30'
                    }`}
                  >
                    <p
                      className={`font-mundial font-bold text-[10px] uppercase tracking-wider ${
                        active ? 'text-white' : reached ? 'text-white/70' : 'text-white/30'
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`font-cooper text-lg mt-0.5 ${
                        active ? 'text-gvc-orange' : reached ? 'text-white/80' : 'text-white/25'
                      }`}
                    >
                      ×{t.multiplier.toFixed(2)}
                    </p>
                    <p className="font-mundial text-[8px] uppercase tracking-wider text-white/30 mt-1">
                      {t.maxMonths === null ? `${t.minMonths}+ mo` : `${t.minMonths}–${t.maxMonths} mo`}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {beforeLoyalty && (
            <p className="font-mundial text-white/35 text-[11px] mt-3 italic text-center">
              Loyalty period begins {LOYALTY_START.toISOString().slice(0, 10)}. Everyone starts as Newcomer.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FormulaCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border ${highlight ? 'border-gvc-orange/60 bg-gvc-orange/10' : 'border-white/10 bg-black/30'} px-3 py-3 text-center`}
    >
      <p className="font-mundial text-[9px] uppercase tracking-wider text-white/40 mb-1.5">{label}</p>
      {value}
    </div>
  );
}
