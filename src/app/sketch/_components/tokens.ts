// Design tokens for the homepage sketch (W1.4), taken from docs/design/taste-spec.md.
// Kept as plain values so the real homepage can lift them into the theme later.
import type { CSSProperties } from "react";

export const NAVY = "#0B1C2D";
export const COPPER = "#B87333";
export const COPPER_DEEP = "#8F5523";
export const MIST = "#F4F1EC";

const display: CSSProperties = { fontFamily: "var(--font-sk-display)", fontWeight: 500 };
const text: CSSProperties = { fontFamily: "var(--font-sk-text)" };

export const type = {
  displayXl: { ...display, fontSize: "clamp(2.375rem, 1.7rem + 3.2vw, 5rem)", lineHeight: 1.04, letterSpacing: "-0.01em" },
  displayL: { ...display, fontSize: "clamp(2.125rem, 1.6rem + 2.6vw, 4.25rem)", lineHeight: 1.06 },
  displayM: { ...display, fontSize: "clamp(1.75rem, 1.4rem + 1.6vw, 3rem)", lineHeight: 1.1 },
  lead: { ...text, fontWeight: 400, fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", lineHeight: 1.5 },
  label: { ...text, fontWeight: 500, fontSize: "12px", lineHeight: 1.3, letterSpacing: "0.18em", textTransform: "uppercase" },
  button: { ...text, fontWeight: 500, fontSize: "13px", lineHeight: 1, letterSpacing: "0.14em", textTransform: "uppercase" },
} satisfies Record<string, CSSProperties>;

// Shared layout classes: 20px gutter on phone, 48px from 1024px, 1320px content width.
export const container = "mx-auto w-full max-w-[1320px] px-5 lg:px-12";
export const sectionY = "py-[72px] lg:py-32";
export const body = "max-w-[62ch] text-left text-[16px] leading-[1.6] font-normal md:text-[17px]";
export const copperButton =
  "inline-flex min-h-12 items-center justify-center bg-[#B87333] px-7 text-white transition-colors hover:bg-[#8F5523] motion-reduce:transition-none";
