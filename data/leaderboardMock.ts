import { computeShaka, computePunkScore, loyaltyTierForMonths } from '@/lib/shakaScore';

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  ens: string | null;
  gvcCount: number;
  vibestrBalance: number;
  vibestrTier: string;
  shakaScore: number;
  loyaltyMonths: number;
  loyaltyName: string;
  loyaltyMultiplier: number;
  punkScore: number;
}

interface MockSeed {
  wallet: string;
  ens: string | null;
  gvcCount: number;
  vibestrBalance: number;
  badgeIds: string[];
  loyaltyMonths: number;
}

const SEEDS: MockSeed[] = [
  { wallet: '0xf7Da4aF5e75d8Cf57BB9c1D2a3f4e8B6C9D0a35A', ens: 'brydisanto.eth',     gvcCount: 12, vibestrBalance: 11_500_000, badgeIds: ['cosmic_guardian', 'one_of_one', 'gold_member', 'king', 'pepe', 'any_gvc', 'pothead', 'super_rare'], loyaltyMonths: 12 },
  { wallet: '0x1234d4f0a8b9c2e1d6f3b7a5c8e9d2f4b6a7c1B2',  ens: 'craig.eth',           gvcCount: 47, vibestrBalance: 8_400_000,  badgeIds: ['one_of_one', 'the_completionist', 'gold_member', 'king', 'pepe', 'super_rare', 'trait_maxi', 'rainbow_citizen', 'twenty_badges', 'thirty_badges'], loyaltyMonths: 14 },
  { wallet: '0xa2b8c4d1e6f3a9b7c5d2e8f1a4b6c9d3e5f7a2c1',  ens: 'vibegod.eth',         gvcCount: 33, vibestrBalance: 6_900_000,  badgeIds: ['cosmic_guardian', 'gold_member', 'astro_balls', 'king', 'pepe', 'flow_state', 'super_rare'], loyaltyMonths: 11 },
  { wallet: '0xb5e3d7a1c8f4b2e6a9c5d8f3b7a1c4e6d9f2a5b3',  ens: 'shakamaster.eth',     gvcCount: 22, vibestrBalance: 5_200_000,  badgeIds: ['gold_member', 'king', 'pepe', 'super_rare', 'fifteen_badges', 'twenty_badges'], loyaltyMonths: 10 },
  { wallet: '0xc8f1a4d7b2e5c9a3d6f8b1e4a7c2d5f8b3e6a9c2',  ens: 'wavechaser.eth',      gvcCount: 18, vibestrBalance: 4_500_000,  badgeIds: ['gold_member', 'astro_balls', 'pepe', 'super_rare', 'fifteen_badges'], loyaltyMonths: 9 },
  { wallet: '0xd1e7b4a8c2f5d9b3a6c8f1e4d7b2a5c8f3e6d9b2',  ens: null,                  gvcCount: 14, vibestrBalance: 3_800_000,  badgeIds: ['gold_member', 'pepe', 'super_rare', 'fifteen_badges'], loyaltyMonths: 8 },
  { wallet: '0xe4a8d2b5c9f3a7d1b4e8c2a5d9f3b7e1a4c8d2f5',  ens: 'rainbowman.eth',      gvcCount: 28, vibestrBalance: 3_100_000,  badgeIds: ['gold_member', 'rainbow_citizen', 'super_rare', 'flow_state'], loyaltyMonths: 11 },
  { wallet: '0xf3b8c5d1a4e7b9c2d5f8a1b4e7c2d5a8f1b4e7c2',  ens: null,                  gvcCount: 9,  vibestrBalance: 2_750_000,  badgeIds: ['gold_member', 'pepe', 'fifteen_badges'], loyaltyMonths: 7 },
  { wallet: '0x9c2e5b8a1d4f7c3b6e9a2d5f8b1c4e7a3d6f9b2c',  ens: 'punkdaddy.eth',       gvcCount: 7,  vibestrBalance: 2_500_000,  badgeIds: ['super_rare', 'gold_member', 'doge'], loyaltyMonths: 12 },
  { wallet: '0x7d5a3c8e1b4f6a9d2c5b8e1a4f7c3b6e9d2a5f8c',  ens: 'goodvibes.eth',       gvcCount: 6,  vibestrBalance: 1_900_000,  badgeIds: ['super_rare', 'pepe', 'doge'], loyaltyMonths: 8 },
  { wallet: '0x6b4a2c8e1d5f7a9b3c6e2d5f8a1b4c7e3d6f9a2b',  ens: null,                  gvcCount: 5,  vibestrBalance: 1_550_000,  badgeIds: ['super_rare', 'pepe'], loyaltyMonths: 6 },
  { wallet: '0x5a3c1b8e2d4f7a6c9b5d2e1f8a4c7b3e6d9f2a5c',  ens: 'gvcfanboy.eth',       gvcCount: 4,  vibestrBalance: 1_200_000,  badgeIds: ['pepe', 'doge', 'super_rare'], loyaltyMonths: 5 },
  { wallet: '0x4b2d8f1e5c7a3b6d9e2f5a8c1b4e7d3a6f9c2b5d',  ens: null,                  gvcCount: 3,  vibestrBalance: 1_050_000,  badgeIds: ['pepe', 'super_rare'], loyaltyMonths: 4 },
  { wallet: '0x3a1c8e5d2f7b4a6c9d3e6f1a4c7b2e5d8f1a4c7b',  ens: 'lurkerland.eth',      gvcCount: 2,  vibestrBalance: 750_000,    badgeIds: ['flow_state', 'pepe'], loyaltyMonths: 3 },
  { wallet: '0x2c8f4a1d5e7b3c6a9d2e5f8b1c4a7d3e6f9b2c5a',  ens: null,                  gvcCount: 2,  vibestrBalance: 520_000,    badgeIds: ['pepe'], loyaltyMonths: 2 },
  { wallet: '0x1d5e8b3a6c9f2d4e7b1c5a8f3d6e9b2c5a8f1d4e',  ens: null,                  gvcCount: 1,  vibestrBalance: 320_000,    badgeIds: ['any_gvc'], loyaltyMonths: 2 },
  { wallet: '0x8e1b4c7a3d6f9b2e5c8a1d4f7b3e6c9a2d5f8b1c',  ens: 'newkid.eth',          gvcCount: 1,  vibestrBalance: 180_000,    badgeIds: ['any_gvc'], loyaltyMonths: 1 },
  { wallet: '0x7c3a6e9b2d5f8a1c4e7b3d6f9a2c5e8b1d4f7a3c',  ens: null,                  gvcCount: 1,  vibestrBalance: 95_000,     badgeIds: ['any_gvc'], loyaltyMonths: 1 },
  { wallet: '0x6f9c2b5e8a1d4c7f3a6b9e2d5c8f1a4b7e3d6c9f',  ens: null,                  gvcCount: 1,  vibestrBalance: 72_000,     badgeIds: ['any_gvc'], loyaltyMonths: 0 },
  { wallet: '0x5e8b1d4c7f3a6e9b2d5c8f1a4b7d3e6c9f2a5b8e',  ens: null,                  gvcCount: 0,  vibestrBalance: 410_000,    badgeIds: [], loyaltyMonths: 0 },
];

export function buildMockLeaderboard(): LeaderboardEntry[] {
  const rows: Omit<LeaderboardEntry, 'rank'>[] = SEEDS.map((seed) => {
    const breakdown = computeShaka({
      badgeIds: seed.badgeIds,
      gvcCount: seed.gvcCount,
      vibestrBalance: seed.vibestrBalance,
    });
    const loyalty = loyaltyTierForMonths(seed.loyaltyMonths);
    return {
      wallet: seed.wallet,
      ens: seed.ens,
      gvcCount: seed.gvcCount,
      vibestrBalance: seed.vibestrBalance,
      vibestrTier: breakdown.vibestrTierName ?? '—',
      shakaScore: breakdown.shakaScore,
      loyaltyMonths: seed.loyaltyMonths,
      loyaltyName: loyalty.name,
      loyaltyMultiplier: loyalty.multiplier,
      punkScore: computePunkScore(breakdown.shakaScore, loyalty.multiplier),
    };
  });

  rows.sort((a, b) => b.punkScore - a.punkScore);
  return rows.map((row, i) => ({ rank: i + 1, ...row }));
}
