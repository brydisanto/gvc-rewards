import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mounted under /rewards-pool of vibepool.io (proxied from the main site).
  // basePath prefixes all routes, API routes, _next assets, and next/font.
  basePath: "/rewards-pool",
};

export default nextConfig;
