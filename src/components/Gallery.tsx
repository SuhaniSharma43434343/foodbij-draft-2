"use client";

import { useRef } from "react";
import type { Img } from "@/content/site";
import { Photo } from "./Photo";

/**
 * A film strip of photographs at one height, each at its own proportion.
 * Native horizontal scrolling (swipe, trackpad, shift+wheel) with snap; on desktop two quiet buttons
 * step through it. It never takes over vertical scrolling.
 */
export function Gallery({ images, label, dark }: { images: Img[]; label: string; dark?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <div>
      <ul ref={track} className="strip" aria-label={label} tabIndex={0}>
        {images.map((im) => {
          const portrait = im.height > im.width;
          return (
            <li
              key={im.src}
              className="h-[340px] sm:h-[420px] lg:h-[min(62vh,620px)]"
              style={{ aspectRatio: portrait ? "3 / 4" : "3 / 2" }}
            >
              <Photo img={im} sizes={portrait ? "(min-width: 1024px) 34vw, 70vw" : "(min-width: 1024px) 70vw, 100vw"} className="h-full w-full" reveal={false} />
            </li>
          );
        })}
      </ul>
      <div className="wrap mt-6 hidden justify-end gap-2 lg:flex">
        <button type="button" onClick={() => step(-1)} className={`btn btn--sm bg-transparent px-4 ring-1 ${dark ? "text-white ring-[var(--line-dark)] hover:bg-[var(--navy-2)]" : "text-[var(--navy)] ring-[var(--line)] hover:bg-[var(--linen)]"}`} aria-label="Previous photographs">
          <span className="arrow rotate-180" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} className={`btn btn--sm bg-transparent px-4 ring-1 ${dark ? "text-white ring-[var(--line-dark)] hover:bg-[var(--navy-2)]" : "text-[var(--navy)] ring-[var(--line)] hover:bg-[var(--linen)]"}`} aria-label="Next photographs">
          <span className="arrow" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
