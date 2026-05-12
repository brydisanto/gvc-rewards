'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface Props {
  vibestrMarketCapUsd: number;
  gvcFloorEth: number;
  gvcVolumeEth: number;
  gvcHolders: number;
  isLoading: boolean;
}

interface Metric {
  label: string;
  current: number;
  target: number;
  fmtCurrent: string;
  fmtTarget: string;
  hit: boolean;
  pct: number;
}

function fmtUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtEth(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K ETH`;
  return `${n.toFixed(2)} ETH`;
}

export default function GigaEruption({
  vibestrMarketCapUsd,
  gvcFloorEth,
  gvcVolumeEth,
  gvcHolders,
  isLoading,
}: Props) {
  const metrics: Metric[] = [
    {
      label: '$VIBESTR Market Cap',
      current: vibestrMarketCapUsd,
      target: 20_000_000,
      fmtCurrent: fmtUsd(vibestrMarketCapUsd),
      fmtTarget: '$20M',
      hit: vibestrMarketCapUsd >= 20_000_000,
      pct: Math.min(100, (vibestrMarketCapUsd / 20_000_000) * 100),
    },
    {
      label: 'GVC Floor',
      current: gvcFloorEth,
      target: 2,
      fmtCurrent: `${gvcFloorEth.toFixed(3)} ETH`,
      fmtTarget: '2 ETH',
      hit: gvcFloorEth >= 2,
      pct: Math.min(100, (gvcFloorEth / 2) * 100),
    },
    {
      label: 'GVC Volume (All-Time)',
      current: gvcVolumeEth,
      target: 20_000,
      fmtCurrent: fmtEth(gvcVolumeEth),
      fmtTarget: '20K ETH',
      hit: gvcVolumeEth >= 20_000,
      pct: Math.min(100, (gvcVolumeEth / 20_000) * 100),
    },
    {
      label: 'GVC Unique Holders',
      current: gvcHolders,
      target: 2_500,
      fmtCurrent: gvcHolders.toLocaleString(),
      fmtTarget: '2,500',
      hit: gvcHolders >= 2_500,
      pct: Math.min(100, (gvcHolders / 2_500) * 100),
    },
  ];

  const hits = metrics.filter((m) => m.hit).length;
  const unlocked = hits >= 2;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full max-w-5xl mx-auto mt-8"
    >
      <div className={`relative overflow-hidden rounded-3xl border p-6 md:p-10 ${unlocked ? 'border-gvc-gold/60 bg-gvc-gold/5 shadow-[0_0_60px_rgba(255,224,72,0.25)]' : 'border-white/10 bg-black/40'} backdrop-blur-md`}>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <Image src="/icon-punk.png" alt="CryptoPunk" fill className="object-contain" sizes="80px" />
            </div>
            <div>
              <p className="text-gvc-gold/90 font-mundial font-bold tracking-[0.2em] text-xs uppercase mb-1">
                The Giga Eruption
              </p>
              <h2 className="text-3xl md:text-5xl font-cooper text-white uppercase leading-tight">
                CryptoPunk #2457
              </h2>
              <p className="font-mundial text-white/60 text-sm mt-2 max-w-xl">
                Raffled when <span className="text-gvc-gold font-bold">2 of 4</span> ecosystem milestones are hit.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 font-mundial text-xs uppercase tracking-wider">Milestones Hit</p>
            <p className={`text-5xl font-cooper leading-none mt-1 ${unlocked ? 'text-gvc-gold' : 'text-white'}`}>
              {hits} <span className="text-white/30 text-2xl">/ 4</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`relative rounded-2xl border p-4 ${m.hit ? 'border-gvc-green/60 bg-gvc-green/5' : 'border-white/10 bg-black/30'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="font-mundial text-white/70 text-xs uppercase tracking-wider">
                  {m.label}
                </p>
                {m.hit && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gvc-green flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <p className={`text-2xl font-cooper ${m.hit ? 'text-gvc-green' : 'text-white'}`}>
                  {isLoading ? '...' : m.fmtCurrent}
                </p>
                <p className="font-mundial text-white/40 text-xs">
                  / {m.fmtTarget}
                </p>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                  className={`absolute inset-y-0 left-0 ${m.hit ? 'bg-gvc-green' : 'bg-gvc-gold'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
