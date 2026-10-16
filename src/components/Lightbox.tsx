"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as RPointerEvent,
} from "react";
import { createPortal, flushSync } from "react-dom";
import type { Img } from "@/content/site";

type Ctx = {
  count: number;
  open: (index: number, trigger: HTMLElement) => void;
  register: (index: number, el: HTMLElement | null) => void;
};

const LightboxContext = createContext<Ctx | null>(null);

const VT_NAME = "lb-photo";
const canMorph = () =>
  typeof document !== "undefined" &&
  "startViewTransition" in document &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const frameOf = (el: HTMLElement) => el.querySelector<HTMLElement>(".frame") ?? el;
const inView = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
};

/**
 * An expanded view for a set of photographs. The photo grows out of the one that was clicked (a view
 * transition where supported, a fade elsewhere), then arrows, swipes and the keyboard step through the
 * set. Escape, the close button or a downward swipe return to the page, and focus goes back to the photo.
 */
export function LightboxScope({ images, label, children }: { images: Img[]; label: string; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [step, setStep] = useState(0); // direction of the last step, for the slide-in
  const triggers = useRef(new Map<number, HTMLElement>());
  const lastTrigger = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;

  const register = useCallback((i: number, el: HTMLElement | null) => {
    if (el) triggers.current.set(i, el);
    else triggers.current.delete(i);
  }, []);

  const open = useCallback((i: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setStep(0);
    if (!canMorph()) {
      setIndex(i);
      return;
    }
    const frame = frameOf(trigger);
    frame.style.viewTransitionName = VT_NAME;
    const t = document.startViewTransition(async () => {
      frame.style.viewTransitionName = "";
      flushSync(() => setIndex(i));
      const img = imgRef.current;
      if (img) {
        img.style.viewTransitionName = VT_NAME;
        // Give the larger file a moment to decode so the photo does not morph into an empty box.
        await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 450))]);
      }
    });
    t.finished.finally(() => {
      if (imgRef.current) imgRef.current.style.viewTransitionName = "";
    });
  }, []);

  const close = useCallback(() => {
    if (index === null) return;
    const trigger = triggers.current.get(index) ?? lastTrigger.current;
    const frame = trigger ? frameOf(trigger) : null;
    const done = () => {
      trigger?.focus({ preventScroll: true });
    };
    if (!canMorph() || !frame || !imgRef.current || !inView(frame)) {
      setIndex(null);
      done();
      return;
    }
    imgRef.current.style.viewTransitionName = VT_NAME;
    const t = document.startViewTransition(() => {
      if (imgRef.current) imgRef.current.style.viewTransitionName = "";
      flushSync(() => setIndex(null));
      frame.style.viewTransitionName = VT_NAME;
    });
    t.finished.finally(() => {
      frame.style.viewTransitionName = "";
    });
    done();
  }, [index]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setStep(dir);
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));
    },
    [images.length],
  );

  // While open: lock page scroll, keep focus inside, keys for close and stepping.
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("menu-open");
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "Tab") {
        const f = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, go]);

  // Swipe: left/right to step, down to close. Taps on the dark area outside the photo close it.
  const onPointerDown = (e: RPointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: RPointerEvent) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) close();
  };

  const current = index === null ? null : images[index];

  return (
    <LightboxContext.Provider value={{ count: images.length, open, register }}>
      {children}
      {current &&
        createPortal(
          <div
            ref={dialogRef}
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <figure className="lb-figure" key={index} style={{ "--lb-from": `${step * 32}px` } as React.CSSProperties}>
              <Image
                ref={imgRef}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 80vw, 96vw"
                className="lb-img"
                loading="eager"
                style={{ objectPosition: "50% 50%" }}
              />
            </figure>
            <p className="lb-count t-meta" aria-live="polite">
              {index! + 1} / {images.length}
            </p>
            <button ref={closeRef} type="button" className="lb-btn lb-close" onClick={close} aria-label="Close">
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
            {images.length > 1 && (
              <>
                <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous photograph">
                  <span className="arrow rotate-180" aria-hidden="true" />
                </button>
                <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next photograph">
                  <span className="arrow" aria-hidden="true" />
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </LightboxContext.Provider>
  );
}

/** Makes a photograph open in the surrounding LightboxScope. Without a scope it renders the photo as is. */
export function LightboxTrigger({
  index,
  alt,
  className = "",
  children,
}: {
  index: number;
  alt: string;
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(LightboxContext);
  const ref = useRef<HTMLButtonElement>(null);
  const register = ctx?.register;
  useEffect(() => {
    if (!register) return;
    register(index, ref.current);
    return () => register(index, null);
  }, [index, register]);
  if (!ctx) return <div className={className}>{children}</div>;
  return (
    <button
      ref={ref}
      type="button"
      className={`lb-trigger lift ${className}`}
      onClick={(e) => ctx.open(index, e.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`View larger: ${alt}`}
    >
      {children}
      <span className="lb-plus" aria-hidden="true" />
    </button>
  );
}
