"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * Decorative oversized service word (aria-hidden). useScrollProgress (mode "view") writes --p and CSS drifts
 * the word sideways with scroll (service-motion.css). Static without JS / under reduced motion.
 * - variant "behind" (default, desktop only): an outline word filling its positioned parent, behind the list (`.sv-drift`).
 * - variant "band" (phone only, W9.4): a huge italic word in its own full-bleed, clipped band in the flow
 *   (`.sv-band`); it travels right to left across the screen as the band scrolls through. Its height is fixed
 *   by its font size, so nothing shifts; the band clips the word, so the page never scrolls sideways.
 */
export function DriftWord({ word, variant = "behind" }: { word: string; variant?: "behind" | "band" }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, { mode: "view" });
  return (
    <div ref={ref} aria-hidden="true" className={variant === "band" ? "sv-band" : "sv-drift"}>
      <span>{word}</span>
    </div>
  );
}
