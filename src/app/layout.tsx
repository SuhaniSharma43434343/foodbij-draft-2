import type { Metadata, Viewport } from "next";
import { Cormorant, Jost } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyPlanBar } from "@/components/StickyPlanBar";
import "./globals.css";

// Fonts from the approved taste spec: Cormorant (display) and Jost (text).
const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Foodbiz",
    default: "Foodbiz | Catering & hospitality, Mumbai",
  },
  description: "Foodbiz caters weddings, celebrations, brand launches and office dining in Mumbai.",
  // Preview build: keep out of search until the owner approves a launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1C2D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <a
          href="#main"
          className="t-button sr-only fixed top-3 left-3 z-[60] bg-navy px-5 py-4 text-white focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-copper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <StickyPlanBar />
      </body>
    </html>
  );
}
