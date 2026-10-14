"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { StoryImage } from "@/content/stories";
import { StoryPhoto } from "./StoryPhoto";

/** Desktop columns for the photo set, by photo count (full class names so Tailwind sees them). */
const photoCols: Record<number, string> = { 1: "lg:grid-cols-2", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/**
 * An event story's photo set.
 * Phone: a native scroll-snap swipe row; once JS is ready the photo most in view is "active" and the others
 * shrink and dim (CSS in pages-motion.css, .pm-set). Desktop: a grid whose even photos sit lower; each frame
 * wipes in on first view with a short cascade (data-reveal="wipe", --i) and drifts inside its frame on scroll
 * (data-parallax). The active state is a data attribute, never a className, so the reveal's is-in survives.
 */
export function StoryPhotoSet({ images }: { images: StoryImage[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const sizes =
    images.length <= 2 ? "(min-width: 1320px) 600px, (min-width: 1024px) 46vw, 78vw" : "(min-width: 1320px) 392px, (min-width: 1024px) 30vw, 78vw";

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const slides = Array.from(el.children);
    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target, e.intersectionRatio);
        let best = -1;
        let bestRatio = 0.6;
        slides.forEach((s, i) => {
          const r = ratios.get(s) ?? 0;
          if (r >= bestRatio) {
            best = i;
            bestRatio = r;
          }
        });
        if (best >= 0) setActive(best);
      },
      { root: el, threshold: [0.6, 0.75, 0.9, 1] },
    );
    slides.forEach((s) => io.observe(s));
    setReady(true);
    return () => io.disconnect();
  }, []);

  return (
    <ul
      ref={row}
      data-ready={ready ? "" : undefined}
      className={`pm-set flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] after:block after:w-2 after:shrink-0 after:content-[''] lg:mx-auto lg:grid lg:max-w-[1320px] lg:snap-none ${photoCols[images.length] ?? "lg:grid-cols-3"} lg:items-start lg:gap-12 lg:overflow-visible lg:px-12 lg:after:hidden`}
    >
      {images.map((img, i) => (
        <li
          key={img.src}
          data-active={i === active ? "" : undefined}
          className="relative aspect-[4/5] w-[78vw] max-w-[420px] shrink-0 snap-start bg-mist lg:w-auto lg:max-w-none"
        >
          <div
            data-reveal="wipe"
            data-parallax=""
            data-cursor="view"
            className="absolute inset-0 overflow-hidden"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="parallax-layer">
              <StoryPhoto img={img} sizes={sizes} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
