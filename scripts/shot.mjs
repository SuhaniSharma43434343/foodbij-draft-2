// Full-page screenshot of a running page. Usage:
//   node scripts/shot.mjs <url> <out.png> [width=360] [height=800]
// Uses the installed Chrome (CHROME_PATH overrides). The dev server must already be running.
import { chromium } from "playwright-core";

const [url, out, w = "360", h = "800"] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <out.png> [width] [height]");
  process.exit(2);
}
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`saved ${out}`);
