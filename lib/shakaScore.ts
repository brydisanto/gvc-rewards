import { BADGE_BY_ID, HIGHEST_TIER_MULTIPLIER, TIER_POINTS, TIER_RANK, type BadgeTier } from '@/data/badgeTiers';
import { getVibestrTier } from '@/data/badgeTiers';

export interface ShakaInputs {
  badgeIds: string[];
  gvcCount: number;
  vibestrBalance: number;
}

export interface ShakaBreakdown {
  basePoints: number;
  citizenPoints: number;
  badgePoints: number;
  highestTier: BadgeTier;
  highestTierMultiplier: number;
  vibestrTierName: string | null;
  vibestrTierMultiplier: number;
  shakaScore: number;
}

export function computeShaka(inputs: ShakaInputs): ShakaBreakdown {
  const { badgeIds, gvcCount, vibestrBalance } = inputs;

  const citizenPoints = gvcCount * TIER_POINTS.Citizen;

  let badgePoints = 0;
  let highestTier: BadgeTier = 'Citizen';
  for (const id of badgeIds) {
    const def = BADGE_BY_ID[id];
    if (!def) continue;
    badgePoints += TIER_POINTS[def.tier];
    if (TIER_RANK[def.tier] > TIER_RANK[highestTier]) {
      highestTier = def.tier;
    }
  }
  if (gvcCount > 0 && TIER_RANK['Citizen'] > TIER_RANK[highestTier]) {
    highestTier = 'Citizen';
  }

  const basePoints = citizenPoints + badgePoints;
  const highestTierMultiplier = HIGHEST_TIER_MULTIPLIER[highestTier];

  const vTier = getVibestrTier(vibestrBalance);
  const vibestrTierMultiplier = vTier?.multiplier ?? 1.0;
  const vibestrTierName = vTier?.name ?? null;

  const shakaScore = Math.round(basePoints * highestTierMultiplier * vibestrTierMultiplier);

  return {
    basePoints,
    citizenPoints,
    badgePoints,
    highestTier,
    highestTierMultiplier,
    vibestrTierName,
    vibestrTierMultiplier,
    shakaScore,
  };
}

// Loyalty period starts 2026-06-09. Hold duration is months continuously held from that date.
export const LOYALTY_START = new Date('2026-06-09T00:00:00Z');

export interface LoyaltyTier {
  name: string;
  multiplier: number;
  minMonths: number;
  maxMonths: number | null;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  { name: 'Newcomer',    multiplier: 1.00, minMonths: 0,  maxMonths: 2 },
  { name: 'Resident',    multiplier: 1.25, minMonths: 3,  maxMonths: 5 },
  { name: 'Local',       multiplier: 1.50, minMonths: 6,  maxMonths: 11 },
  { name: 'Vibetown OG', multiplier: 2.00, minMonths: 12, maxMonths: null },
];

export function loyaltyTierForMonths(months: number): LoyaltyTier {
  for (let i = LOYALTY_TIERS.length - 1; i >= 0; i--) {
    if (months >= LOYALTY_TIERS[i].minMonths) return LOYALTY_TIERS[i];
  }
  return LOYALTY_TIERS[0];
}

export function monthsSinceLoyaltyStart(now: Date = new Date()): number {
  if (now < LOYALTY_START) return 0;
  const ms = now.getTime() - LOYALTY_START.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24 * 30.4375));
}

export function computePunkScore(shakaScore: number, loyaltyMultiplier: number): number {
  return Math.round(shakaScore * loyaltyMultiplier);
}
