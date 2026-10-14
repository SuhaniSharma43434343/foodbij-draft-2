"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PLAN_HREF, services, site } from "@/content/site";
import { ButtonLink } from "./Button";

export type HeaderVariant = "overlay" | "solid";

/** Pages that open with a full-bleed hero get the transparent overlay header. */
function variantFor(pathname: string): HeaderVariant {
  return pathname === "/" || pathname.startsWith("/services/") ? "overlay" : "solid";
}

/** Past this scroll depth the overlay header turns solid white so it stays readable over content. */
const SOLID_AFTER_PX = 80;
/** Past this depth the header slides away on scroll down and returns on scroll up. */
const HIDE_AFTER_PX = 120;

const desktopLinks = site.nav.filter((n) => n.href !== PLAN_HREF);
const phoneLinks = [
  ...services.map((s) => ({ label: s.name, href: s.href })),
  ...desktopLinks.filter((n) => n.href !== "/#services"),
];

function MenuIcon() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
      <path d="M0 1h22M0 9h22" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

const logoClass = "h-auto w-[132px] lg:w-[170px]";
const logoSizes = "(min-width: 1024px) 170px, 132px";

/**
 * White and navy logos stacked; `light` shows the white one. Both load up front so the swap never flickers,
 * at low fetch priority so React does not preload them ahead of the hero photo (the only preload).
 * The link gets 7px of padding (cancelled by a negative margin) so its tap target is 44px tall.
 */
function Logo({ light, onClick }: { light: boolean; onClick?: () => void }) {
  return (
    <Link href="/" aria-label="Foodbiz, home" onClick={onClick} className="-my-[7px] block py-[7px]">
      <span className="relative block">
        <Image
          src="/logos/foodbiz-2026-1200w.png"
          alt=""
          width={1200}
          height={274}
          loading="eager"
          fetchPriority="low"
          sizes={logoSizes}
          className={`${logoClass} transition-opacity duration-300 ${light ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src="/logos/foodbiz-2026-white-1200w.png"
          alt=""
          width={1200}
          height={274}
          loading="eager"
          fetchPriority="low"
          sizes={logoSizes}
          className={`${logoClass} absolute inset-0 transition-opacity duration-300 ${light ? "opacity-100" : "opacity-0"}`}
        />
      </span>
    </Link>
  );
}

type SiteHeaderProps = {
  /**
   * overlay: transparent with the white logo, over a hero image (Home, service pages).
   * solid: white bar with the navy logo (every other page).
   * Default: chosen from the route ("/" and "/services/*" are overlay).
   */
  variant?: HeaderVariant;
};

/**
 * Site header. Overlay pages: fixed over the hero, turns solid white after ~80px of scroll.
 * Solid pages: sticky white bar. Phone: "Menu" button opening a full-screen navy menu.
 */
export function SiteHeader({ variant }: SiteHeaderProps) {
  const pathname = usePathname() ?? "/";
  const mode = variant ?? variantFor(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Overlay header turns solid once the page scrolls past the threshold; any header tucks away on
  // scroll down past HIDE_AFTER_PX and comes back on scroll up (always shown near the top).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (mode === "overlay") setScrolled(y > SOLID_AFTER_PX);
      if (y <= HIDE_AFTER_PX) {
        setTucked(false);
        last = y;
        return;
      }
      if (Math.abs(y - last) < 6) return;
      setTucked(y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, pathname]);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Phone menu: lock scroll, Escape closes, keep Tab inside, focus in on open and back out on close,
  // and close if the screen grows to desktop width.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) menuButton.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Tells the motion system (MotionProvider) to pause smooth scrolling.
    document.documentElement.setAttribute("data-scroll-lock", "");
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuPanel.current) return;
      const focusable = menuPanel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      document.documentElement.removeAttribute("data-scroll-lock");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const transparent = mode === "overlay" && !scrolled;
  const close = () => setOpen(false);

  return (
    <>
      <header
        data-hidden={tucked && !open && !focusInside ? "" : undefined}
        // Keyboard focus inside keeps the header on screen (a mouse click on a link does not).
        onFocus={(e) => setFocusInside(e.target.matches(":focus-visible"))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false);
        }}
        className={`site-header ${mode === "overlay" ? "fixed" : "sticky"} inset-x-0 top-0 z-40 border-b ${
          transparent ? "border-transparent bg-transparent text-white" : "border-navy/12 bg-white text-navy"
        }`}
      >
        <div className="site-container flex h-[72px] items-center justify-between lg:h-24">
          <Logo light={transparent} />

          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
            className="t-button -mr-3 inline-flex min-h-11 min-w-11 items-center gap-3 px-3 lg:hidden"
          >
            Menu
            <MenuIcon />
          </button>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {desktopLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="nav-link t-button py-3"
              >
                {l.label}
              </Link>
            ))}
            <ButtonLink href={PLAN_HREF} variant={transparent ? "outline-light" : "outline"}>
              {site.headerCta}
            </ButtonLink>
          </nav>
        </div>
      </header>

      <div
        ref={menuPanel}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-navy text-white lg:hidden"
      >
        <div className="site-container flex h-[72px] items-center justify-between">
          <Logo light onClick={close} />
          <button
            ref={closeButton}
            type="button"
            onClick={close}
            className="t-button -mr-3 inline-flex min-h-11 min-w-11 items-center gap-3 px-3"
          >
            Close
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Menu" className="site-container pt-8 pb-12">
          <ul className="border-t border-white/12">
            {phoneLinks.map((l) => (
              <li key={l.href} className="border-b border-white/12">
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="block py-4 font-display text-[1.75rem] leading-[1.15] font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href={PLAN_HREF} onClick={close} className="mt-10 w-full">
            {site.headerCta}
          </ButtonLink>
        </nav>
      </div>
    </>
  );
}
