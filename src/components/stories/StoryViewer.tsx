"use client";

/**
 * Story viewer (W9.1): an Instagram-style, full-screen viewer for event stories. Phone first; on desktop
 * (>= 768px) the story is a tall 9:16 panel centred on a dimmed navy backdrop with prev/next arrow buttons.
 *
 * API (used by the homepage cards in src/app/_home/EventStories.tsx; Our work can adopt it as is):
 *
 *   import { StoryViewerProvider, StoryTrigger } from "@/components/stories/StoryViewer";
 *
 *   // `stories` = the set the viewer steps through, in order (EventStoryFull[] from src/content/stories.ts).
 *   // After the last photo of one story the viewer moves to the next story in this set; after the last it closes.
 *   <StoryViewerProvider stories={list}>
 *     {list.map((s) => (
 *       <StoryTrigger key={s.slug} slug={s.slug} className="group block">
 *         ...card markup (put the photo frame in a `.story-ring` element for the thin copper ring)...
 *       </StoryTrigger>
 *     ))}
 *   </StoryViewerProvider>
 *
 *   - <StoryTrigger slug> renders a real next/link to /our-work/<slug> (override with `href`), so without JS
 *     it is a plain link. With JS a normal click opens the viewer instead; modifier/middle clicks open the page.
 *     It carries data-cursor="view" (the copper cursor reads "View") and data-no-curtain (no page curtain).
 *   - For a custom trigger: `const viewer = useStoryViewer(); viewer?.open(slug, buttonElement)`. The element
 *     passed gets focus back when the viewer closes. `useStoryViewer()` is null outside a provider.
 *
 * Behaviour
 * - Photos one at a time (object-cover, honouring each image's `crop`); one progress segment per photo; the
 *   current one fills over 5s and auto-advances. Paused while a pointer/finger is held down, while the tab is
 *   hidden, or with the Pause button. Only the current photo, the next one and the next story's first are loaded.
 * - Tap/click the left third = previous photo, elsewhere = next photo. Swipe left/right = next/previous story
 *   (the panel follows the finger, then slides). Swipe down = close (follows the finger and fades).
 * - Keys: Esc closes, Left/Right = previous/next photo, Tab stays inside. Focus goes to the close button on
 *   open and back to the trigger on close (without scrolling). Page scroll is locked while open; setting
 *   html[data-scroll-lock] also stops Lenis (MotionProvider listens for it) and hides the copper cursor.
 * - No brief text here: the [NEEDS CLIENT] brief stays on the story page ("Read the story").
 * - Reduced motion: no auto-advance (static segments; tap or use the arrows), no slide/fade transitions,
 *   swipe gestures still work but switch instantly.
 */

import Image from "next/image";
import { photoStyle, zoomSizes } from "@/components/media/photo-bg";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { PLAN_HREF, services } from "@/content/site";
import type { EventStoryFull, StoryImage } from "@/content/stories";
import "./story-viewer.css";

/** Time per photo. */
const PHOTO_MS = 5000;
/** A press shorter than this (and without movement) is a tap; longer is a hold (pause). */
const TAP_MS = 280;
const AXIS_LOCK_PX = 10;
const CLOSE_ANIM_MS = 220;

type StoryViewerApi = {
  open: (slug: string, opener?: HTMLElement | null) => void;
  close: () => void;
  isOpen: boolean;
};

const StoryViewerContext = createContext<StoryViewerApi | null>(null);

/** The viewer API, or null outside a <StoryViewerProvider>. */
export function useStoryViewer() {
  return useContext(StoryViewerContext);
}

function serviceLabel(slug: EventStoryFull["service"]) {
  return services.find((s) => s.slug === slug)?.name ?? "";
}

function storyHref(slug: string) {
  return `/our-work/${slug}`;
}

export function StoryViewerProvider({ stories, children }: { stories: EventStoryFull[]; children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(
    (slug: string, el?: HTMLElement | null) => {
      const i = stories.findIndex((s) => s.slug === slug);
      if (i < 0) return;
      opener.current = el ?? (document.activeElement as HTMLElement | null);
      setOpenIndex(i);
    },
    [stories],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    const el = opener.current;
    opener.current = null;
    // After React has removed the dialog.
    requestAnimationFrame(() => el?.focus({ preventScroll: true }));
  }, []);

  const api = useMemo(() => ({ open, close, isOpen: openIndex !== null }), [open, close, openIndex]);

  return (
    <StoryViewerContext.Provider value={api}>
      {children}
      {openIndex !== null &&
        createPortal(<StoryViewer stories={stories} startIndex={openIndex} onClose={close} />, document.body)}
    </StoryViewerContext.Provider>
  );
}

type StoryTriggerProps = {
  slug: string;
  /** Defaults to /our-work/<slug>. */
  href?: string;
  className?: string;
  children: ReactNode;
};

/** A real link to the story page that opens the viewer on a plain click when a provider is present. */
export function StoryTrigger({ slug, href, className, children }: StoryTriggerProps) {
  const viewer = useStoryViewer();
  const onClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!viewer || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    viewer.open(slug, e.currentTarget);
  };
  return (
    <Link
      href={href ?? storyHref(slug)}
      className={className}
      onClick={onClick}
      data-cursor="view"
      data-no-curtain={viewer ? "" : undefined}
      data-story-trigger={slug}
    >
      {children}
    </Link>
  );
}

// ------------------------------------------------------------------------------------------------ hooks

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Lock page scroll (and Lenis via html[data-scroll-lock]) while mounted; scroll position is untouched. */
function useScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - html.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    html.setAttribute("data-scroll-lock", "");
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      html.removeAttribute("data-scroll-lock");
    };
  }, []);
}

// ------------------------------------------------------------------------------------------------ pieces

function Photo({ img, eager, hidden }: { img: StoryImage; eager: boolean; hidden?: boolean }) {
  const zoom = img.crop?.zoom ?? 1;
  return (
    <div className="sv-photo" data-next={hidden ? "" : undefined} aria-hidden={hidden || undefined}>
      <div className="absolute inset-x-0 bottom-0" style={{ height: `${zoom * 100}%` }}>
        <Image
          src={img.src}
          alt={hidden ? "" : img.alt}
          fill
          sizes={zoomSizes("(min-width: 768px) 56vh, 100vw", zoom)}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          className="object-cover"
          style={photoStyle(img.src, img.crop?.position ? { objectPosition: img.crop.position } : undefined)}
        />
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M1.5 1.5v13L13 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M3.5 1v14M10.5 1v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" aria-hidden="true">
      <path d={dir === "left" ? "M11 1L1 11l10 10" : "M1 1l10 10L1 21"} stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ------------------------------------------------------------------------------------------------ viewer

type Pos = { s: number; i: number; enter: "next" | "prev" | null; run: number };

function StoryViewer({
  stories,
  startIndex,
  onClose,
}: {
  stories: EventStoryFull[];
  startIndex: number;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  useScrollLock();

  const [pos, setPos] = useState<Pos>({ s: startIndex, i: 0, enter: null, run: 0 });
  const [held, setHeld] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [closing, setClosing] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const story = stories[pos.s];
  const imgs = story.images;
  const paused = held || tabHidden || userPaused || closing;

  const closingRef = useRef(false);
  const finish = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (reduce) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, CLOSE_ANIM_MS);
  }, [reduce, onClose]);

  // Navigation reads the latest position from a ref so no side effects run inside state updaters.
  const posRef = useRef(pos);
  posRef.current = pos;
  const go = useCallback((p: Pos) => {
    posRef.current = p;
    setPos(p);
  }, []);

  const nextPhoto = useCallback(() => {
    const p = posRef.current;
    if (p.i < stories[p.s].images.length - 1) go({ ...p, i: p.i + 1, enter: null });
    else if (p.s < stories.length - 1) go({ s: p.s + 1, i: 0, enter: "next", run: p.run + 1 });
    else finish();
  }, [stories, finish, go]);

  const prevPhoto = useCallback(() => {
    const p = posRef.current;
    if (p.i > 0) go({ ...p, i: p.i - 1, enter: null });
    else if (p.s > 0) go({ s: p.s - 1, i: stories[p.s - 1].images.length - 1, enter: "prev", run: p.run + 1 });
    else go({ ...p, run: p.run + 1, enter: null }); // first photo of the first story: restart it
  }, [stories, go]);

  const nextStory = useCallback(() => {
    const p = posRef.current;
    if (p.s < stories.length - 1) go({ s: p.s + 1, i: 0, enter: "next", run: p.run + 1 });
    else finish();
  }, [stories, finish, go]);

  const prevStory = useCallback(() => {
    const p = posRef.current;
    if (p.s > 0) go({ s: p.s - 1, i: 0, enter: "prev", run: p.run + 1 });
    else go({ ...p, i: 0, run: p.run + 1, enter: null });
  }, [stories, go]);

  // Focus in on open.
  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
  }, []);

  // Keys: Esc, arrows, Tab trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPhoto();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPhoto();
        return;
      }
      if (e.key !== "Tab" || !root.current) return;
      const focusable = Array.from(
        root.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!root.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish, nextPhoto, prevPhoto]);

  // Pause while the tab is hidden.
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // ---------------------------------------------------------------- gestures (pointer events: touch and mouse)
  const g = useRef<{ id: number; x: number; y: number; t: number; axis: "x" | "y" | null; dx: number; dy: number } | null>(
    null,
  );

  const setDrag = (dx: number, dy: number, axis: "x" | "y" | null) => {
    const p = panel.current;
    const r = root.current;
    if (!p || !r) return;
    if (reduce || axis === null) {
      p.style.transform = "";
      r.style.removeProperty("--sv-dim");
      return;
    }
    if (axis === "x") {
      p.style.transform = `translate3d(${dx * 0.6}px, 0, 0)`;
      r.style.removeProperty("--sv-dim");
    } else {
      const down = Math.max(0, dy);
      p.style.transform = `translate3d(0, ${down}px, 0) scale(${1 - Math.min(down / 1600, 0.12)})`;
      r.style.setProperty("--sv-dim", String(Math.max(0, 1 - down / 420)));
    }
  };

  const resetDrag = (animate: boolean) => {
    const p = panel.current;
    const r = root.current;
    if (!p || !r) return;
    if (animate && !reduce) {
      p.classList.add("sv-snap");
      window.setTimeout(() => p.classList.remove("sv-snap"), 260);
    }
    p.style.transform = "";
    r.style.removeProperty("--sv-dim");
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as Element).closest("a, button")) return;
    g.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), axis: null, dx: 0, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setHeld(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (!s || s.id !== e.pointerId) return;
    s.dx = e.clientX - s.x;
    s.dy = e.clientY - s.y;
    if (!s.axis && Math.hypot(s.dx, s.dy) > AXIS_LOCK_PX) s.axis = Math.abs(s.dx) > Math.abs(s.dy) ? "x" : "y";
    setDrag(s.dx, s.dy, s.axis);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (!s || s.id !== e.pointerId) return;
    g.current = null;
    setHeld(false);
    const width = panel.current?.clientWidth ?? window.innerWidth;
    const dt = performance.now() - s.t;
    if (s.axis === "x") {
      const fast = Math.abs(s.dx) / dt > 0.5;
      if (Math.abs(s.dx) > Math.min(90, width * 0.22) || (fast && Math.abs(s.dx) > 30)) {
        resetDrag(false);
        if (s.dx < 0) nextStory();
        else prevStory();
      } else resetDrag(true);
      return;
    }
    if (s.axis === "y") {
      if (s.dy > 110 || (s.dy > 40 && s.dy / dt > 0.6)) {
        if (!reduce) setDrag(0, Math.max(s.dy, 160), "y");
        finish();
      } else resetDrag(true);
      return;
    }
    if (dt < TAP_MS) {
      const rect = panel.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : e.clientX;
      if (x < (rect?.width ?? width) / 3) prevPhoto();
      else nextPhoto();
    }
  };

  const onPointerCancel = () => {
    g.current = null;
    setHeld(false);
    resetDrag(true);
  };

  // The photo after the current one (possibly the next story's first), preloaded; plus the next story's first
  // photo while inside a story, so a swipe to the next story lands on a loaded photo. Nothing else loads.
  const upcoming: StoryImage | undefined =
    pos.i < imgs.length - 1 ? imgs[pos.i + 1] : stories[pos.s + 1]?.images[0];
  const nextStoryFirst: StoryImage | undefined = pos.i < imgs.length - 1 ? stories[pos.s + 1]?.images[0] : undefined;

  const label = serviceLabel(story.service);
  const href = storyHref(story.slug);

  return (
    <div
      ref={root}
      className="sv-root"
      role="dialog"
      aria-modal="true"
      aria-label={story.title}
      data-paused={paused ? "" : undefined}
      data-closing={closing ? "" : undefined}
      data-reduce={reduce ? "" : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) finish(); // desktop: click on the dimmed backdrop
      }}
    >
      <button type="button" className="sv-arrow sv-arrow-prev" aria-label="Previous photo" onClick={prevPhoto}>
        <Chevron dir="left" />
      </button>

      <div
        ref={panel}
        className="sv-panel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div key={`${story.slug}-${pos.run}`} className="sv-story" data-enter={pos.enter ?? undefined}>
          <Photo key={imgs[pos.i].src} img={imgs[pos.i]} eager />
          {upcoming && <Photo key={`next-${upcoming.src}`} img={upcoming} eager hidden />}
          {nextStoryFirst && nextStoryFirst.src !== upcoming?.src && (
            <Photo key={`story-${nextStoryFirst.src}`} img={nextStoryFirst} eager hidden />
          )}

          <div className="sv-top">
            <div className="sv-bars" aria-hidden="true">
              {imgs.map((img, n) => (
                <span key={img.src} className="sv-bar">
                  {n < pos.i || (n === pos.i && reduce) ? (
                    <span className="sv-fill" data-state="done" />
                  ) : n === pos.i ? (
                    <span
                      key={`${pos.run}-${pos.i}`}
                      className="sv-fill"
                      data-state="run"
                      style={{ animationDuration: `${PHOTO_MS}ms` }}
                      onAnimationEnd={nextPhoto}
                    />
                  ) : null}
                </span>
              ))}
            </div>
            <div className="sv-controls">
              <p className="t-label sv-count" aria-live="polite">
                <span className="sr-only">{story.title}, photo </span>
                {pos.i + 1} / {imgs.length}
              </p>
              {!reduce && (
                <button
                  type="button"
                  className="sv-icon-btn"
                  aria-label={userPaused ? "Play" : "Pause"}
                  onClick={() => setUserPaused((v) => !v)}
                >
                  <PauseIcon paused={userPaused} />
                </button>
              )}
              <button ref={closeBtn} type="button" className="sv-icon-btn" aria-label="Close" onClick={finish}>
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="sv-caption">
            <p className="t-label text-copper">{label}</p>
            <h2 className="mt-2 font-display text-[2rem] leading-[1.08] font-medium text-white">{story.title}</h2>
            <p className="t-body mt-3 text-white/85">{story.whatWeMade}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6">
              <Link href={href} className="sv-link t-button">
                Read the story
              </Link>
              <Link href={PLAN_HREF} className="sv-link-small">
                Plan your event
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="sv-arrow sv-arrow-next" aria-label="Next photo" onClick={nextPhoto}>
        <Chevron dir="right" />
      </button>
    </div>
  );
}
