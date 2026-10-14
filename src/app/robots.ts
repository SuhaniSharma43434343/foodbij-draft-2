import type { MetadataRoute } from "next";

// Preview build: block all crawlers until launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
