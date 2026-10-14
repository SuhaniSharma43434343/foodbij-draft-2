"use client";

// The only client code in the sketch: the header (with the phone menu) and the sticky phone bar.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { container, copperButton, type } from "./tokens";

const menuLinks = [
  "Weddings",
  "Celebrations & private dining",
  "Brand launches & live events",
  "Corporate & office dining",
  "Our work",
  "Our story",
];

const desktopLinks = ["Services", "Our work", "Our story"];

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

function Logo() {
  return (
    <a href="#" aria-label="Foodbiz, home" className="block">
      <Image
        src="/logos/foodbiz-2026-white-1200w.png"
        alt="Foodbiz"
        width={1200}
        height={274}
        loading="eager"
        sizes="(min-width: 1024px) 170px, 132px"
        className="h-auto w-[132px] lg:w-[170px]"
      />
    </a>
  );
}

export function SketchChrome() {
  const [open, setOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Phone menu: lock page scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = menuButton.current;
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  // Sticky bar: hidden while the opening or the closing band (#plan) is on screen.
  useEffect(() => {
    const targets = ["opening", "plan"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const inView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setBarVisible(inView.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 text-white">
        <div className={`${container} flex h-[72px] items-center justify-between lg:h-24`}>
          <Logo />

          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="sketch-menu"
            onClick={() => setOpen(true)}
            className="-mr-3 inline-flex min-h-11 min-w-11 items-center gap-3 px-3 lg:hidden"
            style={type.button}
          >
            Menu
            <MenuIcon />
          </button>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {desktopLinks.map((l) => (
              <a key={l} href="#" className="py-3 hover:opacity-70" style={type.button}>
                {l}
              </a>
            ))}
            <a
              href="#plan"
              className="inline-flex min-h-11 items-center border border-white px-6 transition-colors hover:bg-white hover:text-[#0B1C2D] motion-reduce:transition-none"
              style={type.button}
            >
              Plan your event
            </a>
          </nav>
        </div>
      </header>

      <div
        id="sketch-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1C2D] text-white lg:hidden"
      >
        <div className={`${container} flex h-[72px] items-center justify-between`}>
          <Logo />
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-3 inline-flex min-h-11 min-w-11 items-center gap-3 px-3"
            style={type.button}
          >
            Close
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Main" className={`${container} pt-8 pb-12`}>
          <ul className="border-t border-white/12">
            {menuLinks.map((l) => (
              <li key={l} className="border-b border-white/12">
                <a
                  href="#"
                  onClick={() => setOpen(false)}
                  className="block py-4"
                  style={{ ...type.displayM, fontSize: "1.75rem", lineHeight: 1.15 }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href="#plan" onClick={() => setOpen(false)} className={`${copperButton} mt-10 w-full`} style={type.button}>
            Plan your event
          </a>
        </nav>
      </div>

      <a
        href="#plan"
        aria-hidden={!barVisible}
        tabIndex={barVisible ? undefined : -1}
        className={`fixed inset-x-0 bottom-0 z-30 flex h-[52px] items-center justify-center bg-[#B87333] text-white transition-[transform,visibility] duration-300 motion-reduce:transition-none lg:hidden ${
          barVisible ? "translate-y-0" : "invisible translate-y-full"
        }`}
        style={type.button}
      >
        Plan your event
      </a>
    </>
  );
}
