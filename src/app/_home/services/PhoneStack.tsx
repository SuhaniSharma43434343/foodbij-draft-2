import Image from "next/image";
import type { CSSProperties, Ref } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import type { Service } from "@/content/site";

/**
 * Service cards: full-bleed photo, navy gradient, copper numeral, name, blurb and the link.
 * Under motion on phones each card is sticky and the next one slides over it (see services-motion.css);
 * otherwise a plain list (phone) or 2x2 grid (desktop without motion). Only the ArrowLink is a link.
 */
export function PhoneStack({ items, ref }: { items: Service[]; ref?: Ref<HTMLOListElement> }) {
  return (
    <ol ref={ref} className="svc-stack">
      {items.map((s, i) => (
        <li key={s.slug} className="svc-card" style={{ "--i": i } as CSSProperties}>
          <div className="svc-card-cover">
            <div className="svc-card-tap">
              <Image
                src={s.heroImage.src}
                alt={s.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="svc-card-shade" aria-hidden="true" />
              <div className="svc-card-text">
                <p className="svc-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-display-l mt-3 max-w-[14ch] text-white">{s.name}</h3>
                <p className="t-body mt-4 text-white/88">{s.blurb}</p>
                <div className="mt-3">
                  <ArrowLink href={s.href} tone="dark" className="svc-card-link">
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
