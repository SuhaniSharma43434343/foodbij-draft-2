"use client";

import { useState } from "react";
import { CopperSlash } from "./Opening";
import "./home-motion-a.css";

// Occasion types only (no client names, no numbers). Kept here: the line is decorative, the services carry the copy.
const OCCASIONS = [
  "Sangeet",
  "Mehendi",
  "Reception",
  "Birthday",
  "Anniversary dinner",
  "Product launch",
  "Store opening",
  "Brand day",
  "Concert",
  "Festival",
  "Office lunch",
  "Offsite",
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="mq-list" aria-hidden={hidden || undefined} data-dup={hidden ? "" : undefined}>
      {OCCASIONS.map((o) => (
        <li key={o} className="mq-item">
          <span>{o}</span>
          <CopperSlash className="mq-slash" />
        </li>
      ))}
    </ul>
  );
}

/**
 * One slow line of occasion types in the large italic serif, separated by small copper slashes.
 * CSS keyframes move a doubled track by -50% (seamless loop, ~55s); pauses on hover and focus; static and
 * wrapping under reduced motion. Screen readers get one plain list (the moving copy is aria-hidden).
 */
export function Marquee() {
  // WCAG 2.2.2: moving content that lasts more than 5s needs a way to pause it.
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Occasions we cater" className={`mq${paused ? " mq-paused" : ""}`}>
      <button
        type="button"
        className="mq-toggle"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        <span className="sr-only">{paused ? "Play the occasions line" : "Pause the occasions line"}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12">
          {paused ? <path d="M4 2l10 6-10 6z" fill="currentColor" /> : <path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" />}
        </svg>
      </button>
      <ul className="sr-only">
        {OCCASIONS.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
      <div className="mq-track" aria-hidden="true">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
