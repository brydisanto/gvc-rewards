'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Crown } from 'lucide-react';

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

interface RewardsNFTGridProps {
    nfts: NFT[];
    isLoading: boolean;
}

export default function RewardsNFTGrid({ nfts, isLoading }: RewardsNFTGridProps) {
    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-gvc-dark/60 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (nfts.length === 0) {
        return (
            <div className="w-full max-w-6xl mx-auto mt-12 text-center">
                <p className="text-white/40 font-mundial">No NFTs found in the rewards pool</p>
            </div>
        );
    }

    // Sort NFTs so signature (CryptoPunk) is first
    const sortedNfts = [...nfts].sort((a, b) => {
        if (a.isSignature && !b.isSignature) return -1;
        if (!a.isSignature && b.isSignature) return 1;
        return 0;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full max-w-6xl mx-auto mt-6"
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <style>{`
                    @keyframes pulse-gold-local {
                        0% { box-shadow: 0 0 0 0 rgba(255, 224, 72, 0.7), 0 0 30px rgba(255, 224, 72, 0.3); }
                        50% { box-shadow: 0 0 0 12px rgba(255, 224, 72, 0), 0 0 60px rgba(255, 224, 72, 0.5); }
                        100% { box-shadow: 0 0 0 0 rgba(255, 224, 72, 0), 0 0 30px rgba(255, 224, 72, 0.3); }
                    }
                    @keyframes float-particle {
                        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
                        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
                    }
                    @keyframes spotlight-sweep {
                        0% { transform: translateX(-100%) rotate(25deg); }
                        100% { transform: translateX(200%) rotate(25deg); }
                    }
                `}</style>
                {sortedNfts.map((nft, index) => (
                    <motion.a
                        key={`${nft.collection}-${nft.id}`}
                        href={nft.openseaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20, scale: nft.isSignature ? 0.8 : 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: nft.isSignature ? 0.3 : 0.1 * Math.min(index, 10),
                            duration: nft.isSignature ? 0.6 : 0.3,
                            type: nft.isSignature ? 'spring' : 'tween',
                            stiffness: 80
                        }}
                        className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${nft.isSignature
                            ? 'col-span-2 row-span-2 border-2 border-[#FFE048] z-30'
                            : 'bg-gvc-dark/80 border border-gvc-gray hover:border-gvc-gold'
                            }`}
                        style={nft.isSignature ? { animation: 'pulse-gold-local 2.5s infinite ease-in-out' } : undefined}
                    >
                        {/* Spotlight sweep for signature card */}
                        {nft.isSignature && (
                            <div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,224,72,0.15), transparent)',
                                    animation: 'spotlight-sweep 4s ease-in-out infinite',
                                }}
                            />
                        )}
                        {/* NFT Image */}
                        <div className={`relative aspect-square ${nft.isSignature ? 'bg-gradient-to-br from-gvc-gold/30 via-orange-900/20 to-pink-900/20' : 'bg-gradient-to-br from-gvc-gold/20 to-orange-900/20'}`}>
                            <img
                                src={nft.image}
                                alt={nft.name}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                    const placeholder = document.createElement('span');
                                    placeholder.className = 'text-gvc-gold/50 font-mundial text-2xl';
                                    placeholder.textContent = 'NFT';
                                    target.parentElement?.appendChild(placeholder);
                                }}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ExternalLink className="w-8 h-8 text-gvc-gold" aria-hidden="true" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className={`${nft.isSignature ? 'p-6 bg-[#121212]' : 'p-3'}`}>

                            <p className={`text-white/90 font-mundial font-medium truncate ${nft.isSignature ? 'text-3xl' : 'text-xs sm:text-sm'}`}>
                                {nft.name}
                            </p>
                            <div className={`flex items-baseline gap-2 flex-wrap ${nft.isSignature ? 'mt-3' : 'mt-1'}`}>
                                <p className={`font-mundial font-bold ${nft.isSignature ? 'text-4xl bg-gradient-to-r from-gvc-gold to-pink-accent bg-clip-text text-transparent' : 'text-base sm:text-lg text-gvc-gold'}`}>
                                    {nft.floorPrice !== null ? `~${nft.floorPrice.toFixed(2)} ETH` : '—'}
                                </p>
                                {nft.floorPriceUsd !== null && (
                                    <p className={`text-white/40 font-mundial ${nft.isSignature ? 'text-base' : 'text-xs'}`}>
                                        (${Math.round(nft.floorPriceUsd).toLocaleString()})
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}
