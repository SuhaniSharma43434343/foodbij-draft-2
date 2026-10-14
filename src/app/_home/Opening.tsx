"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useRef } from "react";
import { ButtonLink } from "@/components/Button";
import { HeroLines } from "@/components/motion/HeroLines";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { PLAN_HREF, home } from "@/content/site";
import "./home-motion-a.css";

/** The copper "/" from the FOODB/Z wordmark, as a line that draws in (.op-slash) or sits still. */
export function CopperSlash({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 30" className={className} focusable="false">
      <line x1="1.5" y1="28.5" x2="14.5" y2="1.5" pathLength={1} />
    </svg>
  );
}

/**
 * Home opening. The overlay header sits on top of it; data-hide-sticky (on the stage) keeps the phone bar away.
 * Phone: the photo fills the top ~74% and fades into solid navy, so the text sits on navy.
 * Laptop: full-bleed, photo mirrored so the slate and tartlets sit in the right ~55% of the frame,
 * with a left-to-right navy shade so the headline sits on dark, never on food.
 *
 * Motion (W7, CSS in home-motion-a.css):
 * - First paint, pure CSS: the copper slash draws in, headline lines rise through masks, lead, rule and button
 *   follow, the photo settles from 1.08 over 2.4s.
 * - Scroll (only with html.js-motion and no reduced motion): the section grows to 180svh / 200vh and the stage
 *   pins; as --p goes 0 -> 1 the text drifts up and fades, the photo pulls back into a framed plate on navy
 *   (centred on desktop), and the dish caption fades in under it. At --p 0 it is the approved first screen.
 */
export function Opening() {
  const { headline, lead, cta, image } = home.opening;
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { mode: "pin" });
  return (
    <section ref={ref} aria-label="Opening" className="op hero-scope relative bg-navy text-white">
      <div data-hide-sticky className="op-stage relative h-[100svh] min-h-[560px] overflow-hidden lg:min-h-[640px]">
        {/* Laptop: the photo box starts at 44% from the left and is lifted 10%, mirrored, so the slate sits in the
            right part of the frame and the left of the screen stays navy for the text. */}
        <div className="op-frame absolute inset-x-0 top-0 bottom-[26%] lg:-top-[10%] lg:bottom-[10%] lg:left-[44%]">
          <div className="op-plate absolute inset-0">
            <div className="hero-parallax">
              <div className="hero-zoom">
                <Image
                  src={image.src}
                  style={photoStyle(image.src)}
                  alt={image.alt}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover object-[40%_50%] lg:-scale-x-100 lg:object-[0%_50%]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Phone: top shade for the header, then fade to navy. Laptop: top and bottom shades, plus a
            navy fade over the photo's left edge (rgba 0.75 at the text, clear by ~55% of the screen). */}
        <div
          aria-hidden="true"
          className="op-shade absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,28,45,0.5)_0%,rgba(11,28,45,0)_20%,rgba(11,28,45,0)_36%,rgba(11,28,45,0.85)_58%,#0B1C2D_72%)] lg:bg-[linear-gradient(to_bottom,rgba(11,28,45,0.5)_0%,rgba(11,28,45,0)_22%,rgba(11,28,45,0)_55%,rgba(11,28,45,0.7)_80%,#0B1C2D_90%),linear-gradient(to_right,#0B1C2D_0%,#0B1C2D_44%,rgba(11,28,45,0.75)_48%,rgba(11,28,45,0)_58%)]"
        />
        {/* Shown only while scrubbing: the dish, named under the framed plate (the photo's own alt text). */}
        <p aria-hidden="true" className="op-caption">
          <CopperSlash className="op-caption-slash" />
          <span>{image.alt}</span>
        </p>
        <div className="op-text site-container absolute inset-x-0 bottom-0 pb-14 lg:pb-24">
          <CopperSlash className="op-slash" />
          <h1 className="t-display-xl max-w-[18ch] lg:max-w-[min(22ch,900px)]">
            <HeroLines text={headline} />
          </h1>
          <p className="hero-fade t-lead mt-5 max-w-[34ch] lg:max-w-[44ch]">{lead}</p>
          <span aria-hidden="true" className="copper-rule hero-rule mt-6" style={{ "--d": "520ms" } as React.CSSProperties} />
          <ButtonLink href={PLAN_HREF} className="hero-fade mt-6 [--d:440ms]">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
