"use client";

import { useEffect } from "react";

/**
 * Scroll instead of hover (W9.4). Phones cannot hover, so on touch screens and below 1024px an element
 * marked `data-focus-scroll` gains `is-focus` while it crosses the middle band of the viewport
 * (IntersectionObserver, rootMargin "-40% 0px -40% 0px"). CSS (shared block in globals.css) then zooms
 * its `.focus-zoom` / `.media-zoom` image 1 -> 1.05, lifts it slightly (brightness/saturate) and draws a
 * copper rule along its bottom edge (`data-focus-scroll="norule"` skips the rule).
 *
 * Mount <ScrollFocus /> anywhere on a page (several mounts share one observer). Renders nothing.
 * Desktop with a real pointer keeps its hover styles; under reduced motion nothing is observed.
 * Without JS nothing changes: the resting state is the normal, fully visible photo.
 */
const SELECTOR = "[data-focus-scroll]";
const QUERY = "(hover: none), (max-width: 1023.98px)";

let io: IntersectionObserver | null = null;
let mounts = 0;

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const e of entries) e.target.classList.toggle("is-focus", e.isIntersecting);
}

function start() {
  if (io) return;
  io = new IntersectionObserver(onIntersect, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
  document.querySelectorAll(SELECTOR).forEach((el) => io?.observe(el));
}

function stop() {
  io?.disconnect();
  io = null;
  document.querySelectorAll(`${SELECTOR}.is-focus`).forEach((el) => el.classList.remove("is-focus"));
}

export function ScrollFocus() {
  useEffect(() => {
    mounts++;
    const touch = window.matchMedia(QUERY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (touch.matches && !reduce.matches) {
        if (io) {
          // A later mount (another section, a new route): pick up elements not yet observed.
          stop();
        }
        start();
      } else stop();
    };
    sync();
    touch.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      touch.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      mounts--;
      if (mounts === 0) stop();
    };
  }, []);
  return null;
}
