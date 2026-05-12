'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LOYALTY_TIERS, LOYALTY_START } from '@/lib/shakaScore';
import { TIER_COLOR, TIER_POINTS, HIGHEST_TIER_MULTIPLIER, VIBESTR_TIERS } from '@/data/badgeTiers';

export default function RulesPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-5 md:p-6 hover:bg-white/5 transition-colors"
      >
        <div className="text-left">
          <p className="font-mundial font-bold tracking-[0.2em] text-xs uppercase text-gvc-gold/90 mb-1">
            How Scoring Works
          </p>
          <h3 className="text-xl md:text-2xl font-cooper text-white uppercase">The Rules</h3>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-6 h-6 text-gvc-gold" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 space-y-6 font-mundial text-sm text-white/80">
              <div>
                <h4 className="text-gvc-gold font-bold uppercase tracking-wider text-xs mb-3">Badge Points</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['Cosmic','Legendary','Rare','Common','Citizen'] as const).map((tier) => (
                    <div key={tier} className="rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="font-bold uppercase text-xs" style={{ color: TIER_COLOR[tier] }}>{tier}</p>
                      <p className="font-cooper text-2xl text-white mt-1">
                        {TIER_POINTS[tier]}
                        {tier === 'Citizen' && <span className="text-xs text-white/40"> / GVC</span>}
                      </p>
                      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
                        ×{HIGHEST_TIER_MULTIPLIER[tier].toFixed(2)} highest-tier
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-gvc-gold font-bold uppercase tracking-wider text-xs mb-3">$VIBESTR Tier Multiplier</h4>
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left px-3 py-2 text-white/50 font-mundial font-bold uppercase tracking-wider">Tier</th>
                        <th className="text-right px-3 py-2 text-white/50 font-mundial font-bold uppercase tracking-wider">Threshold</th>
                        <th className="text-right px-3 py-2 text-white/50 font-mundial font-bold uppercase tracking-wider">Multiplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VIBESTR_TIERS.map((t) => (
                        <tr key={t.name} className="border-t border-white/5">
                          <td className="px-3 py-2 text-white font-bold">{t.name}</td>
                          <td className="px-3 py-2 text-right text-white/70">≥ {t.threshold.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right text-gvc-gold font-bold">{t.multiplier.toFixed(2)}×</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-gvc-gold font-bold uppercase tracking-wider text-xs mb-3">Shaka Score Formula</h4>
                <div className="rounded-lg bg-black/40 border border-gvc-gold/30 p-4 font-mono text-xs text-white/80">
                  Shaka = (Citizen Points + Badge Points) × Highest-Tier Multiplier × $VIBESTR Tier Multiplier
                </div>
                <p className="text-white/50 text-xs mt-2">
                  Only your single highest-tier badge counts toward the highest-tier multiplier. Only your highest applicable $VIBESTR tier counts.
                </p>
              </div>

              <div>
                <h4 className="text-gvc-orange font-bold uppercase tracking-wider text-xs mb-3">Punk Score &amp; Loyalty Multiplier</h4>
                <p className="text-white/70 text-xs mb-3">
                  Punk Score = Shaka Score × Loyalty Multiplier. Continuous holding starts {LOYALTY_START.toISOString().slice(0, 10)}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LOYALTY_TIERS.map((t) => (
                    <div key={t.name} className="rounded-lg border border-white/10 bg-black/30 p-3 text-center">
                      <p className="font-bold uppercase text-xs text-white">{t.name}</p>
                      <p className="font-cooper text-2xl text-gvc-orange mt-1">{t.multiplier.toFixed(2)}×</p>
                      <p className="text-[10px] text-white/40 mt-1">
                        {t.maxMonths === null ? `${t.minMonths}+ mo` : `${t.minMonths}–${t.maxMonths} mo`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-gvc-gold font-bold uppercase tracking-wider text-xs mb-3">Eruptions</h4>
                <ul className="space-y-2 text-xs text-white/70 list-disc pl-5">
                  <li>Every <span className="text-gvc-gold font-bold">6.9 ETH</span> that lands in vibestrategy.eth triggers a Rewards Eruption.</li>
                  <li>The Giga Eruption raffles CryptoPunk #2457 when <span className="text-gvc-gold font-bold">2 of 4</span> ecosystem milestones are hit.</li>
                  <li>Entries are weighted by Punk Score.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
