"use client";

import { useEffect, type RefObject } from "react";

/**
 * Shared scroll-scrub primitive for the expressive motion pass (W7).
 *
 * Writes `--p` (0..1) on the element: 0 when its top reaches the top of the viewport (for a pinned
 * section: when it pins), 1 when its bottom reaches the bottom of the viewport (when it unpins).
 * Effects then read `var(--p)` in CSS (calc/transform/opacity), so React never re-renders on scroll.
 * Options:
 *   - `mode: "pin"` (default) as above; `mode: "view"` maps 0 when the element's top enters the
 *     bottom of the viewport to 1 when its bottom leaves the top (for parallax and word scrubbing).
 *   - `steps`: also writes `data-step` = floor(p * steps) clamped to steps-1 (e.g. which service card
 *     is in focus), so CSS can switch states with attribute selectors.
 * One rAF per frame for all instances (shared loop), passive scroll listeners, no layout writes.
 * Under prefers-reduced-motion it writes the final state once (`--p: 1`, last step) and stops,
 * so nothing is left half-revealed. Without JS, CSS must default to a sensible static state.
 */
type Opts = { mode?: "pin" | "view"; steps?: number };

type Entry = { el: HTMLElement; mode: "pin" | "view"; steps?: number; last: number };
const entries = new Set<Entry>();
let raf = 0;

function tick() {
  raf = 0;
  const vh = window.innerHeight;
  for (const e of entries) {
    const r = e.el.getBoundingClientRect();
    let p: number;
    if (e.mode === "pin") {
      const span = r.height - vh;
      p = span > 0 ? -r.top / span : r.top <= 0 ? 1 : 0;
    } else {
      p = (vh - r.top) / (vh + r.height);
    }
    p = Math.min(1, Math.max(0, p));
    if (Math.abs(p - e.last) < 0.001) continue;
    e.last = p;
    e.el.style.setProperty("--p", p.toFixed(4));
    if (e.steps) e.el.dataset.step = String(Math.min(e.steps - 1, Math.floor(p * e.steps)));
  }
}
function schedule() {
  if (!raf) raf = requestAnimationFrame(tick);
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>, { mode = "pin", steps }: Opts = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      if (steps) el.dataset.step = String(steps - 1);
      el.dataset.motion = "reduced";
      return;
    }
    const entry: Entry = { el, mode, steps, last: -1 };
    entries.add(entry);
    if (entries.size === 1) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    }
    schedule();
    return () => {
      entries.delete(entry);
      if (entries.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, [ref, mode, steps]);
}
