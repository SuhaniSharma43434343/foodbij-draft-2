// next/image loader: serves the pre-built WebP files from public/o (scripts/optimize-images.mjs).
// Picks the smallest pre-built width that covers the requested width. Anything not in the manifest
// (the logo files) is served as is.
import manifest from "@/content/image-manifest.json";

type Entry = { name: string; widths: number[]; color: string };
const files = manifest as Record<string, Entry>;

export default function loader({ src, width }: { src: string; width: number; quality?: number }) {
  const entry = files[src];
  if (!entry) return src;
  const w = entry.widths.find((x) => x >= width) ?? entry.widths[entry.widths.length - 1];
  return `/o/${entry.name}-${w}.webp`;
}

export function placeholderColor(src: string): string | undefined {
  return files[src]?.color;
}
