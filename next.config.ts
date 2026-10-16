import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Photos are pre-built to static WebP files (scripts/optimize-images.mjs) and picked by this loader,
    // so none waits on the on-demand optimiser. Widths match the pre-built set.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 828, 1200, 1600, 2048],
    imageSizes: [240],
  },
  // A second dev server can run beside the main one with its own build dir: NEXT_DIST_DIR=.next-alt npx next dev -p 3011
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  // Preview build: keep every page out of search until the owner approves a launch.
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/o/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
