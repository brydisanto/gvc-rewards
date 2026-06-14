'use client';

import { useEffect, useState, useCallback } from 'react';

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const STORAGE_KEY = 'eruption_wallet_address';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [ens, setEns] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    setHasProvider(typeof window !== 'undefined' && !!window.ethereum);
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) setAddress(stored);
  }, []);

  useEffect(() => {
    if (!address) {
      setEns(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/ens?address=${address}`);
        if (!res.ok) return;
        const data = await res.json();
        setEns(data.ens ?? null);
      } catch {
        // ignore
      }
    })();
  }, [address]);

  useEffect(() => {
    const eth = typeof window !== 'undefined' ? window.ethereum : undefined;
    if (!eth?.on) return;
    const handler = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (!accounts || accounts.length === 0) {
        setAddress(null);
        if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
      } else {
        setAddress(accounts[0]);
        if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, accounts[0]);
      }
    };
    eth.on('accountsChanged', handler);
    return () => eth.removeListener?.('accountsChanged', handler);
  }, []);

  const connect = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!window.ethereum) {
      // No wallet injected; use demo mode with the sample address
      const demoAddr = '0xf7Da4aF5e75d8Cf57BB9c1D2a3f4e8B6C9D0a35A';
      setAddress(demoAddr);
      localStorage.setItem(STORAGE_KEY, demoAddr);
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];
      if (accounts && accounts[0]) {
        setAddress(accounts[0]);
        localStorage.setItem(STORAGE_KEY, accounts[0]);
      }
    } catch (err) {
      console.error('Wallet connect failed:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { address, ens, isConnecting, hasProvider, connect, disconnect };
}

export function shortAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
