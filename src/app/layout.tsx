import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroPrefetch } from "@/components/HeroPrefetch";
import { HistoryEntrance } from "@/components/HistoryEntrance";
import { RevealObserver } from "@/components/RevealObserver";
import { StickyCta } from "@/components/StickyCta";
import "./globals.css";

// Display: Instrument Serif, one weight. The italic (only the founders' line, far below the first
// screen) is a separate face that is not preloaded, so it never competes with the first paint.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
  display: "swap",
  variable: "--font-instrument",
});
const instrumentItalic = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  preload: false,
  variable: "--font-instrument-italic",
});

// Text: Manrope, variable; the site uses 400 and 500.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: { template: "%s · Foodbiz", default: "Foodbiz · Catering and hospitality, Mumbai" },
  description: "Foodbiz caters weddings, celebrations, brand launches and office dining in Mumbai.",
  // Preview build: kept out of search (also an X-Robots-Tag header and robots.ts).
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1C2D",
};

// Runs before first paint.
// 1. Turns on the scroll-reveal states only when motion is welcome, so without JavaScript (or with reduced
//    motion) every element is simply visible.
// 2. Plays the opening (.opening, html.intro) on the homepage once per visit: not on back/forward, not on a reload in the same
//    session, not with reduced motion. It never blocks the page (pointer-events: none) and ends on its own
//    in CSS even if nothing else runs; the class is cleared afterwards so later visits to the homepage
//    within the visit use the lighter entrance.
const motionScript = [
  "try{var d=document.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;",
  "if(!rm&&'IntersectionObserver' in window)d.classList.add('mo');",
  "var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];",
  "if(!rm&&location.pathname==='/'&&!(n&&n.type==='back_forward')&&!sessionStorage.getItem('fb-intro')){",
  "sessionStorage.setItem('fb-intro','1');d.classList.add('intro');",
  "setTimeout(function(){d.classList.remove('intro')},2300)}}catch(e){}",
].join("");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${instrumentItalic.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <div className="opening" aria-hidden="true">
          <div className="opening-panel">
            <span className="opening-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="opening-logo" src="/logos/foodbiz-2026-white-400w.webp" alt="" width={400} height={91} />
              <span className="opening-rule" />
            </span>
          </div>
        </div>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <RevealObserver />
        <HistoryEntrance />
        <HeroPrefetch />
      </body>
    </html>
  );
}
