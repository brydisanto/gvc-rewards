'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronsDown, Lock } from 'lucide-react';

import EruptionProgress from '@/components/eruption/EruptionProgress';
import GigaEruption from '@/components/eruption/GigaEruption';
import ConnectWallet from '@/components/eruption/ConnectWallet';
import VibestrThermometer from '@/components/eruption/VibestrThermometer';
import BadgeCollection from '@/components/eruption/BadgeCollection';
import ShakaScoreCard from '@/components/eruption/ShakaScoreCard';
import PunkScoreCard from '@/components/eruption/PunkScoreCard';
import RulesPanel from '@/components/eruption/RulesPanel';
import Leaderboard from '@/components/eruption/Leaderboard';

import { useWallet } from '@/lib/wallet';
import {
  computeShaka,
  computePunkScore,
  monthsSinceLoyaltyStart,
  loyaltyTierForMonths,
} from '@/lib/shakaScore';
import { buildMockLeaderboard, type LeaderboardEntry } from '@/data/leaderboardMock';

interface StrategyBalance {
  balanceEth: number;
  threshold: number;
  completedEruptions: number;
  progressEth: number;
  remainingEth: number;
  progressPct: number;
}

interface GvcStats {
  floorEth: number;
  totalVolumeEth: number;
  uniqueHolders: number;
}

interface WalletProfile {
  vibestrBalance: number;
  gvcCount: number;
  badgeIds: string[];
}

export default function EruptionPage() {
  const { address } = useWallet();

  const [strategy, setStrategy] = useState<StrategyBalance | null>(null);
  const [gvcStats, setGvcStats] = useState<GvcStats | null>(null);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [profile, setProfile] = useState<WalletProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, gRes, mRes] = await Promise.all([
          fetch('/api/strategy-balance').then((r) => r.json()),
          fetch('/api/gvc-stats').then((r) => r.json()),
          fetch('/api/vibestr-marketcap').then((r) => r.json()),
        ]);
        if (cancelled) return;
        setStrategy(sRes);
        setGvcStats(gRes);
        setMarketCap(Number(mRes?.marketCapUsd ?? 0));
      } catch (e) {
        console.error('eruption page fetch error:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!address) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    setIsLoadingProfile(true);
    (async () => {
      try {
        const res = await fetch(`/api/wallet-profile?address=${address}`);
        const data = await res.json();
        if (cancelled) return;
        setProfile({
          vibestrBalance: Number(data.vibestrBalance ?? 0),
          gvcCount: Number(data.gvcCount ?? 0),
          badgeIds: Array.isArray(data.badgeIds) ? data.badgeIds : [],
        });
      } catch (e) {
        console.error('profile fetch error:', e);
      } finally {
        if (!cancelled) setIsLoadingProfile(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address]);

  const shakaBreakdown = useMemo(() => {
    if (!profile) return null;
    return computeShaka({
      badgeIds: profile.badgeIds,
      gvcCount: profile.gvcCount,
      vibestrBalance: profile.vibestrBalance,
    });
  }, [profile]);

  const loyalty = useMemo(() => {
    const months = monthsSinceLoyaltyStart();
    const tier = loyaltyTierForMonths(months);
    return { months, ...tier };
  }, []);

  const punkScore = shakaBreakdown ? computePunkScore(shakaBreakdown.shakaScore, loyalty.multiplier) : 0;

  const fallbackLeaderboard = useMemo(() => buildMockLeaderboard(), []);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(fallbackLeaderboard);
  const [leaderboardSource, setLeaderboardSource] = useState<'live' | 'mock' | 'loading'>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/leaderboard?limit=25');
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.entries) && data.entries.length > 0) {
          setLeaderboard(data.entries as LeaderboardEntry[]);
          setLeaderboardSource('live');
        } else {
          setLeaderboardSource('mock');
        }
      } catch (e) {
        console.error('leaderboard fetch error:', e);
        if (!cancelled) setLeaderboardSource('mock');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 md:p-12 md:pt-12 bg-[url('/grid.svg')] bg-center relative">
      {/* Top bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-6 z-10 relative">
        <Link
          href="/"
          className="font-mundial text-xs uppercase tracking-[0.2em] text-white/50 hover:text-gvc-gold transition-colors"
        >
          ← Rewards Pool
        </Link>
        <ConnectWallet />
      </div>

      {/* Header */}
      <div className="z-10 max-w-5xl w-full text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-gvc-orange/90 font-mundial font-bold tracking-[0.2em] text-xs md:text-sm mb-4 uppercase"
        >
          The VibeStrategy Rewards Engine
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-cooper text-center text-gvc-gold glowing-text leading-none"
        >
          PROJECT ERUPTION
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="font-mundial text-white/70 mt-6 max-w-2xl mx-auto text-base md:text-lg"
        >
          Every <span className="text-gvc-gold font-bold">6.9 ETH</span> erupts the pool.
          Connect your wallet to see your Shaka Score, Punk Score, and where you stand.
        </motion.p>
      </div>

      {/* Public progress */}
      <EruptionProgress
        balanceEth={strategy?.balanceEth ?? 0}
        progressEth={strategy?.progressEth ?? 0}
        remainingEth={strategy?.remainingEth ?? 6.9}
        progressPct={strategy?.progressPct ?? 0}
        completedEruptions={strategy?.completedEruptions ?? 0}
        threshold={strategy?.threshold ?? 6.9}
        isLoading={!strategy}
      />

      <GigaEruption
        vibestrMarketCapUsd={marketCap}
        gvcFloorEth={gvcStats?.floorEth ?? 0}
        gvcVolumeEth={gvcStats?.totalVolumeEth ?? 0}
        gvcHolders={gvcStats?.uniqueHolders ?? 0}
        isLoading={!gvcStats}
      />

      <div className="my-12 flex flex-col items-center gap-1 text-white/30">
        <ChevronsDown className="w-6 h-6 animate-bounce" />
      </div>

      {/* Gated section */}
      {!address ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gvc-gold/5 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gvc-gold/10 border border-gvc-gold/30 flex items-center justify-center">
                <Lock className="w-7 h-7 text-gvc-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-cooper text-white uppercase">
                Connect To See Your Score
              </h2>
              <p className="font-mundial text-white/60 max-w-md">
                Your badges, your $VIBESTR tier, your Shaka Score, your Punk Score.
                One wallet. One number that decides your eruption odds.
              </p>
              <ConnectWallet />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          {isLoadingProfile && !profile ? (
            <p className="font-mundial text-white/50 text-center py-10">Loading your profile...</p>
          ) : profile && shakaBreakdown ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShakaScoreCard breakdown={shakaBreakdown} />
                <PunkScoreCard
                  shakaScore={shakaBreakdown.shakaScore}
                  loyaltyMonths={loyalty.months}
                  loyaltyName={loyalty.name}
                  loyaltyMultiplier={loyalty.multiplier}
                  punkScore={punkScore}
                />
              </div>

              <VibestrThermometer balance={profile.vibestrBalance} />

              <BadgeCollection badgeIds={profile.badgeIds} gvcCount={profile.gvcCount} />
            </>
          ) : (
            <p className="font-mundial text-white/50 text-center py-10">
              Could not load profile.
            </p>
          )}

          <RulesPanel />

          <Leaderboard entries={leaderboard} highlightWallet={address} source={leaderboardSource} />
        </div>
      )}

      {!address && (
        <>
          <div className="my-10 flex items-center gap-3 text-white/30 w-full max-w-6xl">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mundial text-xs uppercase tracking-[0.2em]">Previews</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
            <RulesPanel />
            <Leaderboard entries={leaderboard} highlightWallet={null} source={leaderboardSource} />
          </div>
        </>
      )}

      <div className="h-20" />
    </main>
  );
}
