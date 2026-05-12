export type BadgeTier = 'Cosmic' | 'Legendary' | 'Rare' | 'Common' | 'Citizen';

export interface BadgeDef {
  id: string;
  name: string;
  tier: BadgeTier;
}

export const TIER_POINTS: Record<BadgeTier, number> = {
  Cosmic: 500,
  Legendary: 250,
  Rare: 125,
  Common: 100,
  Citizen: 50,
};

export const HIGHEST_TIER_MULTIPLIER: Record<BadgeTier, number> = {
  Cosmic: 1.5,
  Legendary: 1.3,
  Rare: 1.15,
  Common: 1.0,
  Citizen: 1.0,
};

export const TIER_RANK: Record<BadgeTier, number> = {
  Cosmic: 5,
  Legendary: 4,
  Rare: 3,
  Common: 2,
  Citizen: 1,
};

export const TIER_COLOR: Record<BadgeTier, string> = {
  Cosmic: '#B57BFF',
  Legendary: '#FFE048',
  Rare: '#FF6B9D',
  Common: '#9CC2FF',
  Citizen: '#9AA3B2',
};

// Canonical badge IDs match the GVC builder kit engine output (badge_token_map.json keys).
// Some image filenames in /public/badges use older long names; the image resolver handles aliases.
export const BADGES: BadgeDef[] = [
  // Cosmic
  { id: 'cosmic', name: 'Cosmic Guardian', tier: 'Cosmic' },
  { id: 'one_of_one', name: 'One of One', tier: 'Cosmic' },
  { id: 'the_completionist', name: 'The Completionist', tier: 'Cosmic' },

  // Legendary
  { id: 'surfer', name: 'Get Pitted', tier: 'Legendary' },
  { id: 'astro_balls', name: 'Stellar Spheres', tier: 'Legendary' },
  { id: 'gold_member', name: 'Golden Fever', tier: 'Legendary' },
  { id: 'shadow_funk_division', name: 'Shadow Funk Division', tier: 'Legendary' },
  { id: 'straw_man', name: 'Straw Man', tier: 'Legendary' },
  { id: 'king', name: 'Vibetown Royalty', tier: 'Legendary' },
  { id: 'stone', name: 'Marble Potential', tier: 'Legendary' },
  { id: 'lamp', name: 'I Love Lamp', tier: 'Legendary' },
  { id: 'hoodie_up_society', name: 'Hoodie Up Society', tier: 'Legendary' },
  { id: 'electric_rings', name: "Watt's Up", tier: 'Legendary' },
  { id: 'astro_bean', name: 'AstroBean', tier: 'Legendary' },
  { id: 'baller', name: 'Vibetown Baller', tier: 'Legendary' },
  { id: 'sweettooth', name: 'Sugar Rush', tier: 'Legendary' },
  { id: 'highkeymoments_2', name: 'HighKey Moments II', tier: 'Legendary' },
  { id: 'vibefoot_fan_club', name: 'Vibefoot Fan Club', tier: 'Legendary' },
  { id: 'twenty_badges', name: 'Collector of Immaculate Vibes', tier: 'Legendary' },
  { id: 'thirty_badges', name: 'Collector of Pristine Vibes', tier: 'Legendary' },
  { id: 'forty_badges', name: 'Collector of Transcendent Vibes', tier: 'Legendary' },
  { id: 'fifty_badges', name: 'Collector of Magnificent Vibes', tier: 'Legendary' },
  { id: 'unfathomable_vibes', name: 'Collector of Unfathomable Vibes', tier: 'Legendary' },

  // Rare
  { id: 'pothead', name: 'High Vibes', tier: 'Rare' },
  { id: 'rainbow_boombox', name: 'Bass in Your Face', tier: 'Rare' },
  { id: 'flow_state', name: 'Flow State', tier: 'Rare' },
  { id: 'kinky', name: 'Kinky', tier: 'Rare' },
  { id: 'checkmate', name: 'No Pawn Intended', tier: 'Rare' },
  { id: 'fur_the_win', name: 'Fur The Win', tier: 'Rare' },
  { id: 'grayscale_seeker', name: 'Grailscale Hunter', tier: 'Rare' },
  { id: 'poker_face', name: 'Pocket Rockets', tier: 'Rare' },
  { id: 'rainbow_citizen', name: 'Rainbow Maxi', tier: 'Rare' },
  { id: 'trait_maxi', name: 'Trait Maxi', tier: 'Rare' },
  { id: 'yin_n_yang', name: "Yin N' Yang", tier: 'Rare' },
  { id: 'zoom_in_vibe_out', name: 'Zoom In, Vibe Out', tier: 'Rare' },
  { id: 'science_goggles', name: 'Atomic Aura', tier: 'Rare' },
  { id: 'toy_bricks', name: 'Brick By Brick', tier: 'Rare' },
  { id: 'plants', name: 'Aloe You Vera Much', tier: 'Rare' },
  { id: 'hue_too_fresh', name: 'Hue Too Fresh', tier: 'Rare' },
  { id: 'chris_favorite_badge', name: "Chris' Favorite Badge", tier: 'Rare' },
  { id: 'anchorman', name: 'Anchorman', tier: 'Rare' },
  { id: 'doge', name: 'Shiba Syndicate', tier: 'Rare' },
  { id: 'captain', name: 'Oh Captain My Captain', tier: 'Rare' },
  { id: 'elite_rainbow_ranger', name: 'Elite Rainbow Ranger', tier: 'Rare' },
  { id: 'full_throttle', name: 'Full Throttle', tier: 'Rare' },
  { id: 'gamer', name: '360 No Scope', tier: 'Rare' },
  { id: 'gud_meat', name: 'Gud Meat', tier: 'Rare' },
  { id: 'billiards', name: "Rack 'Em Up", tier: 'Rare' },
  { id: 'high_noon_hustler', name: 'High Noon Hustler', tier: 'Rare' },
  { id: 'homerun', name: 'Homerun', tier: 'Rare' },
  { id: 'pepe', name: 'Pepe Posse', tier: 'Rare' },
  { id: 'shower', name: "Soaked N' Stoked", tier: 'Rare' },
  { id: 'mountain_goat', name: 'Mountain GOAT', tier: 'Rare' },
  { id: 'no_face_no_problem', name: 'No Face, No Problem', tier: 'Rare' },
  { id: 'party_in_the_back', name: 'Party In The Back', tier: 'Rare' },
  { id: 'power_duo', name: 'Power Duo', tier: 'Rare' },
  { id: 'rainbow_bubble_goggles', name: 'Bubble Visionary', tier: 'Rare' },
  { id: 'sir_vibes_a_lot', name: 'Sir Vibes-a-lot', tier: 'Rare' },
  { id: 'showtime', name: 'Showtime', tier: 'Rare' },
  { id: 'super_rare', name: 'SuperRare', tier: 'Rare' },
  { id: 'patch_powerhouse', name: 'Patch Powerhouse', tier: 'Rare' },
  { id: 'tanks_a_lot', name: 'Tanks A Lot', tier: 'Rare' },
  { id: 'tatted_up', name: 'Tatted Up', tier: 'Rare' },
  { id: 'varsity_vibes', name: 'Varsity Vibes', tier: 'Rare' },
  { id: 'nounish_vibes', name: 'Nounish Vibes', tier: 'Rare' },
  { id: 'ranger', name: 'Vibe Ranger', tier: 'Rare' },
  { id: 'rainbow_visor', name: 'Hue Got This', tier: 'Rare' },
  { id: 'great_stacheby', name: "Great 'Stacheby", tier: 'Rare' },
  { id: 'gradient_high_five', name: 'Gradient High Five', tier: 'Rare' },
  { id: 'plastic_high_five', name: 'Plastic High Five', tier: 'Rare' },
  { id: 'robot_high_five', name: 'Robot High Five', tier: 'Rare' },
  { id: 'ten_badges', name: 'Collector of Exquisite Vibes', tier: 'Rare' },
  { id: 'fifteen_badges', name: 'Collector of Legendary Vibes', tier: 'Rare' },
  // Vibe Bounty Badge — folds into Rare from Phase 2 onward
  { id: 'vibestr_bounty_hunter', name: 'Vibe Bounty Badge', tier: 'Rare' },

  // Common
  { id: 'any_gvc', name: 'Official Citizen of Vibetown', tier: 'Common' },
  { id: 'full_send_maverick', name: 'Full Send Maverick', tier: 'Common' },
  { id: 'funky_fresh', name: 'Funky Fresh', tier: 'Common' },
  { id: 'gradient_lover', name: 'Gradient Gatherer', tier: 'Common' },
  { id: 'highkeymoments_1', name: 'HighKey Moments I', tier: 'Common' },
  { id: 'visooor_enjoyooor', name: 'Visooor Enjoyooor', tier: 'Common' },
  { id: 'ladies_night', name: 'Ladies Night', tier: 'Common' },
  { id: 'necks_level', name: 'Necks Level', tier: 'Common' },
  { id: 'multi_type_master', name: 'Multi-Type Master', tier: 'Common' },
  { id: 'vibetown_social_club', name: 'Vibetown Social Club', tier: 'Common' },
  { id: 'plastic_lover', name: 'Plastic Pioneer', tier: 'Common' },
  { id: 'hail_mary_heroes', name: 'Hail Mary Heroes', tier: 'Common' },
  { id: 'seas_the_day', name: 'Seas The Day', tier: 'Common' },
  { id: 'robot_lover', name: 'Love at First Byte', tier: 'Common' },
  { id: 'suited_up', name: 'Suited Up', tier: 'Common' },
  { id: 'gradient_hatrick', name: 'Gradient Hatrick', tier: 'Common' },
  { id: 'plastic_hatrick', name: 'Plastic Hatrick', tier: 'Common' },
  { id: 'robot_hatrick', name: 'Robot Hatrick', tier: 'Common' },
  { id: 'five_badges', name: 'Collector of Epic Vibes', tier: 'Common' },
];

export const BADGE_BY_ID: Record<string, BadgeDef> = Object.fromEntries(
  BADGES.map((b) => [b.id, b])
);

export interface VibestrTier {
  name: string;
  threshold: number;
  multiplier: number;
  color: string;
  badgeId: string;
}

export const VIBESTR_TIERS: VibestrTier[] = [
  { name: 'Blue',    threshold: 69_000,     multiplier: 1.15, color: '#5BA8FF', badgeId: 'vibestr_blue_tier' },
  { name: 'Pink',    threshold: 250_000,    multiplier: 1.20, color: '#FF6B9D', badgeId: 'vibestr_pink_tier' },
  { name: 'Purple',  threshold: 500_000,    multiplier: 1.25, color: '#B57BFF', badgeId: 'vibestr_purple_tier' },
  { name: 'Bronze',  threshold: 1_000_000,  multiplier: 1.30, color: '#FF8A3D', badgeId: 'vibestr_bronze_tier' },
  { name: 'Silver',  threshold: 2_500_000,  multiplier: 1.35, color: '#C7CCD6', badgeId: 'vibestr_silver_tier' },
  { name: 'Gold',    threshold: 4_200_000,  multiplier: 1.40, color: '#FFE048', badgeId: 'vibestr_gold_tier' },
  { name: 'Diamond', threshold: 6_900_000,  multiplier: 1.45, color: '#9CE7FF', badgeId: 'vibestr_diamond_tier' },
  { name: 'Cosmic',  threshold: 10_000_000, multiplier: 1.50, color: '#B57BFF', badgeId: 'vibestr_cosmic_tier' },
];

export function getVibestrTier(amount: number): VibestrTier | null {
  let active: VibestrTier | null = null;
  for (const tier of VIBESTR_TIERS) {
    if (amount >= tier.threshold) active = tier;
  }
  return active;
}

export function getNextVibestrTier(amount: number): VibestrTier | null {
  for (const tier of VIBESTR_TIERS) {
    if (amount < tier.threshold) return tier;
  }
  return null;
}
