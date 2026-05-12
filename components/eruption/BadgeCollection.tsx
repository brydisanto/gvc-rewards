'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BADGE_BY_ID, TIER_COLOR, TIER_POINTS, type BadgeTier } from '@/data/badgeTiers';
import { getBadgeImage } from '@/data/badgeImages';

interface Props {
  badgeIds: string[];
  gvcCount: number;
}

const TIER_ORDER: BadgeTier[] = ['Cosmic', 'Legendary', 'Rare', 'Common'];

export default function BadgeCollection({ badgeIds, gvcCount }: Props) {
  const grouped: Record<BadgeTier, string[]> = {
    Cosmic: [],
    Legendary: [],
    Rare: [],
    Common: [],
    Citizen: [],
  };
  for (const id of badgeIds) {
    const def = BADGE_BY_ID[id];
    if (!def) continue;
    grouped[def.tier].push(id);
  }

  const total = badgeIds.filter((id) => BADGE_BY_ID[id]).length;

  return (
    <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-cooper text-white uppercase">Your Badges</h3>
        <p className="font-mundial text-sm text-white/60">
          <span className="text-gvc-gold font-bold">{total}</span> earned · <span className="text-gvc-gold font-bold">{gvcCount}</span> GVC{gvcCount === 1 ? '' : 's'} held
        </p>
      </div>

      {total === 0 && gvcCount === 0 ? (
        <p className="font-mundial text-white/50 text-center py-8">
          No GVCs detected. Pick one up to start earning Citizen points.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {TIER_ORDER.map((tier) => {
            const ids = grouped[tier];
            if (ids.length === 0) return null;
            return (
              <div key={tier}>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="font-mundial font-bold uppercase tracking-wider text-xs" style={{ color: TIER_COLOR[tier] }}>
                    {tier} · {TIER_POINTS[tier]} pts each
                  </p>
                  <p className="font-mundial text-white/40 text-xs">{ids.length} held</p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {ids.map((id, i) => {
                    const def = BADGE_BY_ID[id];
                    const img = getBadgeImage(id);
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="group relative aspect-square"
                        title={def.name}
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt={def.name}
                            fill
                            className="object-contain drop-shadow-[0_0_8px_rgba(255,224,72,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,224,72,0.5)] transition"
                            sizes="80px"
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-full border-2 flex items-center justify-center text-[10px] font-mundial font-bold text-center px-1 leading-tight"
                            style={{ borderColor: TIER_COLOR[tier], color: TIER_COLOR[tier], background: 'rgba(255,255,255,0.02)' }}
                          >
                            {def.name}
                          </div>
                        )}
                        <span className="absolute inset-x-0 -bottom-5 text-center text-[9px] font-mundial text-white/40 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                          {def.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {gvcCount > 0 && (
            <div className="border-t border-white/5 pt-5">
              <p className="font-mundial font-bold uppercase tracking-wider text-xs mb-2" style={{ color: TIER_COLOR.Citizen }}>
                Citizen · 50 pts per GVC
              </p>
              <p className="font-mundial text-white/70 text-sm">
                <span className="text-gvc-gold font-bold">{gvcCount}</span> GVC{gvcCount === 1 ? '' : 's'} held · <span className="text-gvc-gold font-bold">{gvcCount * 50}</span> Citizen points
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
