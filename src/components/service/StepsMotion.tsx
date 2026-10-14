"use client";

import { useRef, type CSSProperties } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

type Step = { title: string; text: string };
type Props = { id: string; label: string; heading: string; steps: Step[] };

const cols: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" };

/**
 * "How it works" as a scroll-driven sequence (CSS: service-motion.css, `.ss-*`).
 * - Desktop (html.js-motion, motion allowed, viewport >= 640px tall): the band pins for N x 40vh and
 *   useScrollProgress({ steps: N }) writes data-step; the active step is bright, the others dim, and a
 *   copper line fills across the top of the steps.
 * - Phone: steps fade up one by one and a copper line draws down the left from each numeral to the next.
 * - No JS / reduced motion: every step fully visible, nothing pinned.
 */
export function StepsMotion({ id, label, heading, steps }: Props) {
  const ref = useRef<HTMLElement>(null);
  const n = steps.length;
  useScrollProgress(ref, { mode: "pin", steps: n });
  return (
    <section ref={ref} aria-labelledby={`${id}-how`} className="ss bg-mist" style={{ "--n": n } as CSSProperties}>
      <div className="ss-pin section-y">
        <div className="site-container w-full">
          <SectionHeading reveal id={`${id}-how`} label={label} heading={heading} headingClassName="max-w-[22ch] text-balance" />
          <div className="ss-list-wrap relative mt-12 lg:mt-16">
            <div className="ss-track" aria-hidden="true">
              <span className="ss-fill" />
            </div>
            <ol className={`ss-list grid grid-cols-1 lg:gap-10 ${cols[n] ?? "lg:grid-cols-4"}`}>
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  data-reveal=""
                  className="ss-step relative grid grid-cols-[3rem_1fr] border-t border-navy/12 py-7 lg:block lg:border-t-copper lg:pt-8 lg:pb-0"
                >
                  {i < n - 1 ? <span aria-hidden="true" className="ss-vline" /> : null}
                  <div className="ss-body contents lg:block">
                    <p aria-hidden="true" className="font-display text-[1.75rem] leading-none font-medium text-copper">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="lg:mt-5">
                      <h3 className="font-display text-[1.625rem] leading-[1.15] font-medium lg:text-[1.5rem]">{s.title}</h3>
                      <p className="t-body mt-2 text-navy/80 lg:mt-3">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
