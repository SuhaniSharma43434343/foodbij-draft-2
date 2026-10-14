// Record a short scroll "video" of a page for motion review, as an animated WebP.
// (Playwright's video recorder needs an ffmpeg build that is not installed on this PC, so frames are
// captured with screenshots and stitched by scripts/frames-to-webp.py.) Usage:
//   node scripts/record-motion.mjs <url> <out.webp> <width> <height> [--reduced] [--hover] [--menu]
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const [url, out, w = "360", h = "740"] = args.filter((a) => !a.startsWith("--"));
const width = +w, height = +h;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fbz-rec-"));
let n = 0;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: flag("--reduced") ? "reduce" : "no-preference" });
const page = await context.newPage();
const snap = async () => page.screenshot({ path: path.join(tmp, `f${String(n++).padStart(5, "0")}.jpg`), type: "jpeg", quality: 72 });
await page.goto(url, { waitUntil: "load" });
for (let i = 0; i < 18; i++) { await snap(); await page.waitForTimeout(90); } // the opening playing
if (flag("--menu")) {
  const btn = page.getByRole("button", { name: /menu/i }).first();
  if (await btn.count()) { await btn.click(); for (let i = 0; i < 10; i++) { await snap(); await page.waitForTimeout(80); } await page.keyboard.press("Escape"); for (let i = 0; i < 6; i++) { await snap(); await page.waitForTimeout(80); } }
}
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const step = Math.max(10, Math.round(height / 9));
let hovered = false;
for (let y = 0; y <= total + step; y += step) {
  await page.mouse.wheel(0, step);
  await page.waitForTimeout(60);
  await snap();
  if (flag("--hover") && !hovered && y > total * 0.2) {
    const names = page.locator("#services button");
    if ((await names.count()) && (await names.nth(1).isVisible())) {
      hovered = true;
      const b = await names.nth(1).boundingBox();
      for (let i = 0; i < 12 && b; i++) { await page.mouse.move(b.x + 30 + i * 10, b.y + b.height / 2 + Math.sin(i / 2) * 10); await page.waitForTimeout(40); await snap(); }
      await page.mouse.move(4, 4);
    }
  }
  if (n > 420) break;
}
for (let i = 0; i < 6; i++) { await snap(); await page.waitForTimeout(80); }
await browser.close();
const maxW = width > 1000 ? 960 : width;
execFileSync("python", ["-I", path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "frames-to-webp.py"), tmp, out, String(maxW)], { stdio: "inherit" });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`saved ${out} (${n} frames)`);
