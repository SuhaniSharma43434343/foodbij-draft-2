"use client";

import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "./useMagnetic";
import "./motion-extras.css";

/**
 * Copper cursor accent (motion spec, Expressive pass item 7). Desktop fine pointers only, never under reduced
 * motion, nothing at all on touch (renders null). The native cursor stays visible; this is an accent that
 * follows it with a slight lag (rAF lerp 0.2, transform only). aria-hidden, pointer-events: none.
 *
 * States (CSS in motion-extras.css):
 * - dot: an 8px copper dot.
 * - view: an 84px copper disc reading "View" over images and cards. Triggers: `[data-cursor="view"]`
 *   (use this on new photos/cards), plus `a img`, `.group` (card links) and `.svc-frame` (home services photo).
 * - link: a 28px copper ring over links, buttons, labels and summaries (`[data-cursor="link"]` forces it).
 * - hidden: pointer outside the window, over form fields, while the phone menu is open
 *   (html[data-scroll-lock]) or over anything marked `[data-cursor="none"]`.
 *
 * Also switches on the magnetic primary buttons (useMagnetic), which share the same device gate.
 */

const VIEW_SELECTOR = '[data-cursor="view"], a img, .group, .svc-frame';
const LINK_SELECTOR = 'a[href], button, [role="button"], label, summary, [data-cursor="link"]';
const HIDE_SELECTOR = 'input, textarea, select, [contenteditable="true"], [data-cursor="none"]';
const LERP = 0.2;

type CursorState = "dot" | "link" | "view";

function stateFor(target: Element | null): CursorState | "hidden" {
  if (!target) return "hidden";
  if (target.closest(HIDE_SELECTOR)) return "hidden";
  if (target.closest(VIEW_SELECTOR)) return "view";
  if (target.closest(LINK_SELECTOR)) return "link";
  return "dot";
}

export function CopperCursor() {
  const [enabled, setEnabled] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  // Device gate, re-checked if the user plugs in a mouse or toggles reduced motion.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useMagnetic(enabled);

  useEffect(() => {
    const node = el.current;
    if (!enabled || !node) return;
    const html = document.documentElement;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let seen = false;
    let raf = 0;
    let state: CursorState | "hidden" = "hidden";
    let outside = true;

    const paint = () => {
      const hidden = outside || state === "hidden" || html.hasAttribute("data-scroll-lock");
      node.toggleAttribute("data-hidden", hidden);
      if (state !== "hidden") node.dataset.state = state;
    };
    const frame = () => {
      x += (tx - x) * LERP;
      y += (ty - y) * LERP;
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        x = tx;
        y = ty;
        raf = 0;
      } else raf = requestAnimationFrame(frame);
      node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        // First sighting: start on the pointer instead of sliding in from the corner.
        seen = true;
        x = tx;
        y = ty;
      }
      if (outside) {
        outside = false;
        paint();
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const next = stateFor(e.target as Element | null);
      if (next !== state) {
        state = next;
        paint();
      }
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        outside = true;
        paint();
      }
    };
    const onBlur = () => {
      outside = true;
      paint();
    };
    // The phone menu toggles html[data-scroll-lock]; route changes swap the element under a still pointer.
    const mo = new MutationObserver(paint);
    mo.observe(html, { attributes: true, attributeFilter: ["data-scroll-lock"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", onBlur);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={el} className="cc" data-hidden="" data-state="dot" aria-hidden="true">
      <span className="cc-dot" />
      <span className="cc-ring" />
      <span className="cc-disc">View</span>
    </div>
  );
}
