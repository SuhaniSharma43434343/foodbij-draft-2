import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import type { CSSProperties, Ref } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { Grain } from "@/components/motion/Grain";
import type { Service } from "@/content/site";

/**
 * Service cards: full-bleed photo, navy gradient, copper numeral, a giant italic name, blurb and the link.
 * W9.4 (phone): the name scales 0.92 -> 1 and slides in from the right as its card lands (scrubbed by --p);
 * the card is a ScrollFocus target (photo zooms and lifts, a copper rule draws under the numeral) and carries grain.
 * Under motion on phones each card is sticky and the next one slides over it (see services-motion.css);
 * otherwise a plain list (phone) or 2x2 grid (desktop without motion). Only the ArrowLink is a link.
 */
export function PhoneStack({ items, ref }: { items: Service[]; ref?: Ref<HTMLOListElement> }) {
  return (
    <ol ref={ref} className="svc-stack">
      {items.map((s, i) => (
        <li key={s.slug} className="svc-card" style={{ "--i": i } as CSSProperties}>
          <div className="svc-card-cover">
            <div className="svc-card-tap" data-focus-scroll="norule">
              <Image
                src={s.heroImage.src}
                style={photoStyle(s.heroImage.src)}
                alt={s.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="focus-zoom object-cover"
              />
              <div className="svc-card-shade" aria-hidden="true" />
              <Grain />
              <div className="svc-card-text">
                <p className="svc-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <span className="svc-card-rule" aria-hidden="true" />
                <h3 className="svc-card-name mt-3 text-white">{s.name}</h3>
                <p className="t-body mt-4 text-white/88">{s.blurb}</p>
                <div className="mt-3">
                  <ArrowLink href={s.href} tone="dark" className="svc-card-link press [--press-color:var(--color-copper)]">
                    {s.linkLabel}
                  </ArrowLink>
                </div>
              </div>
              <div className="svc-card-dim" aria-hidden="true" />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
