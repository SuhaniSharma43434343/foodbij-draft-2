import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // AVIF first (roughly a fifth smaller than WebP for these photos), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    // One quality for every photo: 70 is visually the same as the default 75 here and ~10% lighter.
    // (next/image snaps any requested quality to the nearest allowed value.)
    qualities: [70],
    // The photos are static files that only change with a deploy: keep optimised copies for 31 days.
    minimumCacheTTL: 2678400,
  },
  // A second dev server can run beside the main one with its own build dir: NEXT_DIST_DIR=.next-alt npx next dev -p 3011
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  // Preview build: keep every page out of search until the owner approves a launch.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
