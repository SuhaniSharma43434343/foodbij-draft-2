import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Preview build: keep every page out of search until the owner approves a launch.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
