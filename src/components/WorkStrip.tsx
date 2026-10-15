"use client";

import { useRef, type ReactNode } from "react";

/** A horizontal sequence of cards: native swipe and trackpad scrolling, plus two step buttons on desktop. */
export function WorkStrip({ children, label, dark }: { children: ReactNode; label: string; dark?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.7, behavior: "smooth" });
  const btn = `btn btn--sm px-4 bg-transparent ring-1 ${dark ? "text-white ring-[var(--line-dark)] hover:bg-[var(--navy-2)]" : "text-[var(--navy)] ring-[var(--line)] hover:bg-[var(--linen)]"}`;
  return (
    <div className="mt-12 lg:mt-16">
      <ul ref={track} className="strip gap-4 lg:gap-8" aria-label={label} tabIndex={0}>
        {children}
      </ul>
      <div className="wrap mt-8 hidden justify-end gap-2 lg:flex">
        <button type="button" onClick={() => step(-1)} className={btn} aria-label="Previous">
          <span className="arrow rotate-180" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} className={btn} aria-label="Next">
          <span className="arrow" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
