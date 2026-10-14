// Accessibility smoke check for every page. Usage:
//   node scripts/a11y-check.mjs [baseUrl=http://localhost:3010] [--alts]
// Run against the production server (npm run build && npm run start). Uses the installed Chrome
// (CHROME_PATH overrides). At 360x800 it reports per page: <title>, html lang, h1 count, skipped
// heading levels, images without an alt attribute, positive tabindex / focusable-but-aria-hidden
// elements, form controls without a label, text contrast on solid grounds, tap targets under 44x44 (a, button, input, select,
// textarea, summary) and the page width (scrollWidth > 360 means sideways scroll).
// It then checks the phone menu (opens, Tab stays inside, Escape closes, focus returns) and the
// skip link. --alts also prints every image's alt text for a manual read. Exit code 1 on a failure.
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const showAlts = args.includes("--alts");
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3010").replace(/\/$/, "");
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const pages = [
  "/", "/services/weddings", "/services/celebrations", "/services/brand-launches", "/services/corporate-dining",
  "/our-work", "/our-story", "/plan-your-event", "/privacy", "/terms",
];

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });

// Story pages: read every /our-work/<slug> link from the index so new stories are covered too.
await page.goto(`${base}/our-work`, { waitUntil: "networkidle" });
const storyLinks = await page.$$eval('main a[href^="/our-work/"]', (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
pages.push(...storyLinks);

let failures = 0;
const titles = new Map();

for (const path of pages) {
  const res = await page.goto(base + path, { waitUntil: "networkidle" });
  const r = await page.evaluate(() => {
    // Text contrast: composite each text element's colour over the solid backgrounds behind it.
    // Text over a photo or gradient is skipped (checked by eye in the screenshots). White on copper
    // (the button labels, 3.8:1) is the owner-approved exception and is not counted.
    function contrastProblems(visible, label) {
      // Any CSS colour (rgb, oklab, color-mix...) to [r, g, b, a] via a 1px canvas.
      const ctx = Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true });
      const parse = (c) => {
        if (c === "transparent" || /\/ 0\)$|, 0\)$/.test(c)) return [0, 0, 0, 0];
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
      };
      const over = (top, under) => {
        const a = top[3] + under[3] * (1 - top[3]);
        if (a === 0) return [0, 0, 0, 0];
        return [0, 1, 2].map((i) => (top[i] * top[3] + under[i] * under[3] * (1 - top[3])) / a).concat(a);
      };
      const lum = (c) => {
        const [r, g, b] = c.slice(0, 3).map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        if (!visible(el) || el.closest(".sr-only,svg")) continue;
        const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!own) continue;
        const layers = [];
        let photo = false;
        for (let a = el; a; a = a.parentElement) {
          const st = getComputedStyle(a);
          if (st.backgroundImage !== "none") { photo = true; break; }
          const bg = parse(st.backgroundColor);
          if (bg[3] > 0) layers.push(bg);
          if (bg[3] >= 1) break;
          // A positioned box with an <img> sibling earlier in the parent sits over a photo.
          if (st.position === "absolute" && a.parentElement?.querySelector(":scope > div > img, :scope > img")) { photo = true; break; }
        }
        if (photo) continue;
        let bg = [255, 255, 255, 1];
        for (const l of layers.reverse()) bg = over(l, bg);
        const st = getComputedStyle(el);
        const fg = over(parse(st.color), bg);
        const L1 = lum(fg), L2 = lum(bg);
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const size = parseFloat(st.fontSize);
        const large = size >= 24 || (size >= 18.66 && +st.fontWeight >= 700);
        const copper = bg.slice(0, 3).join() === "184,115,51";
        if (ratio < (large ? 3 : 4.5) && !copper) out.push(`${ratio.toFixed(2)}:1 ${size}px ${label(el)}`);
      }
      return [...new Set(out)];
    }

    const visible = (el) => {
      const s = getComputedStyle(el);
      const b = el.getBoundingClientRect();
      return s.display !== "none" && s.visibility !== "hidden" && b.width > 0 && b.height > 0 && !el.closest("[hidden],[inert]");
    };
    const label = (el) => (el.outerHTML.slice(0, 110) + "...").replace(/\s+/g, " ");
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map((h) => +h.tagName[1]);
    const skips = [];
    headings.forEach((lvl, i) => {
      if (i > 0 && lvl > headings[i - 1] + 1) skips.push(`h${headings[i - 1]} -> h${lvl}`);
    });
    const imgs = [...document.querySelectorAll("img")];
    const small = [...document.querySelectorAll("a[href],button,input,select,textarea,summary")]
      .filter(visible)
      .filter((el) => !el.closest("[aria-hidden='true']") && !el.matches(".sr-only"))
      .map((el) => ({ el, b: el.getBoundingClientRect() }))
      // Inline links inside running text are exempt from the 44px rule (WCAG 2.5.8 inline exception).
      .filter(({ el }) => !(el.tagName === "A" && getComputedStyle(el).display === "inline" && el.closest("p,li")?.textContent.trim().length > el.textContent.trim().length + 20))
      .filter(({ el, b }) => (el.type === "radio" || el.type === "checkbox" ? false : b.height < 43.5 || b.width < 43.5))
      .map(({ el, b }) => `${Math.round(b.width)}x${Math.round(b.height)} ${label(el)}`);
    const controls = [...document.querySelectorAll("input:not([type=hidden]),select,textarea")].filter(
      (el) => !(el.labels && el.labels.length) && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"),
    );
    return {
      title: document.title,
      lang: document.documentElement.lang,
      h1: headings.filter((l) => l === 1).length,
      skips,
      noAlt: imgs.filter((i) => !i.hasAttribute("alt")).map(label),
      alts: imgs.map((i) => i.getAttribute("alt")),
      tabindex: [...document.querySelectorAll("[tabindex]")].filter((el) => +el.getAttribute("tabindex") > 0).map(label),
      hiddenFocusable: [...document.querySelectorAll("[aria-hidden='true'] a[href], [aria-hidden='true'] button, a[aria-hidden='true'], button[aria-hidden='true']")]
        .filter((el) => visible(el) && el.tabIndex >= 0)
        .map(label),
      unlabeled: controls.map(label),
      small,
      contrast: contrastProblems(visible, label),
      width: document.documentElement.scrollWidth,
    };
  });
  const problems = [];
  if (res.status() !== 200) problems.push(`status ${res.status()}`);
  if (r.lang !== "en") problems.push(`lang="${r.lang}"`);
  if (r.h1 !== 1) problems.push(`${r.h1} h1`);
  if (r.skips.length) problems.push(`heading skips: ${r.skips.join(", ")}`);
  if (r.noAlt.length) problems.push(`images without alt: ${r.noAlt.join(" | ")}`);
  if (r.tabindex.length) problems.push(`positive tabindex: ${r.tabindex.join(" | ")}`);
  if (r.hiddenFocusable.length) problems.push(`focusable inside aria-hidden: ${r.hiddenFocusable.join(" | ")}`);
  if (r.unlabeled.length) problems.push(`unlabelled controls: ${r.unlabeled.join(" | ")}`);
  if (r.contrast.length) problems.push(`low contrast text:\n      ${r.contrast.join("\n      ")}`);
  if (r.small.length) problems.push(`tap targets under 44px:\n      ${r.small.join("\n      ")}`);
  if (r.width > 360) problems.push(`scrollWidth ${r.width} (sideways scroll)`);
  if (titles.has(r.title)) problems.push(`title duplicates ${titles.get(r.title)}`);
  titles.set(r.title, path);
  failures += problems.length;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${path}  "${r.title}"  h1=${r.h1} imgs=${r.alts.length} width=${r.width}`);
  for (const p of problems) console.log(`    - ${p}`);
  if (showAlts) r.alts.forEach((a) => console.log(`      alt: ${a === "" ? '"" (decorative)' : a}`));
}

// Phone menu: open with the keyboard, Tab cycles inside, Escape closes, focus returns to "Menu".
await page.goto(base + "/", { waitUntil: "networkidle" });
const menu = page.locator('button[aria-controls="site-menu"]');
await menu.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(200);
const menuSteps = [];
const inside = () => page.evaluate(() => !!document.activeElement?.closest("#site-menu"));
menuSteps.push(["menu opens", await page.locator("#site-menu").isVisible()]);
menuSteps.push(["focus moves into menu", await inside()]);
let stayed = true;
for (let i = 0; i < 20; i++) {
  await page.keyboard.press("Tab");
  if (!(await inside())) stayed = false;
}
for (let i = 0; i < 5; i++) {
  await page.keyboard.press("Shift+Tab");
  if (!(await inside())) stayed = false;
}
menuSteps.push(["Tab / Shift+Tab stay inside", stayed]);
await page.keyboard.press("Escape");
await page.waitForTimeout(200);
menuSteps.push(["Escape closes", !(await page.locator("#site-menu").isVisible())]);
menuSteps.push([
  "focus returns to Menu",
  await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "site-menu"),
]);

// Skip link: first Tab lands on it, it is visible, Enter moves focus to <main>.
await page.goto(base + "/our-story", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const skip = await page.evaluate(() => {
  const el = document.activeElement;
  const b = el.getBoundingClientRect();
  return { text: el.textContent.trim(), visible: b.width > 1 && b.height > 1 };
});
menuSteps.push(["skip link is first and visible", skip.text === "Skip to content" && skip.visible]);
await page.keyboard.press("Enter");
await page.waitForTimeout(100);
menuSteps.push(["skip link moves focus to main", await page.evaluate(() => document.activeElement?.id === "main")]);

// Focus ring: every Tab stop shows an outline or box-shadow on keyboard focus (pages with the most
// kinds of control: home, the filters on Our work, the enquiry form).
const noRing = [];
for (const path of ["/", "/our-work", "/plan-your-event"]) {
await page.goto(base + path, { waitUntil: "networkidle" });
for (let i = 0; i < 60; i++) {
  await page.keyboard.press("Tab");
  const f = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const s = getComputedStyle(el);
    const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none";
    return { ring, html: el.outerHTML.slice(0, 90) };
  });
  if (f && !f.ring) noRing.push(`${path}: ${f.html}`);
}
}
menuSteps.push([`focus ring on every Tab stop (/, /our-work, /plan-your-event)${noRing.length ? ": missing on " + noRing.join(" | ") : ""}`, noRing.length === 0]);

console.log("\nKeyboard checks (360px):");
for (const [name, ok] of menuSteps) {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
  if (!ok) failures++;
}

await browser.close();
console.log(failures ? `\n${failures} problem(s)` : "\nall checks passed");
process.exit(failures ? 1 : 0);
