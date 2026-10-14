"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { StoryViewerProvider } from "@/components/stories/StoryViewer";
import { StoryCard } from "@/components/work/StoryCard";
import { services, type ServiceSlug } from "@/content/site";
import { stories, work, type EventStoryFull } from "@/content/stories";
import "@/components/work/pages-motion.css";

type Filter = ServiceSlug | "all";
type Phase = "idle" | "out" | "in";

function isService(v: string | null): v is ServiceSlug {
  return services.some((s) => s.slug === v);
}

function storiesFor(f: Filter): EventStoryFull[] {
  return f === "all" ? stories : stories.filter((s) => s.service === f);
}

const OUT_MS = 180;
const IN_MS = 360;
const STEP_MS = 60;
const MAX_STEPS = 8;

const gridClass = "pm-grid mt-10 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8 lg:mt-14 lg:grid-cols-3 lg:gap-x-12";

function motionAllowed() {
  return document.documentElement.classList.contains("js-motion") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function FilterButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`pm-filter-btn t-button inline-flex min-h-11 shrink-0 items-center border px-5 whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
        pressed ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-copper"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Service filter + story grid. The filter lives in the URL (`?service=<slug>`) so service pages
 * can link straight to a filtered view; changes use router.replace without scrolling.
 */
export function WorkGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("service");
  const fromUrl: Filter = isService(raw) ? raw : "all";
  // The pressed filter answers the click at once; the URL (router.replace) catches up a moment later.
  const [pending, setPending] = useState<Filter | null>(null);
  const active: Filter = pending ?? fromUrl;
  useEffect(() => {
    if (pending === fromUrl) setPending(null);
  }, [pending, fromUrl]);

  const select = useCallback(
    (f: Filter) => {
      setPending(f);
      const next = new URLSearchParams(params.toString());
      if (f === "all") next.delete("service");
      else next.set("service", f);
      const q = next.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return <WorkGridView active={active} onSelect={select} />;
}

/**
 * The filter row and grid for a given filter. Without `onSelect` (the server render, used as the
 * Suspense fallback before the URL is read) it shows every story with "All" pressed.
 *
 * Motion (CSS in components/work/pages-motion.css):
 * - A navy pill with a copper underline slides to the pressed filter (translate + scaleX; placed from the
 *   buttons' offsets). Without JS the pressed button simply has its own navy fill.
 * - Changing the filter: the shown cards fade and shrink out (180ms), then the new set is swapped in and each
 *   card fades up (360ms, 60ms steps). Opacity/transform only; the grid's height changes once, at the swap.
 *   A newer click during the exit restarts the sequence, so nothing is left half-way. No View Transitions:
 *   the site's root view-transition styles are tuned for page cross-fades, and the class sequence is enough.
 * - Card photos wipe in on first scroll-in (this grid's own observer, see below).
 * - Each card is a StoryTrigger: a plain click opens the story viewer over the page (stepping through the
 *   filtered set); modifier clicks and no-JS visits go to /our-work/<slug>.
 */
export function WorkGridView({ active = "all", onSelect }: { active?: Filter; onSelect?: (f: Filter) => void }) {
  const select = (f: Filter) => onSelect?.(f);
  const shown = storiesFor(active);
  const [view, setView] = useState<{ list: EventStoryFull[]; phase: Phase }>({ list: shown, phase: "idle" });
  const row = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const prevActive = useRef(active);

  // Phone: the filter row scrolls sideways, so bring the pressed button into view. (The row has 4px
  // of vertical padding, taken off its top margin, so the scroll box does not clip the focus ring.)
  useEffect(() => {
    const el = row.current;
    const btn = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !btn || el.scrollWidth <= el.clientWidth) return;
    const left = btn.offsetLeft - 20;
    el.scrollTo({ left: Math.max(0, left), behavior: motionAllowed() ? "smooth" : "auto" });
  }, [active]);

  // The sliding pill follows the pressed button (and any change in button sizes, e.g. web fonts loading).
  useLayoutEffect(() => {
    const el = row.current;
    const p = pill.current;
    if (!el || !p) return;
    const place = () => {
      const btn = el.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!btn) return;
      p.style.setProperty("--x", `${btn.offsetLeft}px`);
      p.style.setProperty("--y", `${btn.offsetTop}px`);
      p.style.setProperty("--w", String(btn.offsetWidth));
      p.style.setProperty("--h", `${btn.offsetHeight}px`);
      if (!el.dataset.pill) {
        el.dataset.pill = "on";
        // Enable the slide only after the first placement has painted.
        requestAnimationFrame(() => requestAnimationFrame(() => (el.dataset.pill = "ready")));
      }
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    el.querySelectorAll("button").forEach((b) => ro.observe(b));
    return () => ro.disconnect();
  }, [active]);

  // Filter change: out -> swap -> in -> idle.
  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    const next = storiesFor(active);
    if (!motionAllowed()) {
      setView({ list: next, phase: "idle" });
      return;
    }
    setView((v) => ({ list: v.list, phase: "out" }));
    const t = window.setTimeout(() => setView({ list: next, phase: "in" }), OUT_MS);
    return () => window.clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (view.phase !== "in") return;
    const total = IN_MS + Math.min(view.list.length - 1, MAX_STEPS) * STEP_MS + 40;
    const t = window.setTimeout(() => setView((v) => (v.phase === "in" ? { ...v, phase: "idle" } : v)), total);
    return () => window.clearTimeout(t);
  }, [view]);

  // Photo wipes (data-pm-wipe on each card's frame). This grid runs its own: cards mounted by a filter change,
  // or by the Suspense swap, are never seen by the page-wide reveal observer, and an attribute it sets (not a
  // class) cannot clash with hydration. Frames on screen now are shown at once; the rest wipe in on arrival.
  // The hidden state only applies once the grid carries data-wipes, so nothing blinks before this runs.
  useLayoutEffect(() => {
    const g = grid.current;
    if (!g) return;
    const pending = Array.from(g.querySelectorAll<HTMLElement>("[data-pm-wipe]:not([data-shown])"));
    const vh = window.innerHeight;
    const later: HTMLElement[] = [];
    const instant: HTMLElement[] = [];
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) instant.push(el);
      else later.push(el);
    }
    instant.forEach((el) => {
      el.setAttribute("data-instant", "");
      el.setAttribute("data-shown", "");
    });
    g.setAttribute("data-wipes", "");
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => instant.forEach((el) => el.removeAttribute("data-instant"))),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    later.forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [view.list]);

  const { list, phase } = view;

  return (
    <>
      <div
        ref={row}
        role="group"
        aria-label={work.filterLabel}
        className="pm-filter -mx-5 mt-9 flex gap-2 overflow-x-auto px-5 py-1 [scrollbar-width:none] lg:mx-0 lg:mt-[52px] lg:flex-wrap lg:px-0"
      >
        <span ref={pill} aria-hidden="true" className="pm-pill" />
        <FilterButton pressed={active === "all"} onClick={() => select("all")}>
          {work.allLabel}
        </FilterButton>
        {services.map((s) => (
          <FilterButton key={s.slug} pressed={active === s.slug} onClick={() => select(s.slug)}>
            {s.shortName}
          </FilterButton>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length === 1 ? "1 story" : `${shown.length} stories`}
      </p>
      {list.length === 0 ? (
        <p className="t-body mt-10 text-navy/72">{work.empty}</p>
      ) : (
        // The story viewer steps through the cards on screen, in display order (W9.3). `list` is what is shown,
        // so a card clicked during the filter's exit still opens its own story.
        <StoryViewerProvider stories={list}>
          <ul ref={grid} className={gridClass} data-phase={phase}>
            {list.map((s, i) => (
              <li key={s.slug} style={{ "--k": i } as CSSProperties}>
                <StoryCard story={s} preload={i === 0} />
              </li>
            ))}
          </ul>
        </StoryViewerProvider>
      )}
    </>
  );
}
