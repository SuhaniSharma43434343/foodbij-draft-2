"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { home, services } from "@/content/site";
import { DesktopStage } from "./services/DesktopStage";
import { PhoneStack } from "./services/PhoneStack";
import "./services-motion.css";

/**
 * The four services (W7.2, motion-spec "Expressive pass" item 2). CSS: ./services-motion.css.
 *
 * - Phone (<1024px), motion on: full-height photo cards pin (sticky) and slide over each other; the covered
 *   card shrinks to 0.92 and dims, driven by `--p` from useScrollProgress on the stack.
 * - Desktop (>=1024px), motion on: a pinned 400vh stage. Left the four names (focused one navy with a copper
 *   rule, its blurb and link below), right a photo frame that changes with a diagonal wipe per `data-step`.
 *   Hovering a name shows a small photo that follows the cursor (fine pointers only).
 * - No JS or reduced motion: the cards render as a plain list (phone) or a 2x2 grid (desktop), nothing pins.
 */
export function Services() {
  const stackRef = useRef<HTMLOListElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  useScrollProgress(stackRef, { steps: 4 });
  useScrollProgress(deskRef, { steps: 4 });

  return (
    <section id="services" aria-labelledby="services-title" className="svc-section">
      <div className="site-container">
        <SectionHeading reveal id="services-title" label={home.servicesIntro.label} heading={home.servicesIntro.heading} />
      </div>
      <PhoneStack ref={stackRef} items={services} />
      <DesktopStage ref={deskRef} items={services} />
    </section>
  );
}
