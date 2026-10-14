"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * The motion system's only JavaScript (spec: docs/design/motion-spec.md). Mounted once in the root layout;
 * renders nothing.
 *
 * Scroll reveals
 * - Mark elements with `data-reveal` (fade up), `data-reveal="wipe"` (photo frame unveils from the bottom,
 *   its first child scales 1.12 -> 1) or `data-reveal="rule"` (a copper rule draws in from the left).
 * - Mark a parent with `data-reveal-stagger`: its direct children become reveal items (fade up unless they
 *   carry their own data-reveal value) and items entering together get a 90ms cascade (max 6 steps).
 * - One IntersectionObserver for the page; each element reveals once (`is-in`). The hidden start state only
 *   exists under `html.js-motion`, which is added here, so content is visible without JS. Elements already
 *   on screen when the system starts are shown at once (no flash, LCP untouched).
 *
 * Smooth scroll (Lenis)
 * - Desktop pointer only (`(hover: hover) and (pointer: fine)`), never under reduced motion; loaded after
 *   idle so it never competes with first paint. One RAF loop. In-page anchors glide and land below the header.
 * - Stops while `html[data-scroll-lock]` is set (the phone menu sets it) or a `motion:scroll-lock` event says so.
 */

const STAGGER_MAX = 5; // --i 0..5 = 6 steps
const REVEAL_SELECTOR = "[data-reveal]";

let observer: IntersectionObserver | null = null;
let lenis: Lenis | null = null;
let poppedState = false;

function revealNow(el: Element) {
  el.classList.add("is-in");
}

/** Children of stagger parents become reveal items. */
function adoptStaggerChildren(root: ParentNode) {
  root.querySelectorAll("[data-reveal-stagger]").forEach((parent) => {
    for (const child of Array.from(parent.children)) {
      if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", "");
    }
  });
}

function onIntersect(entries: IntersectionObserverEntry[]) {
  const perParent = new Map<Element | null, number>();
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const el = entry.target as HTMLElement;
    const parent = el.parentElement?.hasAttribute("data-reveal-stagger") ? el.parentElement : null;
    if (parent) {
      const n = perParent.get(parent) ?? 0;
      el.style.setProperty("--i", String(Math.min(n, STAGGER_MAX)));
      perParent.set(parent, n + 1);
    }
    revealNow(el);
    observer?.unobserve(el);
  }
}

/** Observe every not-yet-revealed element. `initial`: reveal what is already on screen without animating. */
function scan(initial: boolean) {
  adoptStaggerChildren(document);
  const els = Array.from(document.querySelectorAll(REVEAL_SELECTOR)).filter((el) => !el.classList.contains("is-in"));
  const vh = window.innerHeight;
  for (const el of els) {
    if (initial) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add("is-in", "reveal-instant");
        continue;
      }
    }
    observer?.observe(el);
  }
  if (initial) {
    // Drop the no-transition marker after the first frame so later hovers etc. animate normally.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll(".reveal-instant").forEach((el) => el.classList.remove("reveal-instant"));
    }));
  }
}

/** In-page anchors glide through Lenis. Lenis subtracts html's scroll-padding-top (= --header-h), so they land below the header. */
function onAnchorClick(e: MouseEvent) {
  if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
  if (!a || a.target === "_blank") return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  e.stopPropagation();
  lenis.scrollTo(target, { duration: 1.1 });
  history.pushState(history.state, "", url.hash);
  // Keep native behaviour for focusable targets (the skip link moves focus to <main tabindex="-1">).
  if (target.hasAttribute("tabindex") || target.matches("a[href], button, input, select, textarea")) {
    target.focus({ preventScroll: true });
  }
}

function setLock(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

async function startLenis(): Promise<() => void> {
  const { default: LenisCtor } = await import("lenis");
  lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false, stopInertiaOnNavigate: true });
  let raf = 0;
  const frame = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  // The phone menu (or anything else) locks scroll via html[data-scroll-lock] or a motion:scroll-lock event.
  const html = document.documentElement;
  const mo = new MutationObserver(() => setLock(html.hasAttribute("data-scroll-lock")));
  mo.observe(html, { attributes: true, attributeFilter: ["data-scroll-lock"] });
  setLock(html.hasAttribute("data-scroll-lock"));
  const onLockEvent = (e: Event) => setLock(Boolean((e as CustomEvent<boolean>).detail));
  window.addEventListener("motion:scroll-lock", onLockEvent);
  document.addEventListener("click", onAnchorClick, true);

  return () => {
    cancelAnimationFrame(raf);
    mo.disconnect();
    window.removeEventListener("motion:scroll-lock", onLockEvent);
    document.removeEventListener("click", onAnchorClick, true);
    lenis?.destroy();
    lenis = null;
  };
}

export function MotionProvider() {
  const pathname = usePathname();

  // Boot once: js-motion class, the observer, Lenis after idle.
  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    observer = new IntersectionObserver(onIntersect, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
    scan(true);
    html.classList.add("js-motion");

    const onPop = () => {
      poppedState = true;
    };
    window.addEventListener("popstate", onPop);

    let stopLenis: (() => void) | null = null;
    let cancelled = false;
    let starting = false;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const boot = () => {
      if (cancelled || starting || stopLenis || reduce.matches || !fine.matches) return;
      starting = true;
      startLenis().then((stop) => {
        starting = false;
        if (cancelled) stop();
        else stopLenis = stop;
      });
    };
    const hasIdle = "requestIdleCallback" in window;
    const idle = hasIdle ? window.requestIdleCallback(boot, { timeout: 2500 }) : window.setTimeout(boot, 1200);
    // Reduced motion switched on mid-visit: drop smoothing at once.
    const onReduce = () => {
      if (reduce.matches && stopLenis) {
        stopLenis();
        stopLenis = null;
      } else boot();
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      reduce.removeEventListener("change", onReduce);
      window.removeEventListener("popstate", onPop);
      stopLenis?.();
      observer?.disconnect();
      observer = null;
      html.classList.remove("js-motion");
    };
  }, []);

  // Route change: new page content gets observed; Lenis jumps to the top (or the hash target) and re-measures.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const id = requestAnimationFrame(() => {
      scan(false);
      if (lenis) {
        lenis.resize();
        const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
        if (target) lenis.scrollTo(target, { immediate: true, force: true });
        else if (!poppedState) lenis.scrollTo(0, { immediate: true, force: true });
        else lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
      poppedState = false;
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
