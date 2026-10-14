// Font trial page (W1.1): four display + text pairings, each shown on white and on navy.
import type { CSSProperties } from "react";
import { bodoniModa, cormorant, fraunces, hankenGrotesk, instrumentSerif, jost } from "./fonts";

type Pair = { id: string; label: string; display: string; text: string; displayWeight?: number };

const pairs: Pair[] = [
  { id: "a", label: "Pair A - Bodoni Moda + Jost", display: bodoniModa.style.fontFamily, text: jost.style.fontFamily, displayWeight: 400 },
  { id: "b", label: "Pair B - Instrument Serif + Jost", display: instrumentSerif.style.fontFamily, text: jost.style.fontFamily, displayWeight: 400 },
  { id: "c", label: "Pair C - Cormorant + Hanken Grotesk", display: cormorant.style.fontFamily, text: hankenGrotesk.style.fontFamily, displayWeight: 500 },
  { id: "d", label: "Pair D - Fraunces + Hanken Grotesk", display: fraunces.style.fontFamily, text: hankenGrotesk.style.fontFamily, displayWeight: 400 },
];

const NAVY = "#0B1C2D";
const COPPER = "#B87333";
const BODY =
  "Live counters, the family dishes that must be there, and a team that runs the evening so you can be in it. Tell us who is coming and what they love to eat; we build the menu around that.";

const h1: CSSProperties = { fontSize: "clamp(2rem, 1.4rem + 3vw, 4.25rem)", lineHeight: 1.08, letterSpacing: "-0.01em" };
const h2: CSSProperties = { fontSize: "clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.01em" };
const caps: CSSProperties = { fontSize: "13px", letterSpacing: "0.14em", fontWeight: 500, textTransform: "uppercase" };

export const metadata = { title: "Font trial | Foodbiz sketch", robots: { index: false, follow: false } };

export default function FontTrialPage() {
  return (
    <main className="bg-white px-4 py-10 md:px-8" style={{ color: NAVY }}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-16">
        {pairs.map((p) => {
          const display: CSSProperties = { fontFamily: p.display, fontWeight: p.displayWeight };
          const text: CSSProperties = { fontFamily: p.text };
          return (
            <section key={p.id} aria-label={p.label}>
              <p className="mb-3" style={{ ...text, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.16em" }}>
                {p.label}
              </p>

              <div className="border border-black/10 bg-white px-4 py-10 md:px-10 md:py-14">
                <h1 style={{ ...display, ...h1, color: NAVY }}>We cook. We host. You enjoy your own event.</h1>
                <h2 className="mt-8" style={{ ...display, ...h2, color: NAVY }}>Weddings</h2>
                <p
                  className="mt-4 max-w-[62ch] text-left text-[16px] md:text-[17px]"
                  style={{ ...text, fontWeight: 400, lineHeight: 1.6, color: NAVY, opacity: 0.85 }}
                >
                  {BODY}
                </p>
                <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" style={{ ...text, ...caps, color: NAVY }}>
                  <span>Services</span>
                  <span>Our work</span>
                  <span>Our story</span>
                </nav>
                <button
                  type="button"
                  className="mt-8 inline-flex min-h-12 items-center rounded-none px-6"
                  style={{ ...text, ...caps, background: COPPER, color: "#fff" }}
                >
                  Plan your event
                </button>
              </div>

              <div className="px-4 py-10 text-white md:px-10 md:py-14" style={{ background: NAVY }}>
                <h2 style={{ ...display, ...h2 }}>Celebrations &amp; private dining</h2>
                <p
                  className="mt-4 max-w-[62ch] text-left text-[16px] md:text-[17px]"
                  style={{ ...text, fontWeight: 400, lineHeight: 1.6, opacity: 0.85 }}
                >
                  {BODY}
                </p>
                <p className="mt-6" style={{ ...display, ...h2, fontStyle: "italic" }}>
                  Leave the stress to us. Be present.
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
