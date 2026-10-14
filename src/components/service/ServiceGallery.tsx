"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Grain } from "@/components/motion/Grain";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import type { Img } from "@/content/site";
// Shared styles with the homepage food band (.fg-*): phone active-scale carousel, desktop pinned row.
import "@/app/_home/gallery-motion.css";

/** Art direction for one photo: `zoom` > 1 enlarges it in its frame, anchored to the bottom; `position` is object-position. */
export type GalleryCrop = { zoom?: number; position?: string };

type Props = { id: string; label: string; heading: string; images: Img[]; crops?: Record<string, GalleryCrop> };

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
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The service page food band, same behaviour as the homepage gallery (src/app/_home/gallery/GalleryMotion.tsx)
 * plus per-photo crops and a page-specific heading id:
 * - Desktop (>=1024px, JS + motion allowed): the band pins, the row travels sideways with --p
 *   (useScrollProgress), each photo drifts against its frame, a copper line fills along the bottom.
 * - Phone: native scroll-snap carousel; the centred slide is full size, its neighbours scale down and dim;
 *   "01 / 05" counter below.
 * - No JS / reduced motion: static asymmetric grid on desktop, plain swipe row on phone.
 */
export function ServiceGallery({ id, label, heading, images, crops = {} }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);

  useScrollProgress(sectionRef);

  // Load the photos eagerly once the band is close (they sit in horizontally clipped rows).
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

  // Desktop: measure travel (row overflow), section height and each frame's centre progress (--c).
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

  // Phone carousel: the slide most in view (>= 60% of the row) is active.
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
    <section ref={sectionRef} aria-labelledby={`${id}-food`} className="fg bg-navy text-white" data-ready={ready ? "" : undefined}>
      <Grain />
      <div className="fg-pin">
        <div ref={trackRef} className="fg-track">
          <div className="fg-intro" data-reveal-stagger="">
            <p className="t-label text-copper">{label}</p>
            <h2 id={`${id}-food`} className="fg-title t-display-m mt-4 text-balance text-white">
              {heading}
            </h2>
          </div>
          <ul ref={rowRef} aria-label="Food photographs" className="fg-row">
            {images.map((img, i) => {
              const crop = crops[img.src];
              const zoom = crop?.zoom ?? 1;
              return (
                <li key={img.src} data-frame="" className={`fg-slide${i === active ? " is-active" : ""}`} style={{ "--i": i } as CSSProperties}>
                  <div className="fg-media">
                    <div className="absolute inset-x-0 bottom-0" style={{ height: `${zoom * 100}%` }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={sizes[i % sizes.length]}
                        loading={near ? "eager" : "lazy"}
                        className="object-cover"
                        style={crop?.position ? { objectPosition: crop.position } : undefined}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="fg-ui" aria-hidden="true">
          <span className="fg-count t-label">
            {pad(active + 1)} / {pad(images.length)}
          </span>
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
