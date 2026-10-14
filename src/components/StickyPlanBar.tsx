"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PLAN_HREF, site } from "@/content/site";
import { ServicesSheet } from "./dock/ServicesSheet";
import "./dock/dock.css";

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M.5.5h5v5h-5zM8.5.5h5v5h-5zM.5 8.5h5v5h-5zM8.5 8.5h5v5h-5z" stroke="currentColor" />
    </svg>
  );
}

const SHEET_ID = "services-sheet";

/**
 * Thumb dock, fixed to the bottom of the screen below 1024px (replaces the old slim copper bar).
 * Left: "Services" (navy) opens the Services bottom sheet (dock/ServicesSheet.tsx). Right: "Plan your event" (copper).
 * - 60px tall plus the safe-area inset. Hidden (slides down) while any `[data-hide-sticky]` element is on screen
 *   (the opening and the closing plan band carry it).
 * - "Plan your event" links to "#plan" when the page has an element with id="plan", otherwise to /plan-your-event.
 * - Not rendered on the plan page itself.
 * The body gets matching bottom padding from globals.css (`body:has([data-sticky-plan-bar])`, --sticky-bar-h).
 */
export function StickyPlanBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [href, setHref] = useState(PLAN_HREF);
  const [sheetOpen, setSheetOpen] = useState(false);
  const servicesButton = useRef<HTMLButtonElement>(null);
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

  const closeSheet = (returnFocus: boolean) => {
    setSheetOpen(false);
    if (returnFocus) servicesButton.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <div data-sticky-plan-bar="" data-visible={visible} inert={!visible} className="dock">
        <button
          ref={servicesButton}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          aria-controls={SHEET_ID}
          onClick={() => setSheetOpen(true)}
          className="dock-item dock-services t-button"
        >
          <GridIcon />
          Services
        </button>
        <Link href={href} className="dock-item dock-plan t-button">
          {site.headerCta}
        </Link>
      </div>
      <ServicesSheet id={SHEET_ID} open={sheetOpen} onClose={closeSheet} />
    </>
  );
}
