import Link from "next/link";
import type { ReactNode } from "react";

/** The thin arrow used by text links. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden="true" className={`shrink-0 ${className}`.trim()}>
      <path d="M0 5h26M22 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** "light" = on a light ground (copper-deep text); "dark" = on navy (white text). */
  tone?: "light" | "dark";
  className?: string;
};

/** Uppercase text link with a thin arrow ("See weddings ->"); 44px tap height. */
export function ArrowLink({ href, children, tone = "light", className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group t-button inline-flex min-h-11 items-center gap-3 ${
        tone === "dark" ? "text-white" : "text-copper-deep"
      } ${className}`.trim()}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        <Arrow />
      </span>
    </Link>
  );
}
