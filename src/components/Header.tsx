"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PLAN_HREF, services, site } from "@/content/site";
import { Photo } from "./Photo";

const LINKS = [
  { label: "Our work", href: "/our-work" },
  { label: "Our story", href: "/our-story" },
];

/**
 * One header for every page.
 * - Over the homepage photograph it is transparent with the white logo; elsewhere, white with the navy logo.
 * - It slides away while you scroll down and returns as soon as you scroll up.
 * - Desktop: Services opens a panel of the four services. Phone: Menu opens a full-screen sheet.
 */
export function Header() {
  const pathname = usePathname();
  // Pages that open on a dark full-width hero: the header starts transparent over it.
  const isHome = ["/", "/services/weddings", "/services/brand-launches"].includes(pathname);
  const [over, setOver] = useState(isHome);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const panelWrap = useRef<HTMLDivElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
    setHidden(false);
  }, [pathname]);

  // Theme and hide-on-scroll, read once per frame.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const heroEnd = isHome ? window.innerHeight * 0.6 : 0;
      setOver(isHome && y < heroEnd);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isHome]);

  // Phone menu: lock scroll, keep focus inside, close on Escape, return focus.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("menu-open");
    const el = sheet.current;
    const focusables = () =>
      Array.from(el?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [menuOpen]);

  // Desktop services panel: close on Escape or a click outside.
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!panelWrap.current?.contains(e.target as Node)) setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [panelOpen]);

  const theme = over && !panelOpen ? "over" : "solid";

  return (
    <>
      <header
        className="site-header"
        data-theme={theme}
        data-hidden={hidden && !panelOpen && !menuOpen ? "true" : "false"}
      >
        <div ref={panelWrap} className="h-full">
          <div className="wrap flex h-full items-center justify-between">
            <Link href="/" className="flex min-h-[44px] items-center" aria-label="Foodbiz, home">
              <span className="logo">
              <Image
                className="logo-navy"
                src="/logos/foodbiz-2026-400w.webp"
                alt=""
                width={400}
                height={91}
              />
              <Image
                className="logo-white"
                src="/logos/foodbiz-2026-white-400w.webp"
                alt=""
                width={400}
                height={91}
              />
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
              <button
                type="button"
                className="nav-link"
                aria-expanded={panelOpen}
                aria-controls="services-panel"
                onClick={() => setPanelOpen((o) => !o)}
              >
                Services
              </button>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link"
                  aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              ))}
              <Link href={PLAN_HREF} className="btn btn--sm">
                Plan your event
              </Link>
            </nav>

            <button
              ref={menuBtn}
              type="button"
              className="nav-link gap-3 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="phone-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
              <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
                <span className="block h-px w-full bg-current" />
                <span className="block h-px w-4 self-end bg-current" />
              </span>
            </button>
          </div>

          <div id="services-panel" className="svc-panel hidden lg:block" data-open={panelOpen}>
            <ul className="wrap grid grid-cols-4 gap-8 py-10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="lift group block" tabIndex={panelOpen ? 0 : -1} onClick={() => setPanelOpen(false)}>
                    <Photo img={s.image} sizes="300px" ratio="4 / 3" reveal={false} />
                    <span className="serif mt-4 block text-[1.5rem] leading-tight">
                      <span className="uline">{s.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div
        id="phone-menu"
        ref={sheet}
        className="menu-sheet lg:hidden"
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className="wrap flex min-h-full flex-col pb-10">
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <span className="relative block h-[27px] w-[118px]">
              <Image src="/logos/foodbiz-2026-white-400w.webp" alt="Foodbiz" width={400} height={91} />
            </span>
            <button type="button" className="nav-link gap-3" onClick={() => setMenuOpen(false)}>
              Close
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Main" className="mt-8 flex flex-1 flex-col">
            <p className="menu-item t-meta text-[var(--copper-soft)]" style={{ "--i": 0 } as React.CSSProperties}>
              Services
            </p>
            <ul className="mt-3">
              {services.map((s, i) => (
                <li key={s.slug} className="menu-item" style={{ "--i": i + 1 } as React.CSSProperties}>
                  <Link
                    href={s.href}
                    className="serif flex min-h-[52px] items-center py-1 text-[1.75rem] leading-[1.1]"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 border-t border-[var(--line-dark)] pt-4">
              {LINKS.map((l, i) => (
                <li key={l.href} className="menu-item" style={{ "--i": i + 5 } as React.CSSProperties}>
                  <Link
                    href={l.href}
                    className="flex min-h-[48px] items-center text-[1.125rem] font-medium"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu-item mt-auto pt-10" style={{ "--i": 8 } as React.CSSProperties}>
              <Link href={PLAN_HREF} className="btn btn--light w-full" tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}>
                Plan your event <span className="arrow" aria-hidden="true" />
              </Link>
              <a
                href={site.contact.instagram.url}
                className="mt-4 flex min-h-[44px] items-center text-[0.9375rem] text-[var(--on-dark-2)]"
                tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
              >
                Instagram {site.contact.instagram.handle}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
