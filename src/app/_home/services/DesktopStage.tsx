"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useRef, type RefObject } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import type { Service } from "@/content/site";
import { CursorPreview, type CursorPreviewHandle } from "./CursorPreview";

const STEPS = 4;

/**
 * Desktop pinned stage (shown only at >=1024px under html.js-motion with motion allowed; see services-motion.css).
 * The wrapper is 400vh; useScrollProgress (in Services.tsx) writes data-step 0..3 on it and CSS switches
 * the focused name, its blurb + link, and the photo layers. Clicking a name scrolls to its step; keyboard
 * focus on a name jumps there, so Tab reaches every name and, next, its link.
 */
export function DesktopStage({ items, ref }: { items: Service[]; ref: RefObject<HTMLDivElement | null> }) {
  const preview = useRef<CursorPreviewHandle>(null);

  const goTo = (i: number, smooth: boolean) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    if (span <= 0) return;
    const top = window.scrollY + r.top + ((i + 0.5) / STEPS) * span;
    window.scrollTo({ top: Math.round(top), behavior: smooth ? "smooth" : "instant" });
  };

  return (
    <div ref={ref} className="svc-desk">
      <div className="svc-stage">
        <div className="svc-stage-grid">
          <div className="svc-left">
            <ol
              className="svc-list"
              onPointerMove={(e) => preview.current?.move(e.clientX, e.clientY)}
              onPointerLeave={() => preview.current?.hide()}
            >
              {items.map((s, i) => (
                <li key={s.slug} className="svc-item" onPointerEnter={(e) => preview.current?.show(i, e.clientX, e.clientY)}>
                  <h3>
                    <button
                      type="button"
                      className="svc-name"
                      onClick={() => goTo(i, true)}
                      onFocus={(e) => {
                        if (e.currentTarget.matches(":focus-visible")) goTo(i, false);
                      }}
                    >
                      <span className="svc-rule" aria-hidden="true" />
                      <span className="svc-title">{s.name}</span>
                    </button>
                  </h3>
                  <div className="svc-detail">
                    <p className="t-body text-navy/72">{s.blurb}</p>
                    <div className="mt-3">
                      <ArrowLink href={s.href}>{s.linkLabel}</ArrowLink>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="svc-frame">
            {items.map((s) => (
              <div key={s.slug} className="svc-layer">
                <div className="svc-layer-img">
                  <Image src={s.heroImage.src} style={photoStyle(s.heroImage.src)} alt={s.heroImage.alt} fill sizes="(min-width: 1320px) 600px, 46vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CursorPreview ref={preview} items={items} />
    </div>
  );
}
