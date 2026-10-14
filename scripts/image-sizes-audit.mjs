// next/image `sizes` audit (W10.2). Usage: node scripts/image-sizes-audit.mjs [baseUrl=http://localhost:3010]
// Loads each page at 360, 390 and 430 px wide (DPR 2), scrolls through it so lazy photos load, and lists every
// photo whose downloaded width is far from what its frame needs on screen: "big" = more than 1.6x the device
// pixels needed (wasted bytes), "soft" = under 0.8x (upscaled). Needed width = the rendered image width
// (object-cover over the img box, so crop zooms count) x DPR.
import { chromium } from "playwright-core";

const base = (process.argv[2] || "http://localhost:3010").replace(/\/$/, "");
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pages = ["/", "/services/weddings", "/our-work", "/our-work/boutique-evening", "/our-story", "/plan-your-event"];
const browser = await chromium.launch({ executablePath });
let flagged = 0;
for (const width of [360, 390, 430]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "load" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      // Horizontal carousels: reveal every slide.
      for (const el of document.querySelectorAll("*")) {
        if (el.scrollWidth > el.clientWidth + 20 && getComputedStyle(el).overflowX !== "visible") el.scrollLeft = el.scrollWidth;
      }
      await new Promise((r) => setTimeout(r, 1500));
    });
    const rows = await page.evaluate(() =>
      [...document.querySelectorAll("img")]
        .filter((i) => i.complete && i.naturalWidth > 0 && i.currentSrc.includes("/_next/image") && !i.currentSrc.includes("logos"))
        .map((i) => {
          const r = i.getBoundingClientRect();
          if (r.width < 40) return null;
          const u = new URL(i.currentSrc);
          const w = Number(u.searchParams.get("w"));
          // object-cover: the image is scaled to cover the box; transforms (crop zoom) scale it further.
          const ratio = i.naturalWidth / i.naturalHeight;
          const boxW = i.offsetWidth, boxH = i.offsetHeight;
          const cover = Math.max(boxW, boxH * ratio);
          const scale = r.width / (boxW || 1); // transform scale
          const needed = Math.round(cover * scale * devicePixelRatio);
          return { src: decodeURIComponent(u.searchParams.get("url") || "").split("/").pop(), w, needed, sizes: i.sizes };
        })
        .filter(Boolean),
    );
    for (const r of rows) {
      const k = r.w / r.needed;
      if (k > 1.6 || k < 0.8) {
        flagged++;
        console.log(`${width} ${p.padEnd(28)} ${k > 1.6 ? "big " : "soft"} got ${String(r.w).padStart(4)}w need ${String(r.needed).padStart(4)}  ${r.src}  [${r.sizes}]`);
      }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`${flagged} flagged`);
