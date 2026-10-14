import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // A second dev server can run beside the main one with its own build dir: NEXT_DIST_DIR=.next-alt npx next dev -p 3011
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  // Preview build: keep every page out of search until the owner approves a launch.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
