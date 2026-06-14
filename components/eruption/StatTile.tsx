'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type Accent = 'default' | 'gold' | 'orange' | 'green';

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  accent?: Accent;
  delay?: number;
}

const accentStyles: Record<Accent, { border: string; iconClass: string; valueClass: string; glow: string }> = {
  default: {
    border: 'border-white/5',
    iconClass: 'text-white/40',
    valueClass: 'text-white',
    glow: '',
  },
  gold: {
    border: 'border-gvc-gold/50',
    iconClass: 'text-gvc-gold',
    valueClass: 'text-gvc-gold',
    glow: 'shadow-[0_0_30px_rgba(255,224,72,0.15)]',
  },
  orange: {
    border: 'border-gvc-orange/50',
    iconClass: 'text-gvc-orange',
    valueClass: 'text-gvc-orange',
    glow: 'shadow-[0_0_30px_rgba(255,95,31,0.18)]',
  },
  green: {
    border: 'border-gvc-green/50',
    iconClass: 'text-gvc-green',
    valueClass: 'text-gvc-green',
    glow: 'shadow-[0_0_30px_rgba(46,255,46,0.15)]',
  },
};

export default function StatTile({ icon: Icon, label, value, subtitle, accent = 'default', delay = 0 }: Props) {
  const s = accentStyles[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative rounded-2xl border ${s.border} bg-gradient-to-b from-[#0c0c0c] to-[#050505] p-5 md:p-6 ${s.glow}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${s.iconClass}`} strokeWidth={2.5} />
        <p className="font-mundial font-bold tracking-[0.15em] text-[10px] md:text-xs uppercase text-white/50">
          {label}
        </p>
      </div>
      <p className={`font-cooper text-4xl md:text-5xl leading-none ${s.valueClass}`}>
        {value}
      </p>
      {subtitle && (
        <p className="font-mundial text-xs text-white/40 mt-3">{subtitle}</p>
      )}
    </motion.div>
  );
}
