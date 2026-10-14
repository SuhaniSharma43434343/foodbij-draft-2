"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PLAN_HREF, site } from "@/content/site";

/**
 * Slim copper "Plan your event" bar fixed to the bottom of the screen below 1024px.
 * - Hidden while any element with the `data-hide-sticky` attribute is on screen (mark the hero
 *   and the plan band with it; <PlanBand> already has it).
 * - Links to "#plan" when the page has an element with id="plan", otherwise to /plan-your-event.
 * - Not rendered on the plan page itself.
 * The body gets matching bottom padding from globals.css while this bar exists.
 */
export function StickyPlanBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [href, setHref] = useState(PLAN_HREF);
  const hidden = pathname === PLAN_HREF;

  useEffect(() => {
    if (hidden) return;
    setHref(document.getElementById("plan") ? "#plan" : PLAN_HREF);

    const targets = Array.from(document.querySelectorAll("[data-hide-sticky]"));
    if (targets.length === 0) {
      setVisible(true);
      return;
    }
    const inView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setVisible(inView.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, hidden]);

  if (hidden) return null;

  return (
    <Link
      href={href}
      data-sticky-plan-bar
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`t-button fixed inset-x-0 bottom-0 z-30 flex h-[52px] items-center justify-center bg-copper text-white transition-[translate,visibility] duration-300 ease-(--ease-out) lg:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      {site.headerCta}
    </Link>
  );
}
