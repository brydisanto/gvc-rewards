'use client';

import BadgeDivider from '@/components/BadgeDivider';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';
import UnifiedStatsPanel from '@/components/UnifiedStatsPanel';
import RewardsNFTGrid from '@/components/RewardsNFTGrid';
import TotalValueDisplay, { ChartModal } from '@/components/TotalValueDisplay';
import ValueHistoryChart from '@/components/ValueHistoryChart';
import HowItWorks from '@/components/HowItWorks';
import ExampleFlow from '@/components/ExampleFlow';
import VibeWheelCalculator from '@/components/VibeWheelCalculator';

interface TokenStats {
  vibestr: number;
  pnkstr: number;
  eth: number;
  vibestrUsd: number;
  pnkstrUsd: number;
  ethUsd: number;
}

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  floorPrice: number | null;
  floorPriceUsd: number | null;
  openseaUrl: string;
  isSignature?: boolean;
}

interface NFTCounts {
  cryptoPunksCount: number;
  gvcCount: number;
  cryptoPunksUsd: number;
  gvcUsd: number;
}

interface Prices {
  ethUsd: number;
  vibestrUsd: number;
  pnkstrUsd: number;
}

interface HistoryDataPoint {
  date: string;
  value: number;
}

export default function Home() {
  const [viewMode, setViewMode] = useState<'POOL' | 'HOW_IT_WORKS' | 'EXAMPLE_FLOW' | 'VIBEWHEEL'>('POOL');
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [nftCounts, setNftCounts] = useState<NFTCounts | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [ethInflow, setEthInflow] = useState(0);
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);
  const [totalUsd, setTotalUsd] = useState(0);
  const [history, setHistory] = useState<HistoryDataPoint[]>([]);
  const [todayChange, setTodayChange] = useState(0);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const hasSavedValue = useRef(false);
  const prevTokenStats = useRef<TokenStats | null>(null);
  const prevNftCount = useRef<number>(0);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  // Fetch token balances
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch('/api/wallet');
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch wallet:', error);
        return { vibestr: 0, pnkstr: 0, eth: 0 };
      }
    };

    const fetchPrices = async () => {
      try {
        const res = await fetch('/api/prices');
        const data = await res.json();
        setPrices(data);
        return data;
      } catch (error) {
        console.error('Failed to fetch prices:', error);
        return { ethUsd: 0, vibestrUsd: 0, pnkstrUsd: 0 };
      }
    };

    const fetchInflow = async () => {
      try {
        const res = await fetch('/api/inflow');
        const data = await res.json();
        setEthInflow(data.inflow24h || 0);
      } catch (error) {
        console.error('Failed to fetch inflow:', error);
      }
    };

    const fetchAll = async () => {
      const [wallet, priceData] = await Promise.all([fetchWallet(), fetchPrices()]);
      await fetchInflow();

      setTokenStats({
        vibestr: wallet.vibestr,
        pnkstr: wallet.pnkstr,
        eth: wallet.eth,
        vibestrUsd: wallet.vibestr * priceData.vibestrUsd,
        pnkstrUsd: wallet.pnkstr * priceData.pnkstrUsd,
        ethUsd: wallet.eth * priceData.ethUsd,
      });
      setIsLoadingTokens(false);
    };

    fetchAll();

    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch NFTs
  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const res = await fetch('/api/nfts');
        const data = await res.json();

        // Store counts with USD values
        setNftCounts({
          cryptoPunksCount: data.cryptoPunksCount || 0,
          gvcCount: data.gvcCount || 0,
          cryptoPunksUsd: (data.cryptoPunksFloorEth || 0) * (prices?.ethUsd || 0),
          gvcUsd: (data.gvcFloorEth || 0) * (prices?.ethUsd || 0),
        });

        // Add USD floor prices if we have ETH price
        const nftsWithUsd = (data.nfts || []).map((nft: NFT) => ({
          ...nft,
          floorPriceUsd: nft.floorPrice && prices?.ethUsd
            ? nft.floorPrice * prices.ethUsd
            : null,
        }));

        setNfts(nftsWithUsd);
      } catch (error) {
        console.error('Failed to fetch NFTs:', error);
      } finally {
        setIsLoadingNfts(false);
      }
    };

    fetchNfts();

    const interval = setInterval(fetchNfts, 300000);
    return () => clearInterval(interval);
  }, [prices]);

  // Detect token quantity increases
  useEffect(() => {
    if (!tokenStats || !prices) return;

    if (prevTokenStats.current) {
      let hasIncreased = false;

      // Check VIBESTR
      if (tokenStats.vibestr > prevTokenStats.current.vibestr) {
        const diff = tokenStats.vibestr - prevTokenStats.current.vibestr;
        if (diff > 0) {
          toast.success(
            <div>
              <span className="font-cooper font-bold text-lg">NEW REWARDS ADDED!</span><br />
              {formatNumber(diff)} $VIBESTR added to the Rewards Pool
            </div>,
            { duration: 5000 }
          );
          hasIncreased = true;
        }
      }

      // Check PNKSTR
      if (tokenStats.pnkstr > prevTokenStats.current.pnkstr) {
        const diff = tokenStats.pnkstr - prevTokenStats.current.pnkstr;
        if (diff > 0) {
          toast.success(
            <div>
              <span className="font-cooper font-bold text-lg">NEW REWARDS ADDED!</span><br />
              {formatNumber(diff)} $PNKSTR added to the Rewards Pool
            </div>,
            { duration: 5000 }
          );
          hasIncreased = true;
        }
      }

      // Check ETH
      if (tokenStats.eth > prevTokenStats.current.eth) {
        const diff = tokenStats.eth - prevTokenStats.current.eth;
        if (diff > 0.0001) { // Ignore tiny dust
          toast.success(
            <div>
              <span className="font-cooper font-bold text-lg">NEW REWARDS ADDED!</span><br />
              {diff.toFixed(3)} ETH added to the Rewards Pool
            </div>,
            { duration: 5000 }
          );
          hasIncreased = true;
          // Update inflow with the new ETH amount
          setEthInflow(prev => prev + diff);
        }
      }

      if (hasIncreased) {
        setIsWiggling(true);
        setTimeout(() => setIsWiggling(false), 1000);
      }
    }

    prevTokenStats.current = tokenStats;
  }, [tokenStats, prices]);

  // Calculate total USD value
  useEffect(() => {
    if (!tokenStats || !prices) return;

    const tokensTotal = tokenStats.vibestrUsd + tokenStats.pnkstrUsd + tokenStats.ethUsd;

    const nftsTotal = nfts.reduce((sum, nft) => {
      if (nft.floorPrice && prices.ethUsd) {
        return sum + (nft.floorPrice * prices.ethUsd);
      }
      return sum;
    }, 0);

    setTotalUsd(tokensTotal + nftsTotal);
  }, [tokenStats, nfts, prices]);

  // Detect new NFTs
  useEffect(() => {
    if (prevNftCount.current > 0 && nfts.length > prevNftCount.current) {
      const newCount = nfts.length - prevNftCount.current;
      toast.success(
        <div>
          <span className="font-cooper font-bold text-lg">NEW REWARDS ADDED!</span><br />
          {newCount} NFT{newCount > 1 ? 's' : ''} added to the Rewards Pool
        </div>,
        { duration: 5000 }
      );
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 1000);
    }
    prevNftCount.current = nfts.length;
  }, [nfts.length]);

  // Fetch and save history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setHistory(data.history || []);
        setTodayChange(data.todayChange || 0);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  // Save current value to history once computed and loading is finished
  useEffect(() => {
    if (!isLoadingTokens && !isLoadingNfts && totalUsd > 0 && !hasSavedValue.current) {
      hasSavedValue.current = true;

      fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: totalUsd }),
      }).then(() => {
        // Refresh history to get updated todayChange
        fetch('/api/history')
          .then(res => res.json())
          .then(data => {
            setHistory(data.history || []);
            setTodayChange(data.todayChange || 0);
          });
      }).catch(console.error);
    }
  }, [totalUsd, isLoadingTokens, isLoadingNfts]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 md:p-12 md:pt-16 bg-[url('/grid.svg')] bg-center relative">
      {/* Header */}
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-gvc-gold/80 font-mundial font-bold tracking-[0.2em] text-xs md:text-sm mb-4 uppercase"
          >
            VIBESTRATEGY PROTOCOL TRACKER
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 1,
              delay: 0.2
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-cooper text-center text-gvc-gold glowing-text leading-none"
          >
            THE REWARDS POOL
          </motion.h1>

        </div>
      </div>

      {/* Explanatory Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="z-10 max-w-3xl text-center text-white/80 font-mundial text-base md:text-lg mt-8 leading-relaxed flex flex-col gap-6"
      >
        <p className="font-bold text-white">
          Collect Badges. Participate in the Eco. Access Rewards.
        </p>

        <p>
          As <span className="text-gvc-gold font-bold">$VIBESTR</span> trades, the Rewards Pool updates. Automatically.
          It currently holds <span className="text-gvc-gold font-bold">$VIBESTR</span>,{' '}
          <span className="text-gvc-gold font-bold">$PNKSTR</span>,{' '}
          <span className="text-gvc-gold font-bold">ETH</span>, and <span className="text-gvc-gold font-bold">GVCs</span>...
          and for one very lucky collector, <span className="text-gvc-gold font-bold">CryptoPunk #2457</span> awaits.
        </p>

        <p>
          More details about the program will be revealed soon (we call it <span className="text-gvc-orange font-bold">Project Eruption</span>).
        </p>
      </motion.div>

      {/* Unified Stats Panel - All 5 boxes on one line */}
      <UnifiedStatsPanel
        tokenStats={tokenStats}
        nftCounts={nftCounts}
        isLoadingTokens={isLoadingTokens}
        isLoadingNfts={isLoadingNfts}
      />

      {/* Total Value Display - Click to open chart */}
      <TotalValueDisplay
        totalUsd={totalUsd}
        ethInflow={ethInflow}
        isLoading={isLoadingTokens || isLoadingNfts}
        onChartClick={() => setIsChartOpen(true)}
        isWiggling={isWiggling}
      />

      {/* Chart Modal */}
      <ChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)}>
        <ValueHistoryChart data={history} isLoading={isLoadingHistory} />
      </ChartModal>



      <BadgeDivider />

      {/* Toggle View */}
      <div className="flex justify-center gap-4 md:gap-8 mb-8 relative z-20 overflow-x-auto w-full px-2 md:px-0 pb-2 scrollbar-hide">
        <button
          onClick={() => setViewMode('POOL')}
          className={`font-mundial font-bold tracking-wider md:tracking-widest text-xs md:text-sm uppercase transition-colors px-2 md:px-4 py-2 border-b-2 whitespace-nowrap flex-shrink-0 ${viewMode === 'POOL' ? 'text-gvc-gold border-gvc-gold' : 'text-white/40 border-transparent hover:text-white/70'
            }`}
        >
          Rewards Pool
        </button>
        <button
          onClick={() => setViewMode('HOW_IT_WORKS')}
          className={`font-mundial font-bold tracking-wider md:tracking-widest text-xs md:text-sm uppercase transition-colors px-2 md:px-4 py-2 border-b-2 whitespace-nowrap flex-shrink-0 ${viewMode === 'HOW_IT_WORKS' ? 'text-gvc-gold border-gvc-gold' : 'text-white/40 border-transparent hover:text-white/70'
            }`}
        >
          How It Works
        </button>
        <button
          onClick={() => setViewMode('EXAMPLE_FLOW')}
          className={`font-mundial font-bold tracking-wider md:tracking-widest text-xs md:text-sm uppercase transition-colors px-2 md:px-4 py-2 border-b-2 whitespace-nowrap flex-shrink-0 ${viewMode === 'EXAMPLE_FLOW' ? 'text-gvc-gold border-gvc-gold' : 'text-white/40 border-transparent hover:text-white/70'
            }`}
        >
          Simulator
        </button>
        <button
          onClick={() => setViewMode('VIBEWHEEL')}
          className={`font-mundial font-bold tracking-wider md:tracking-widest text-xs md:text-sm uppercase transition-colors px-2 md:px-4 py-2 border-b-2 whitespace-nowrap flex-shrink-0 ${viewMode === 'VIBEWHEEL' ? 'text-gvc-gold border-gvc-gold' : 'text-white/40 border-transparent hover:text-white/70'
            }`}
        >
          Rev the Vibewheel
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'POOL' ? (
          <motion.div
            key="pool"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <RewardsNFTGrid nfts={nfts} isLoading={isLoadingNfts} />
          </motion.div>
        ) : viewMode === 'HOW_IT_WORKS' ? (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <HowItWorks />
          </motion.div>
        ) : viewMode === 'EXAMPLE_FLOW' ? (
          <motion.div
            key="example-flow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ExampleFlow />
          </motion.div>
        ) : (
          <motion.div
            key="vibewheel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <VibeWheelCalculator />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer spacing */}
      <div className="h-16" />
    </main >
  );
}
