// Engine badge IDs (from badge_token_map.json) → image filenames.
// Most IDs map 1:1 to /public/badges/{id}.webp. A few engine IDs use shorter
// names than the image filenames they ship with (kit drift), so we alias.

const ALIAS: Record<string, string> = {
  cosmic: 'cosmic_guardian',
  baller: 'vibetown_baller',
  billiards: 'rack_em_up',
  sweettooth: 'sugar_rush',
};

export function getBadgeImage(id: string): string {
  const file = ALIAS[id] ?? id;
  return `/badges/${file}.webp`;
}

// VIBESTR tier badge images (kit ships clean names)
export function getVibestrTierImage(badgeId: string): string {
  return `/badges/${badgeId}.webp`;
}

export const BOUNTY_HUNTER_IMAGE = '/badges/vibestr_bounty_hunter.webp';
