"use client";

import { useEffect } from "react";
import { servicePages } from "@/content/services";
import { home, photos, type Img } from "@/content/site";
import { stories } from "@/content/stories";
import loader from "@/lib/image-loader";

/**
 * Warms the first photograph of a page as soon as a visitor points at, focuses or touches a link to it.
 * React holds a page transition until the new page's first images have loaded, so a warm cache means
 * the transition starts straight away instead of pausing on the old page.
 * `vw` is roughly how wide the photo is drawn, as a share of the window, so the right file is fetched.
 */
const FIRST_PHOTO: Record<string, { img: Img; vw: number; vwWide?: number }> = {
  "/": { img: home.hero.image, vw: 1 },
  "/our-story": { img: photos.cartierBar, vw: 1 },
  "/services/weddings": { img: servicePages.weddings.hero.image, vw: 1 },
  "/services/celebrations": { img: servicePages.celebrations.hero.image, vw: 1, vwWide: 0.5 },
  "/services/brand-launches": { img: servicePages["brand-launches"].hero.image, vw: 0.46, vwWide: 0.3 },
  "/services/corporate-dining": { img: servicePages["corporate-dining"].hero.image, vw: 1 },
  ...Object.fromEntries(
    stories.map((s) => {
      const lead = s.images[0];
      const portrait = lead.height > lead.width;
      return [`/our-work/${s.slug}`, { img: lead, vw: 1, vwWide: portrait ? 0.46 : 0.92 }];
    }),
  ),
};

export function HeroPrefetch() {
  useEffect(() => {
    const warmed = new Set<string>();
    const warm = (target: EventTarget | null) => {
      const a = (target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.origin !== location.origin) return;
      const entry = FIRST_PHOTO[a.pathname];
      if (!entry || warmed.has(a.pathname) || a.pathname === location.pathname) return;
      warmed.add(a.pathname);
      const share = window.innerWidth >= 1024 && entry.vwWide ? entry.vwWide : entry.vw;
      const img = new Image();
      img.decoding = "async";
      img.src = loader({ src: entry.img.src, width: Math.ceil(window.innerWidth * share * (window.devicePixelRatio || 1)) });
    };
    const onEvent = (e: Event) => warm(e.target);
    document.addEventListener("pointerover", onEvent, { passive: true });
    document.addEventListener("focusin", onEvent);
    document.addEventListener("touchstart", onEvent, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onEvent);
      document.removeEventListener("focusin", onEvent);
      document.removeEventListener("touchstart", onEvent);
    };
  }, []);
  return null;
}
