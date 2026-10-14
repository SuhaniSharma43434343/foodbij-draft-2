"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useRef, type CSSProperties } from "react";
import { ButtonLink } from "@/components/Button";
import { Grain } from "@/components/motion/Grain";
import { HeroLines } from "@/components/motion/HeroLines";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import type { Img } from "@/content/site";
import { CopperSlash } from "./CopperSlash";

type Props = { id: string; headline: string; line: string; cta: string; href: string; image: Img };

/**
 * Service hero, the homepage opening's language on a shorter pin (CSS: service-motion.css, `.sh-*`).
 * - First paint, pure CSS: copper slash draws in, the service name rises through its mask (from a
 *   visible state), line, rule and button fade up, the photo settles from 1.08.
 * - Scroll (html.js-motion + motion allowed): the section grows to 150svh / 170vh, the stage pins, and
 *   as --p goes 0 -> 1 the text drifts up and out while the photo frames itself into a plate on navy.
 * - No JS / reduced motion: the static first screen (100svh), nothing pinned.
 * data-hide-sticky sits on the stage, so the phone Plan bar stays away while the hero is on screen.
 */
export function ServiceHero({ id, headline, line, cta, href, image }: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { mode: "pin" });
  return (
    <section ref={ref} aria-labelledby={`${id}-title`} className="sh hero-scope relative bg-navy text-white">
      <div data-hide-sticky className="sh-stage relative h-[100svh] min-h-[600px] overflow-hidden lg:min-h-[680px]">
        <div className="sh-frame absolute inset-x-0 top-0 bottom-[30%] lg:bottom-0 lg:left-[30%]">
          <div className="sh-plate absolute inset-0">
            <div className="hero-parallax">
              <div className="hero-zoom">
                <Image
                  src={image.src}
                  style={photoStyle(image.src)}
                  alt={image.alt}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover object-[50%_60%]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="sh-shade absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,28,45,0.55)_0%,rgba(11,28,45,0)_18%,rgba(11,28,45,0)_34%,rgba(11,28,45,0.85)_56%,#0B1C2D_70%)] lg:bg-[linear-gradient(to_bottom,rgba(11,28,45,0.55)_0%,rgba(11,28,45,0)_20%),linear-gradient(to_right,#0B1C2D_30%,rgba(11,28,45,0.6)_45%,rgba(11,28,45,0)_62%)]"
        />
        <Grain />
        {/* Shown only while scrubbing: the photo named under the framed plate (its own alt text). */}
        <p aria-hidden="true" className="sh-caption">
          <CopperSlash className="sh-caption-slash" />
          <span>{image.alt}</span>
        </p>
        <div className="sh-text site-container absolute inset-x-0 bottom-0 pb-12 lg:pb-24">
          <CopperSlash className="sh-slash" />
          <h1 id={`${id}-title`} className="t-display-l max-w-[14ch]">
            <HeroLines lines={[headline]} />
          </h1>
          <p className="hero-fade t-lead mt-4 max-w-[34ch] text-white/88 lg:mt-5 lg:max-w-[30ch]">{line}</p>
          <span aria-hidden="true" className="copper-rule hero-rule mt-6" style={{ "--d": "520ms" } as CSSProperties} />
          <ButtonLink href={href} className="hero-fade mt-6 [--d:440ms] lg:mt-7">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
