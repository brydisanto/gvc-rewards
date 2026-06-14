'use client';

import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useWallet, shortAddress } from '@/lib/wallet';

export default function ConnectWallet() {
  const { address, ens, connect, disconnect, isConnecting, hasProvider } = useWallet();

  if (address) {
    return (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 border border-gvc-gold/40 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-gvc-green animate-pulse" />
        <span className="font-mundial font-bold text-sm text-gvc-gold">
          {ens ?? shortAddress(address)}
        </span>
        <button
          onClick={disconnect}
          className="text-xs font-mundial text-white/50 hover:text-white transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={connect}
      disabled={isConnecting}
      className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gvc-gold text-black font-cooper font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(255,224,72,0.4)] hover:shadow-[0_0_40px_rgba(255,224,72,0.7)] transition-shadow"
    >
      <Wallet className="w-5 h-5" />
      <span>{isConnecting ? 'Connecting...' : hasProvider ? 'Connect Wallet' : 'Try Demo Wallet'}</span>
    </motion.button>
  );
}
