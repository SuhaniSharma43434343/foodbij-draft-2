// Phone interaction walkthrough (360x740, touch) as an animated WebP: story viewer, thumb dock + services
// sheet, and the step-by-step Plan your event. Usage: node scripts/record-phone-interactions.mjs <base> <out.webp>
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [base = "http://localhost:3030", out = "docs/design/motion/phone-interactions.webp"] = process.argv.slice(2);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fbz-int-"));
let n = 0;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const snap = async (k = 1, gap = 90) => { for (let i = 0; i < k; i++) { await page.screenshot({ path: path.join(tmp, `f${String(n++).padStart(5, "0")}.jpg`), type: "jpeg", quality: 72 }); await page.waitForTimeout(gap); } };

// 1. Story viewer from the homepage
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(800);
const card = page.locator('a[href^="/our-work/"]').filter({ has: page.locator("img") }).first();
await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await snap(6);
await card.click(); await snap(14);
await page.mouse.click(300, 370); await snap(12);
await page.mouse.click(300, 370); await snap(12);
await page.keyboard.press("Escape"); await snap(6);

// 2. Thumb dock + services sheet
await page.evaluate(() => window.scrollBy(0, 600)); await page.waitForTimeout(500); await snap(5);
const svc = page.getByRole("button", { name: /services/i }).last();
if (await svc.count()) { await svc.click(); await snap(12); await page.keyboard.press("Escape"); await snap(5); }

// 3. Step-by-step plan
await page.goto(base + "/plan-your-event?service=weddings", { waitUntil: "load" });
await page.waitForTimeout(900); await snap(8);
const next = page.getByRole("button", { name: /^next/i }).first();
const step = async (fn) => { try { await fn(); } catch {} await page.waitForTimeout(150); await next.click().catch(() => {}); await snap(8); };
await step(async () => {}); // occasion preselected via ?service=
await step(async () => page.locator("#enquiry-date").fill("March 2027"));
await step(async () => page.evaluate(() => document.getElementById("enquiry-guests-150-300")?.click()));
await step(async () => page.locator("#enquiry-city").fill("Mumbai"));
await browser.close();
execFileSync("python", ["-I", path.join(path.dirname(path.resolve(process.argv[1])), "frames-to-webp.py"), tmp, out, "360"], { stdio: "inherit" });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`saved ${out} (${n} frames)`);
