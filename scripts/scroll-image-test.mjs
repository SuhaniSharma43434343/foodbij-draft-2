// Scroll-and-watch test for photos that appear late or blank while scrolling (W10.2). Usage:
//   node scripts/scroll-image-test.mjs [baseUrl=http://localhost:3010] [--runs=1] [--net=fast4g|slow4g] [--json=out.json] [--clear-cache=<distDir>]
// Run against a production server (next build && next start). Uses the installed Chrome (CHROME_PATH overrides).
//
// Per page, in a fresh browser context (cold browser cache): phone 360x740 (isMobile, hasTouch, DPR 2), CDP
// network throttling ~ "Fast 4G" (9 Mbps down, 1.5 Mbps up, 60 ms RTT) and a 4x CPU slowdown. After the page
// has loaded (plus 1.5 s), it scrolls at a reading pace (300 px every 120 ms) to the bottom, then waits 1 s.
// Every 150 ms (in the page) each <img> photo whose frame is on screen is checked; it counts as "empty" when
//   - the image has not arrived (!complete || naturalWidth === 0), or
//   - its reveal container is still hidden (a [data-reveal] ancestor without .is-in, or a wipe frame still
//     more than 80% clipped mid-animation), or
//   - its effective opacity (product of ancestors) is under 0.2.
// "Blank" is stricter: nothing at all is on screen (hidden, or not arrived without a placeholder colour).
// Logos and images under 40 px are ignored. Reports per page: frames seen, frames seen empty at least once,
// the worst single empty stretch, and the summed empty time.
// --net=slow4g uses DevTools' "Slow 4G" (1.6 Mbps down, 0.75 up, 150 ms RTT) instead.
// --clear-cache=<distDir> deletes <distDir>/cache/images before the run (cold server-side optimiser).
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3010").replace(/\/$/, "");
const runs = Number(flag("runs") || 1);
const jsonOut = flag("json");
const clearDir = flag("clear-cache");
// Network profiles (Chrome DevTools presets). fast4g is the default.
const NETS = {
  fast4g: { latency: 60, down: 9, up: 1.5 },
  slow4g: { latency: 150, down: 1.6, up: 0.75 },
};
const netName = flag("net") || "fast4g";
const net = NETS[netName];
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const pages = ["/", "/services/weddings", "/our-work", "/our-work/boutique-evening"];

if (clearDir) {
  const dir = path.join(clearDir, "cache", "images");
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`cleared ${dir}`);
}

// Injected before any page script: samples on-screen photos every 150 ms once window.__sitStart() is called.
const sampler = () => {
  const SAMPLE_MS = 150;
  const state = new Map(); // img -> { key, seen, everEmpty, emptySince, worst, total }
  let timer = 0;
  function effOpacity(el) {
    let o = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= Number(getComputedStyle(n).opacity) || 0;
    return o;
  }
  function sample() {
    const now = performance.now();
    const vh = innerHeight, vw = innerWidth;
    for (const img of document.querySelectorAll("img")) {
      const src = img.currentSrc || img.src || "";
      if (/\/logos\//.test(decodeURIComponent(src)) || /logos%2F/.test(src)) continue;
      // The frame: the nearest overflow-hidden ancestor (crops can make the img taller than its frame).
      let frame = img.parentElement;
      while (frame && frame !== document.body && getComputedStyle(frame).overflow === "visible") frame = frame.parentElement;
      if (!frame || frame === document.body) frame = img;
      const r = frame.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) continue;
      const visH = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const visW = Math.min(r.right, vw) - Math.max(r.left, 0);
      if (visH < 40 || visW < 40) continue;
      if (!img.checkVisibility({ visibilityProperty: true })) continue; // display:none / visibility:hidden (closed menus etc.)
      // Skip hidden-by-design layers: closed menu photos, story-viewer preload layer.
      if (img.closest("[aria-hidden='true'][data-next], .menu-photo, [inert]")) continue;
      const reveal = img.closest("[data-reveal]");
      const notArrived = !img.complete || img.naturalWidth === 0;
      // A wipe frame mid-animation still counts as empty while more than 80% of it is clipped away.
      let clipped = false;
      for (let n = img.parentElement, k = 0; n && k < 6; n = n.parentElement, k++) {
        const m = /inset\(([\d.]+)(%|px)/.exec(getComputedStyle(n).clipPath || "");
        if (m && (m[2] === "%" ? +m[1] > 80 : +m[1] > 0.8 * n.getBoundingClientRect().height)) clipped = true;
      }
      const hidden = (reveal && !reveal.classList.contains("is-in")) || clipped || effOpacity(img) < 0.2;
      const empty = notArrived || hidden;
      // "Blank" = nothing at all on screen: hidden, or not arrived with no placeholder colour behind it.
      const bg = getComputedStyle(img).backgroundColor;
      const hasPlaceholder = bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg);
      const blank = hidden || (notArrived && !hasPlaceholder);
      let s = state.get(img);
      if (!s) {
        s = { key: (img.getAttribute("src") || "").replace(/.*url=([^&]+).*/, (_, u) => decodeURIComponent(u)), seen: now, everEmpty: false, emptySince: null, worst: 0, total: 0, why: "", everBlank: false, blankSince: null, worstBlank: 0 };
        state.set(img, s);
      }
      if (blank) {
        s.everBlank = true;
        if (s.blankSince === null) s.blankSince = now;
      } else if (s.blankSince !== null) {
        s.worstBlank = Math.max(s.worstBlank, now - s.blankSince);
        s.blankSince = null;
      }
      if (empty) {
        s.everEmpty = true;
        if (s.emptySince === null) s.emptySince = now;
        s.why = notArrived ? "not loaded" : "reveal hidden";
      } else if (s.emptySince !== null) {
        const d = now - s.emptySince;
        s.worst = Math.max(s.worst, d);
        s.total += d;
        s.emptySince = null;
      }
      s.last = now;
    }
    // Frames that left the screen while empty: close their stretch at the last time they were seen.
    for (const s of state.values()) {
      if (s.blankSince !== null && s.last < now) {
        s.worstBlank = Math.max(s.worstBlank, s.last - s.blankSince + SAMPLE_MS);
        s.blankSince = null;
      }
      if (s.emptySince !== null && s.last < now) {
        const d = s.last - s.emptySince + SAMPLE_MS;
        s.worst = Math.max(s.worst, d);
        s.total += d;
        s.emptySince = null;
      }
    }
  }
  window.__sitStart = () => {
    sample();
    timer = setInterval(sample, SAMPLE_MS);
  };
  window.__sitStop = () => {
    clearInterval(timer);
    sample();
    const now = performance.now();
    const frames = [...state.values()].map((s) => {
      if (s.blankSince !== null) s.worstBlank = Math.max(s.worstBlank, now - s.blankSince);
      if (s.emptySince !== null) {
        const d = now - s.emptySince;
        s.worst = Math.max(s.worst, d);
        s.total += d;
      }
      return { key: s.key, everEmpty: s.everEmpty, worst: Math.round(s.worst), total: Math.round(s.total), why: s.why, everBlank: s.everBlank, worstBlank: Math.round(s.worstBlank) };
    });
    return frames;
  };
};

const browser = await chromium.launch({ executablePath });
const results = [];

for (let run = 1; run <= runs; run++) {
  for (const p of pages) {
    const context = await browser.newContext({
      viewport: { width: 360, height: 740 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: net.latency,
      downloadThroughput: (net.down * 1000 * 1000) / 8,
      uploadThroughput: (net.up * 1000 * 1000) / 8,
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    let imgBytes = 0;
    page.on("response", async (res) => {
      if (res.request().resourceType() !== "image") return;
      const len = Number(res.headers()["content-length"] || 0);
      imgBytes += len;
    });
    await page.addInitScript(sampler);
    const t0 = Date.now();
    await page.goto(base + p, { waitUntil: "load", timeout: 90000 });
    const loadMs = Date.now() - t0;
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.__sitStart());
    // Reading pace: 300 px every 120 ms until the bottom.
    for (let i = 0; i < 400; i++) {
      const done = await page.evaluate(() => {
        window.scrollBy(0, 300);
        return innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      });
      if (done) break;
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1000);
    const frames = await page.evaluate(() => window.__sitStop());
    const empty = frames.filter((f) => f.everEmpty);
    const row = {
      net: netName,
      run,
      page: p,
      loadMs,
      seen: frames.length,
      emptyOnce: empty.length,
      worstMs: Math.max(0, ...frames.map((f) => f.worst)),
      totalEmptyMs: frames.reduce((a, f) => a + f.total, 0),
      blankOnce: frames.filter((f) => f.everBlank).length,
      worstBlankMs: Math.max(0, ...frames.map((f) => f.worstBlank)),
      imgKB: Math.round(imgBytes / 1024),
      worstFrames: [...empty].sort((a, b) => b.worst - a.worst).slice(0, 4),
    };
    results.push(row);
    console.log(
      `${netName} run ${run} ${p.padEnd(28)} load ${String(row.loadMs).padStart(5)}ms  frames ${String(row.seen).padStart(3)}  empty-once ${String(row.emptyOnce).padStart(3)}  worst ${String(row.worstMs).padStart(5)}ms  sum ${String(row.totalEmptyMs).padStart(6)}ms  blank-once ${String(row.blankOnce).padStart(3)} worst ${String(row.worstBlankMs).padStart(5)}ms  img ${row.imgKB}KB`,
    );
    for (const f of row.worstFrames) console.log(`      ${String(f.worst).padStart(5)}ms  ${f.why.padEnd(13)} ${f.key}`);
    await context.close();
  }
}

await browser.close();
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(results, null, 2));
