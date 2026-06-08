// This app is mounted under /rewards-pool of vibepool.io via a Next.js zone
// proxy from the main (projecteruption) site. `basePath` in next.config handles
// routing + _next assets + next/font automatically, but raw absolute references
// (client fetches, <img src="/...">, CSS url(), metadata icons) are NOT prefixed
// by Next, so they go through withBase() / BASE_PATH instead.
export const BASE_PATH = "/rewards-pool";

/** Prefix an absolute app path (api route or public asset) with the base path. */
export const withBase = (path: string): string => `${BASE_PATH}${path}`;
