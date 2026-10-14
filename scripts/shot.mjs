// Full-page screenshot of a running page. Usage:
//   node scripts/shot.mjs <url> <out.png> [width=360] [height=800] [--fold]
// --fold captures only the first screen. Uses the installed Chrome (CHROME_PATH overrides).
// The dev server must already be running.
//
// Tall pages: Chrome cannot capture more than 16,384 device pixels in one go (8,192 CSS px at 2x),
// and lazy images below the first screen never load in a single full-page capture. So the page is
// first scrolled to the bottom to load everything, then captured in viewport-sized slices that are
// stitched into one PNG (fixed elements are hidden after the first slice so they are not repeated).
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import fs from "node:fs";

const args = process.argv.slice(2);
const fold = args.includes("--fold");
const [url, out, w = "360", h = "800"] = args.filter((a) => a !== "--fold");
if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <out.png> [width] [height] [--fold]");
  process.exit(2);
}
const width = +w, height = +h, scale = 2;
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
await page.goto(url, { waitUntil: "load" });
await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
await page.evaluate(() => document.fonts.ready);

if (fold) {
  await page.screenshot({ path: out });
} else {
  // Load lazy images: walk down the page one screen at a time, then wait for every image.
  const total = await page.evaluate(async (step) => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    const pending = [...document.images].map((i) => (i.complete ? 0 : new Promise((r) => i.addEventListener("load", r, { once: true }))));
    await Promise.race([Promise.all(pending), new Promise((r) => setTimeout(r, 8000))]); // never hang on one image
    window.scrollTo(0, 0);
    return document.documentElement.scrollHeight;
  }, height);
  await page.waitForTimeout(300);

  // Capture slice by slice and stitch.
  const outPng = new PNG({ width: width * scale, height: total * scale });
  for (let y = 0, slice = 0; y < total; y += height, slice++) {
    const top = Math.min(y, total - height);
    await page.evaluate((t) => window.scrollTo(0, t), top);
    if (slice === 1) {
      // Hide fixed/sticky chrome after the first slice so it is not repeated down the image.
      await page.addStyleTag({ content: "[data-shot-hide],header,[class*='fixed'],[style*='position: fixed']{visibility:hidden!important}" });
    }
    await page.waitForTimeout(120);
    const buf = PNG.sync.read(await page.screenshot());
    const skip = (y - top) * scale; // last slice overlaps the previous one
    PNG.bitblt(buf, outPng, 0, skip, buf.width, buf.height - skip, 0, y * scale);
  }
  fs.writeFileSync(out, PNG.sync.write(outPng));
}
await browser.close();
console.log(`saved ${out}`);
