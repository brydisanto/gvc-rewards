'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { LeaderboardEntry } from '@/data/leaderboardMock';
import { shortAddress } from '@/lib/wallet';

interface Props {
  entries: LeaderboardEntry[];
  highlightWallet?: string | null;
  source?: 'live' | 'mock' | 'loading';
}

function fmtVibestr(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function Leaderboard({ entries, highlightWallet, source = 'mock' }: Props) {
  const highlight = highlightWallet?.toLowerCase();
  const sourceLabel =
    source === 'live' ? 'Live top GVC holders' :
    source === 'loading' ? 'Loading live data...' :
    'Sample data';
  const sourceClass = source === 'live' ? 'text-gvc-green' : 'text-white/40';

  const head = 'px-4 py-3 font-mundial font-bold uppercase tracking-[0.15em] text-[10px] text-center text-white/50';
  const cell = 'px-4 py-4 text-center align-middle';

  return (
    <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-white/5 flex items-center gap-3">
        <Trophy className="w-6 h-6 text-gvc-gold" />
        <div>
          <p className="font-mundial font-bold tracking-[0.2em] text-xs uppercase text-gvc-gold/90">
            Top Punks
          </p>
          <h3 className="text-2xl md:text-3xl font-cooper text-white uppercase leading-tight">Leaderboard</h3>
        </div>
        <span className={`ml-auto text-xs font-mundial ${sourceClass}`}>
          {source === 'live' && <span className="inline-block w-2 h-2 rounded-full bg-gvc-green mr-2 animate-pulse" />}
          {sourceLabel}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className={head}>Rank</th>
              <th className={`${head} text-left`}>Wallet</th>
              <th className={head}>GVCs</th>
              <th className={head}>$VIBESTR</th>
              <th className={head}>VIBESTR Tier</th>
              <th className={`${head} bg-gvc-gold/15 text-gvc-gold`}>Shaka Score</th>
              <th className={head}>Loyalty</th>
              <th className={`${head} bg-gvc-orange/15 text-gvc-orange`}>Punk Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((row, i) => {
              const isMe = highlight && row.wallet.toLowerCase() === highlight;
              const top3 = row.rank <= 3;
              return (
                <motion.tr
                  key={row.wallet}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`border-t border-white/5 ${isMe ? 'bg-gvc-gold/10' : 'hover:bg-white/[0.02]'}`}
                >
                  <td className={cell}>
                    <span className={`font-cooper text-2xl leading-none ${top3 ? 'text-gvc-gold' : 'text-white/40'}`}>
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-left">
                    <span className={`font-mundial font-bold text-base ${isMe ? 'text-gvc-gold' : 'text-white'}`}>
                      {row.ens ?? shortAddress(row.wallet)}
                    </span>
                  </td>
                  <td className={`${cell} font-mundial text-white/80`}>{row.gvcCount}</td>
                  <td className={`${cell} font-mundial text-white/80`}>{fmtVibestr(row.vibestrBalance)}</td>
                  <td className={`${cell} font-mundial text-white/80`}>{row.vibestrTier}</td>
                  <td className={`${cell} bg-gvc-gold/10 font-mundial font-bold text-gvc-gold text-base`}>
                    {row.shakaScore.toLocaleString()}
                  </td>
                  <td className={`${cell} font-mundial`}>
                    <span className="text-white">{row.loyaltyName}</span>
                    <span className="text-white/40 ml-1.5 text-xs">×{row.loyaltyMultiplier.toFixed(2)}</span>
                  </td>
                  <td className={`${cell} bg-gvc-orange/10 font-mundial font-bold text-gvc-orange text-base`}>
                    {row.punkScore.toLocaleString()}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
