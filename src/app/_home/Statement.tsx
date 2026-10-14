"use client";

import { useRef } from "react";
import { Grain } from "@/components/motion/Grain";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { home } from "@/content/site";
import "./home-motion-a.css";

/**
 * The founders' line as a full-height navy band; its words light up one by one as the band scrolls through
 * (useScrollProgress "view": each word's opacity = clamp(0.16, q * N - i, 1), q from --p; CSS in home-motion-a.css).
 * Without JS or under reduced motion every word is fully lit.
 */
export function Statement() {
  const { quote, quoteBy } = home.statement;
  const words = quote.split(/\s+/).filter(Boolean);
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { mode: "view" });
  return (
    <section ref={ref} aria-label="What we believe" className="stmt relative bg-navy text-white" style={{ "--n": words.length } as React.CSSProperties}>
      <Grain />
      <figure className="site-container stmt-inner">
        <blockquote>
          <p className="stmt-text">
            {words.map((w, i) => (
              <span key={i} className="stmt-word" style={{ "--i": i } as React.CSSProperties}>
                {w}
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </p>
        </blockquote>
        <figcaption className="stmt-by mt-8 lg:mt-12">
          <span aria-hidden="true" className="copper-rule mb-5" />
          {quoteBy}
        </figcaption>
      </figure>
    </section>
  );
}
