"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Grain } from "@/components/motion/Grain";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

type Img = { src: string; alt: string };
type Props = { heading: string; images: Img[] };

// next/image sizes per frame position: phone slides are 78vw; desktop is the larger of the static grid
// column and the pinned frame (the pinned photo is 115% of its frame for the counter-parallax).
const sizes = [
  "(min-width: 1024px) 58vw, 78vw",
  "(min-width: 1024px) 32vw, 78vw",
  "(min-width: 1024px) 60vw, 78vw",
  "(min-width: 1024px) 42vw, 78vw",
  "(min-width: 1024px) 34vw, 78vw",
  "(min-width: 1024px) 62vw, 78vw",
];

const DESKTOP = "(min-width: 1024px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

export function GalleryMotion({ heading, images }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);

  // Desktop pin: --p from the shared primitive drives the row's translateX in CSS.
  useScrollProgress(sectionRef);

  // Load the photos eagerly once the band is close: they sit in horizontally clipped rows, where
  // native lazy loading would only start as each frame slides into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Desktop: measure the row once on mount and on resize. --travel = how far the row moves,
  // --fg-h = section height (100vh + travel), --c per frame = the progress at which it is centred.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia(REDUCED);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const on = desktop.matches && !reduced.matches && document.documentElement.classList.contains("js-motion");
      if (!on) {
        section.style.removeProperty("--travel");
        section.style.removeProperty("--fg-h");
        return;
      }
      const vw = document.documentElement.clientWidth;
      const travel = Math.max(0, track.scrollWidth - vw);
      section.style.setProperty("--travel", `${travel}px`);
      section.style.setProperty("--fg-h", `${window.innerHeight + travel}px`);
      const t = track.getBoundingClientRect();
      track.querySelectorAll<HTMLElement>("[data-frame]").forEach((li) => {
        const r = li.getBoundingClientRect();
        const centre = r.left - t.left + r.width / 2;
        li.style.setProperty("--c", travel ? ((centre - vw / 2) / travel).toFixed(4) : "0");
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("resize", schedule, { passive: true });
    desktop.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  // Phone carousel: the slide most in view (>= 60% of the row) is active. Native scrolling only.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ratios = new Map<Element, number>();
    const slides = Array.from(row.children);
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
      { root: row, threshold: [0.6, 0.75, 0.9, 1] },
    );
    slides.forEach((s) => io.observe(s));
    setReady(true);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="food-title"
      className="fg bg-navy text-white"
      data-ready={ready ? "" : undefined}
    >
      <Grain />
      <div className="fg-pin">
        <div ref={trackRef} className="fg-track">
          <div className="fg-intro" data-reveal-stagger="">
            <h2 id="food-title" className="fg-title t-display-m text-white">
              {heading}
            </h2>
          </div>
          <ul ref={rowRef} aria-label="Food photographs" className="fg-row">
            {images.map((img, i) => (
              <li
                key={img.src}
                data-frame=""
                className={`fg-slide${i === active ? " is-active" : ""}`}
                style={{ "--i": i } as CSSProperties}
              >
                <div className="fg-media">
                  <Image
                    src={img.src}
                    style={photoStyle(img.src)}
                    alt={img.alt}
                    fill
                    sizes={sizes[i % sizes.length]}
                    loading={near ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="fg-ui" aria-hidden="true">
          <span className="fg-dots">
            {images.map((img, i) => (
              <span key={img.src} className={i === active ? "is-on" : undefined} />
            ))}
          </span>
        </div>
        <div className="fg-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
