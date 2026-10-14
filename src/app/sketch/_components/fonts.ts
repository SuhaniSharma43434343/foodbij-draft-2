// Fonts chosen in the taste spec: Cormorant (display) and Jost (text). Exposed as CSS variables
// so server and client components share them through the page wrapper.
import { Cormorant, Jost } from "next/font/google";

export const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sk-display",
});

export const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-sk-text",
});
