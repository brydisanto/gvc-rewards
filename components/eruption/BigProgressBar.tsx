'use client';

import { motion } from 'framer-motion';

interface Props {
  percent: number;
  label: string;
  variant?: 'gold' | 'orange';
}

export default function BigProgressBar({ percent, label, variant = 'gold' }: Props) {
  const clamped = Math.max(0, Math.min(100, percent));

  const fill =
    variant === 'orange'
      ? 'bg-gradient-to-r from-gvc-orange via-[#FF8A3D] to-gvc-orange'
      : 'bg-gradient-to-r from-[#E5B92E] via-gvc-gold to-[#E5B92E]';

  const glow =
    variant === 'orange'
      ? 'shadow-[0_0_40px_rgba(255,95,31,0.45)]'
      : 'shadow-[0_0_40px_rgba(255,224,72,0.35)]';

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1a1607]"
      style={{ height: 72 }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className={`absolute inset-y-0 left-0 ${fill} ${glow}`}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="font-cooper text-lg md:text-2xl lg:text-3xl uppercase tracking-wider text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {label}
        </p>
      </div>
    </div>
  );
}
