"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

type ScrollLitProps = {
  text: string;
  className?: string;
};

/**
 * A line whose words light up one by one as it scrolls up the screen (like the home Statement).
 * useScrollProgress "view" writes --p on the <p>; each word's opacity = clamp(0.18, q * (N + 1) - i, 1) with
 * q running 0 -> 1 between --p 0.15 and 0.5 (the line entering the lower screen -> about centred).
 * CSS: .pm-lit in pages-motion.css. Without JS or under reduced motion every word is fully lit.
 */
export function ScrollLit({ text, className = "" }: ScrollLitProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref, { mode: "view" });
  return (
    <p ref={ref} className={`pm-lit ${className}`.trim()} style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className="pm-lit-word" style={{ "--i": i } as CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
