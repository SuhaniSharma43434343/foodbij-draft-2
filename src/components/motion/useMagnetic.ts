"use client";

import { useEffect } from "react";

/** How far outside the button the pull starts, and the largest offset of the face. */
const REACH_PX = 24;
const MAX_SHIFT_PX = 8;

/**
 * Magnetic primary buttons (motion spec, Expressive pass item 7). One delegated pointer listener for the page:
 * every `[data-magnetic]` element whose box (+24px) holds the pointer pulls its `[data-magnetic-face]` child
 * toward the pointer (up to 8px); outside it springs back (the ease is the CSS transition on .btn-face).
 * Transform only, on the inner face, so the link's hit area and focus outline stay put. Desktop fine pointer
 * only and never under reduced motion; keyboard and touch are untouched. `enabled` comes from the caller.
 */
export function useMagnetic(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let px = -1e4;
    let py = -1e4;
    const active = new Set<HTMLElement>();

    const frame = () => {
      raf = 0;
      const els = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      const vh = window.innerHeight;
      for (const el of els) {
        const face = el.querySelector<HTMLElement>("[data-magnetic-face]");
        if (!face) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || r.width === 0) continue;
        const inside =
          px >= r.left - REACH_PX && px <= r.right + REACH_PX && py >= r.top - REACH_PX && py <= r.bottom + REACH_PX;
        if (inside) {
          const nx = (px - (r.left + r.width / 2)) / (r.width / 2 + REACH_PX);
          const ny = (py - (r.top + r.height / 2)) / (r.height / 2 + REACH_PX);
          face.style.transform = `translate3d(${(nx * MAX_SHIFT_PX).toFixed(2)}px, ${(ny * MAX_SHIFT_PX).toFixed(2)}px, 0)`;
          active.add(face);
        } else if (active.has(face)) {
          face.style.transform = "";
          active.delete(face);
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onScroll = () => {
      if (px > -1e4 && !raf) raf = requestAnimationFrame(frame);
    };
    const release = () => {
      px = py = -1e4;
      for (const face of active) face.style.transform = "";
      active.clear();
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) release();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerout", onOut);
    window.addEventListener("blur", release);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", release);
      release();
    };
  }, [enabled]);
}
