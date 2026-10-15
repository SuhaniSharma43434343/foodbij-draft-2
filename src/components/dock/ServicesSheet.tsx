"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/site";
import "./dock.css";

/** Matches the sheet's CSS transition. */
const SHEET_MS = 320;
/** Drag further than this (px), or flick faster than FLICK (px/ms), and the sheet closes. */
const CLOSE_DISTANCE = 90;
const FLICK = 0.5;

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

type ServicesSheetProps = {
  id: string;
  open: boolean;
  /** `returnFocus` is false when a link inside was chosen (the page is about to change). */
  onClose: (returnFocus: boolean) => void;
};

/**
 * Bottom sheet listing the four services (opened from the thumb dock's "Services" button).
 * - role="dialog", aria-modal, labelled "Services"; focus moves to the close button, Tab stays inside, Esc closes.
 * - Closes on the X (44px), a tap on the backdrop, Esc, or a downward swipe (from the handle/header anywhere,
 *   or from the list when it is scrolled to the top).
 * - While open: page scroll locked and Lenis paused (html[data-scroll-lock], which also hides the copper cursor).
 * - Rises 320ms ease-out; instant under reduced motion. Links close it before navigating (the curtain then plays).
 */
export function ServicesSheet({ id, open, onClose }: ServicesSheetProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Mount, then flip data-open on the next frame so the rise animates; on close, unmount after the fall.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setMounted(false), reduce ? 0 : SHEET_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  // Focus moves to the close button once the sheet is on screen (it is display:none until mounted).
  useEffect(() => {
    if (shown) closeButton.current?.focus({ preventScroll: true });
  }, [shown]);

  // Scroll lock, Lenis pause, Esc, Tab trap, close at desktop width.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    html.setAttribute("data-scroll-lock", "");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current(true);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!panel.current.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) onCloseRef.current(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      html.removeAttribute("data-scroll-lock");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Close if the route changes underneath (e.g. back button).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    onCloseRef.current(false);
  }, [pathname]);

  // Swipe down to close. Native listeners so touchmove can be non-passive (stops the page bouncing while dragging).
  useEffect(() => {
    const node = panel.current;
    const rootNode = root.current;
    if (!mounted || !node || !rootNode) return;
    let startY = 0;
    let startT = 0;
    let dy = 0;
    let candidate = false;
    let dragging = false;

    const setDrag = (px: number) => node.style.setProperty("--drag", `${px}px`);
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const fromHead = (e.target as Element).closest(".sheet-head");
      candidate = Boolean(fromHead) || (list.current?.scrollTop ?? 0) <= 0;
      startY = e.touches[0].clientY;
      startT = e.timeStamp;
      dy = 0;
      dragging = false;
    };
    const onMove = (e: TouchEvent) => {
      if (!candidate) return;
      dy = e.touches[0].clientY - startY;
      if (!dragging) {
        if (dy < -4) {
          candidate = false; // scrolling the list up: leave it to the browser
          return;
        }
        if (dy < 6) return;
        dragging = true;
        rootNode.setAttribute("data-dragging", "");
      }
      e.preventDefault();
      setDrag(Math.max(0, dy));
    };
    const onEnd = (e: TouchEvent) => {
      if (!dragging) {
        candidate = false;
        return;
      }
      const velocity = dy / Math.max(1, e.timeStamp - startT);
      rootNode.removeAttribute("data-dragging");
      dragging = false;
      candidate = false;
      if (dy > CLOSE_DISTANCE || (dy > 30 && velocity > FLICK)) {
        onCloseRef.current(true);
        window.setTimeout(() => setDrag(0), SHEET_MS);
      } else {
        setDrag(0);
      }
    };
    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchmove", onMove, { passive: false });
    node.addEventListener("touchend", onEnd);
    node.addEventListener("touchcancel", onEnd);
    return () => {
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchmove", onMove);
      node.removeEventListener("touchend", onEnd);
      node.removeEventListener("touchcancel", onEnd);
    };
  }, [mounted]);

  return (
    <div ref={root} className="sheet-root lg:hidden" hidden={!mounted} data-open={shown ? "" : undefined}>
      <div className="sheet-backdrop" aria-hidden="true" onClick={() => onClose(true)} />
      <div
        ref={panel}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="sheet-panel"
      >
        <div className="sheet-head">
          <span className="sheet-handle" aria-hidden="true" />
          <div className="site-container flex items-center justify-between pt-2 pb-2">
            <h2 id={`${id}-title`} className="t-label">
              Services
            </h2>
            <button
              ref={closeButton}
              type="button"
              aria-label="Close services"
              onClick={() => onClose(true)}
              className="-mr-3 inline-flex size-11 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <ul ref={list} className="sheet-list site-container border-t border-navy/12 pb-4">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-navy/12">
              <Link
                href={s.href}
                onClick={() => onClose(false)}
                aria-current={pathname === s.href ? "page" : undefined}
                className="sheet-row"
              >
                <Image src={s.heroImage.src} style={photoStyle(s.heroImage.src)} alt="" width={64} height={80} sizes="64px" className="sheet-thumb" />
                <span className="min-w-0 font-display text-[1.5rem] leading-[1.1] font-medium">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
