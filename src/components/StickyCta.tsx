"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PLAN_HREF } from "@/content/site";

/**
 * Phones only: a slim "Plan your event" bar. It appears once the first screen has scrolled away, and only
 * while the visitor scrolls back up (the same moment the header returns), so it never sits over what they are reading.
 * It hides again wherever the page already shows that action ([data-cta-zone]: closing invitations and
 * the footer), and never appears on the enquiry page itself, so it never sits over a form field.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [up, setUp] = useState(false);
  const [inZone, setInZone] = useState(false);
  const off = pathname.startsWith(PLAN_HREF);

  useEffect(() => {
    if (off) return;
    setPast(false);
    setUp(false);
    setInZone(false);
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setPast(y > window.innerHeight * 0.9);
      if (Math.abs(y - last) > 6) {
        setUp(y < last);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const zones = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? zones.add(e.target) : zones.delete(e.target));
      setInZone(zones.size > 0);
    });
    document.querySelectorAll("[data-cta-zone]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname, off]);

  if (off) return null;
  const show = past && up && !inZone;
  return (
    <div className="sticky-cta" data-show={show} aria-hidden={!show}>
      <Link href={PLAN_HREF} className="btn w-full" tabIndex={show ? 0 : -1}>
        Plan your event <span className="arrow" aria-hidden="true" />
      </Link>
    </div>
  );
}
