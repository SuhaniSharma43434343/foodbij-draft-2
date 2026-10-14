# Accessibility and speed QA (W5.1, 2026-10-14)

Hand-in QA against the production build (`npm run build && npm run start`, port 3010). The approved
look is unchanged; the fixes below are spacing-neutral or invisible.

## What was checked

Automated, every page at 360x800 (`scripts/a11y-check.mjs`: 10 main pages + all 13 story pages):

- `<html lang="en">`, a unique `<title>` per page
- exactly one `<h1>`, no skipped heading levels
- every `<img>` has an `alt` attribute (all alt texts printed with `--alts` and read by hand:
  photos are described, the stacked header logos are `alt=""` inside a link labelled "Foodbiz, home")
- no positive `tabindex`, nothing focusable inside `aria-hidden`
- every input, select and textarea has a label (`<label for>` or aria)
- text contrast on solid grounds (composited colours, WCAG AA 4.5:1, 3:1 for large text)
- tap targets (a, button, input, select, textarea, summary) at least 44x44
- `document.documentElement.scrollWidth` = 360 (no sideways scroll)
- keyboard: phone menu opens from the keyboard, focus moves in, Tab and Shift+Tab stay inside,
  Escape closes, focus returns to "Menu"; the skip link is the first Tab stop, visible, and moves
  focus to `<main>`; every Tab stop on `/`, `/our-work` (filters) and `/plan-your-event` (form) shows
  a focus ring

By reading the code: the enquiry form (labels, `aria-invalid`, `aria-describedby` hints and errors,
`role="alert"`, a polite `role="status"`), the filter toggles (`aria-pressed`, a live story count),
reduced motion (global CSS rule, the card hover zoom has `motion-reduce` overrides).

Lighthouse 12 (mobile preset) on `/`, `/services/weddings`, `/our-work`.

## What was fixed

Accessibility

- **Logo links** (header, phone menu, footer) were 132x30 tap targets: now 44px tall through 7px of
  padding cancelled by a negative margin (no visual change).
- **Footer Privacy / Terms** were 42 and 34px wide: 5px side padding with a negative margin, now 44px+.
- **Our work filter row**: the sideways-scrolling row clipped the top of the focus ring. It now has
  4px of vertical padding taken off its top margin, so the ring shows whole and nothing moves.
- **Enquiry form**: the scroll to the status message ignored reduced motion (JS `behavior: "smooth"`);
  it now jumps when `prefers-reduced-motion: reduce`.
- Sketch removed: `src/app/sketch/` and `HideOnSketch` deleted; header, sticky bar and footer no
  longer check the route for it (the footer is a plain server component again).

Speed

- **Images served as AVIF** first, WebP as fallback (`next.config.ts`). A 750w story photo went from
  110 KB (WebP) to 58 KB. Page weight (Lighthouse, mobile): home 666 -> 442 KiB, Weddings 421 -> 339 KiB,
  Our work 778 -> 511 KiB.
- **Home hero `sizes`** was `(orientation: portrait) 115vh`, which made phones fetch the largest file;
  now `(min-width: 1024px) 56vw, 100vw` (matches the box: the phone gets the 750w file).
- **Only the hero is preloaded**: React was also preloading both header logos at high priority
  (any non-lazy image is auto-preloaded). They now load eagerly at `fetchPriority="low"`, so the hero
  photo is the only image preload. Hero images (home, service pages, story pages) carry
  `fetchPriority="high"`.
- **Our work**: the first story card (the page's largest paint) was lazy-loaded; it is now preloaded.
- **Fonts**: Cormorant 600 was loaded but never used; only 500 (+ italic 500) and Jost 400/500 remain.
- **Favicon**: `/favicon.ico` 404'd on every page (a console error in Lighthouse). Added
  `src/app/icon.svg`: a navy square with the copper stroke from the logo's "/" (owner may swap it).
- CLS was already 0 everywhere (all images sit in fixed aspect boxes or have width and height).

## Lighthouse, mobile (before -> after)

Before: one run after the sketch removal, before the speed fixes. After: median of three runs.
JSON in this folder (`lighthouse-<page>.json` = after, `lighthouse-<page>-before.json` = before).

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | Weight |
|---|---|---|---|---|---|---|---|
| Home | 81 -> 78 | 96 -> 96 | 93 -> 96 | 66 -> 66 | 3.9 -> 3.7 s | 300 -> 490 ms | 666 -> 442 KiB |
| Weddings | 77 -> 79 | 96 -> 96 | 93 -> 96 | 66 -> 66 | 3.2 -> 3.3 s | 610 -> 510 ms | 421 -> 339 KiB |
| Our work | 78 -> 82 | 96 -> 96 | 93 -> 96 | 66 -> 66 | 3.4 -> 3.8 s | 560 -> 270 ms | 778 -> 511 KiB |

How to read the performance numbers: this laptop scored a CPU benchmark of about 400-470 during the
runs (Lighthouse expects a fast desktop well above 1,000), and the three "after" runs per page spread
by up to 11 points (home 74-85). The score is dominated by Total Blocking Time, which is React and
Next.js starting up (two framework chunks, ~160 KB and ~230 KB raw) under 4x CPU throttling; LCP is
almost all "render delay" behind that same work, not image download (the hero arrives in ~0.4 s).
Unthrottled in Chrome the first paint and LCP land at about 0.25-0.45 s. Bytes dropped by a third,
which is what a real phone on a slow network feels. Expect higher numbers on pagespeed.web.dev once
deployed (fast server, CDN, a calibrated test machine).

Accessibility 96: the only failing audit is colour contrast on the copper buttons (white on copper,
3.8:1), the known owner-approved exception (taste spec: use `#A0612A` for AA if wanted).
SEO 66: "page is blocked from indexing" (noindex, X-Robots-Tag, robots.txt disallow). Intended until
launch; must stay.

## Remaining known issues

- Copper button labels 3.8:1 (owner-approved exception, see above).
- Best practices 96: `image-aspect-ratio` on the two header logos is a rounding false positive
  (the 256w file is 256x58, Chrome reports 132x29 at the density used; the logo is not distorted).
- Total Blocking Time is framework start-up; removing it would mean fewer client components
  (header, sticky bar, filters, form are client-side by need). Not a cheap win.
- Lighthouse "legacy JavaScript" (13 KiB) and "unused JavaScript" (~28 KiB) are inside Next.js'
  own chunks.
- The Cormorant italic file is preloaded on every page although the italic line sits below the fold;
  next/font cannot preload one style and not the other. ~35 KB.
- `/favicon.ico` is no longer requested by browsers that read `<link rel="icon">`; very old ones
  may still ask for it.
- Not done here (needs people and devices): real Android and iPhone checks, the "fresh pair of eyes"
  test from 06-GUIDE step 7, and a screen-reader pass (VoiceOver / TalkBack).

## Re-run

```bash
npm run build && npm run start            # port 3010; check nothing else holds it: netstat -ano | findstr :3010
node scripts/a11y-check.mjs               # add --alts to print every alt text; exit 1 on any problem
CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" \
  npx -y lighthouse@12 http://localhost:3010/ --output=json \
  --output-path=docs/qa/lighthouse-home.json --chrome-flags="--headless=new" --quiet
# same for /services/weddings -> lighthouse-weddings.json and /our-work -> lighthouse-our-work.json
```

Final screenshots after these fixes: `docs/design/shots/final/` (home and Weddings, 360 and 1440,
first screen and full page).
