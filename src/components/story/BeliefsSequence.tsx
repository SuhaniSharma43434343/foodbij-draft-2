"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { SectionHeading } from "@/components/SectionHeading";

type Belief = { title: string };

/**
 * Our story, "What we hold to", as a scroll-driven sequence (CSS: .pm-values in components/work/pages-motion.css).
 * - Desktop (>= 1024 wide, >= 700 tall): the section grows and its content pins; as --p runs 0 -> 1 the values
 *   light up in turn (dim 0.22 -> full), and a copper track beside the heading fills.
 * - Phone: each value fades up on its own as it arrives (data-reveal) while a copper line draws down the list
 *   (the line has its own --p, in "view" mode).
 * Without JS or under reduced motion: a plain list, everything lit, the line fully drawn.
 */
export function BeliefsSequence({ id, heading, items }: { id: string; heading: string; items: Belief[] }) {
  const section = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  useScrollProgress(section, { mode: "pin" });
  useScrollProgress(line, { mode: "view" });
  return (
    <section
      ref={section}
      aria-labelledby={id}
      className="pm-values section-y bg-mist"
      style={{ "--n": items.length } as CSSProperties}
    >
      <div className="pm-values-pin">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading id={id} heading={heading} headingClassName="max-w-[20ch] text-balance" reveal />
            <span aria-hidden="true" className="pm-values-track">
              <span className="pm-values-fill" />
            </span>
          </div>
          <div className="relative mt-12 lg:col-span-7 lg:mt-0">
            <span ref={line} aria-hidden="true" className="pm-values-line" />
            <ul className="border-t border-navy/12">
              {items.map((b, k) => (
                <li
                  key={b.title}
                  data-reveal=""
                  className="pm-value border-b border-navy/12 py-8 pl-6 lg:py-10 lg:pl-0"
                  style={{ "--k": k } as CSSProperties}
                >
                  <div className="pm-value-body">
                    <h3 className="font-display text-[1.5rem] leading-[1.18] font-medium text-navy lg:text-[1.75rem]">{b.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
