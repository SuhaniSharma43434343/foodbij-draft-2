"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import "./motion-extras.css";

/** Cover time before the route changes (spec: total delay before navigation <= ~400ms). */
const COVER_MS = 300;
const REVEAL_MS = 350;
/** If the new route has not arrived by then, lift the curtain anyway (never strand the visitor). */
const FAILSAFE_MS = 5000;

type Phase = "idle" | "cover" | "covered" | "reveal";

/**
 * Page curtain between routes (motion spec, Expressive pass item 8; restyled W10.1 to match the first-visit
 * intro). A navy panel rises over the page (300ms) with the small white logo and a copper hairline drawing
 * in under it, the route changes underneath, then the hairline runs out to the right and the panel lifts
 * away (350ms).
 *
 * - Only plain internal clicks: same-origin <a href> to a different pathname, left button, no modifier keys,
 *   no target/download, not a file. A window capture-phase listener calls preventDefault (next/link then skips
 *   its own navigation; the link's onClick still runs, so the phone menu closes first), plays the cover, then
 *   router.push(). Opt out with `data-no-curtain` on the link or an ancestor.
 * - In-page hash links and same-page links (#plan, /#services from home) are left alone: no curtain.
 * - Back/forward and any navigation it did not start: no curtain (Next restores scroll as usual).
 * - Scroll: router.push keeps Next's scroll-to-top and MotionProvider resets Lenis on the pathname change;
 *   this component never scrolls.
 * - Focus: once the curtain lifts, focus moves to <main id="main"> (tabindex -1), so screen readers start at
 *   the new content (Next's route announcer still announces the title).
 * - Reduced motion or no JS: nothing happens, links just work.
 */
export function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const el = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>("idle");
  const arrived = useRef(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const setPhase = (p: Phase) => {
    phase.current = p;
    if (el.current) el.current.dataset.phase = p === "covered" ? "cover" : p;
  };

  const reveal = (moveFocus: boolean) => {
    if (phase.current !== "covered") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    // Two frames so the new page has painted under the curtain before it lifts.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setPhase("reveal");
        later(() => {
          setPhase("idle");
          if (moveFocus) document.getElementById("main")?.focus({ preventScroll: true });
        }, REVEAL_MS);
      }),
    );
  };
  const revealRef = useRef(reveal);
  useEffect(() => {
    revealRef.current = reveal;
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (reduce.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || a.closest("[data-no-curtain]")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // hash links and same-page links: no curtain
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) || url.pathname.startsWith("/api/")) return; // files, endpoints

      e.preventDefault();
      if (phase.current !== "idle") return; // a second click while the curtain is moving
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      arrived.current = false;
      setPhase("cover");
      later(() => {
        phase.current = "covered";
        router.push(href);
        // Pathname may already have changed (fast cache hit) before the cover finished.
        if (arrived.current) revealRef.current(true);
      }, COVER_MS);
      later(() => {
        if (phase.current !== "cover" && phase.current !== "covered") return;
        phase.current = "covered";
        revealRef.current(false);
      }, FAILSAFE_MS);
    };

    window.addEventListener("click", onClick, true);
    const list = timers;
    return () => {
      window.removeEventListener("click", onClick, true);
      list.current.forEach(clearTimeout);
    };
  }, [router]);

  // The new route is committed: lift the curtain if we covered for it.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    arrived.current = true;
    if (phase.current === "covered") revealRef.current(true);
  }, [pathname]);

  return (
    <div ref={el} className="pc" data-phase="idle" aria-hidden="true">
      <div className="pc-mark">
        {/* Same file and sizes as the header's white logo, so it is already in the cache. */}
        <Image
          src="/logos/foodbiz-2026-white-1200w.png"
          alt=""
          width={1200}
          height={274}
          loading="eager"
          fetchPriority="low"
          sizes="(min-width: 1024px) 170px, 132px"
          className="pc-logo"
        />
        <span className="pc-line" />
      </div>
    </div>
  );
}
