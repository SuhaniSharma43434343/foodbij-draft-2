# Scroll images QA (W10.2): photos appearing late or blank

Test: `node scripts/scroll-image-test.mjs http://localhost:3032 [--net=fast4g|slow4g] [--clear-cache=.next-w102]`.
This is a production build on :3032. The phone is 360x740 (isMobile, touch, DPR 2) with 4x CPU slowdown and CDP network throttling. Fast 4G is 9/1.5 Mbps with 60 ms RTT; Slow 4G is 1.6/0.75 Mbps with 150 ms RTT. Each page gets a fresh browser context, so the browser cache is cold. The test scrolls 300 px every 120 ms to the bottom and samples every 150 ms.

The two measures:
- **Empty**: a frame on screen has no photo, either because it has not arrived or because its reveal is still hidden or more than 80% clipped, or because its opacity is under 0.2.
- **Blank**: nothing at all is on screen, meaning the frame is hidden, or it is empty with no placeholder colour.

Before the fix there were no placeholders, so Blank = Empty.

Method: a fair A/B. The untouched HEAD and the fixed tree were both built with webpack and served one after the other on :3032 in the same session (`--webpack`, because a temporary git worktree with linked node_modules cannot build under Turbopack). Round 1 runs with the server's image cache cleared (cold optimiser). Rounds 2 and 3 run with a warm optimiser. A parallel build was running on the machine, so single runs are noisy. Read the rounds together.

Columns: frames seen / frames empty at least once / worst empty stretch (ms) / frames blank at least once.

## Before

| Page | Fast 4G cold (r1) | Fast 4G warm (r2) | Fast 4G warm (r3) | Slow 4G cold | Slow 4G warm |
|---|---|---|---|---|---|
| / | 10 / 7 / 1151 / 7 | 10 / 0 / 0 / 0 | 10 / 2 / 151 / 2 | 10 / 4 / 324 / 4 | 10 / 4 / 297 / 4 |
| /services/weddings | 7 / 3 / 249 / 3 | 7 / 3 / 152 / 3 | 7 / 3 / 148 / 3 | 7 / 5 / 451 / 5 | 7 / 4 / 297 / 4 |
| /our-work | 13 / 9 / 182 / 9 | 13 / 7 / 191 / 7 | 13 / 4 / 151 / 4 | 13 / 11 / 171 / 11 | 13 / 4 / 150 / 4 |
| /our-work/boutique-evening | 2 / 1 / 295 / 1 | 2 / 1 / 146 / 1 | 2 / 1 / 337 / 1 | 2 / 1 / 309 / 1 | 2 / 1 / 139 / 1 |

Almost every empty frame in the Before runs was "reveal hidden": the photo had already loaded, but its reveal had not started yet.

## After

| Page | Fast 4G cold (r1) | Fast 4G warm (r2) | Fast 4G warm (r3) | Slow 4G cold | Slow 4G warm |
|---|---|---|---|---|---|
| / | 10 / 0 / 0 / 0 | 10 / 0 / 0 / 0 | 10 / 0 / 0 / 0 | 10 / 3 / 949 / **0** | 10 / 1 / 123 / **0** |
| /services/weddings | 7 / 0 / 0 / 0 | 7 / 1 / 122 / 1 | 7 / 2 / 161 / 2 | 7 / 2 / 132 / 1 | 7 / 2 / 435 / **0** |
| /our-work | 13 / 1 / 173 / 1 | 13 / 1 / 107 / 1 | 13 / 0 / 0 / 0 | 13 / 3 / 396 / 1 | 13 / 0 / 0 / 0 |
| /our-work/boutique-evening | 2 / 0 / 0 / 0 | 2 / 1 / 213 / 1 | 2 / 0 / 0 / 0 | 2 / 1 / 143 / 1 | 2 / 0 / 0 / 0 |

Blank frames dropped from 20 to 1 on Fast 4G cold, and from 21 to 3 on Slow 4G cold. The empty frames left on Slow 4G are photos still downloading: their frame shows the photo's own colour, not a white or navy box. The few blanks left are about one sample (~150 ms) long. They happen on a 300 px jump, when the frame enters before the observer's callback has run.

## What caused the blanks, and what changed

Mostly, the photos were not missing. They were being held back. Every photo frame had a scroll reveal: a bottom-up wipe or a fade. That reveal started only once the frame was 15% of a screen inside the bottom edge, then took 0.7 s (wipe) or 1.1 s (zoom settle). So for a normal scroll, each frame slid in as an empty box first. The Our-work grid had its own copy of the same timing.

On slower connections a second cause appeared. The browser's own lazy loading started photos late, and a frame that arrived early had nothing behind it. The first visit after a deploy also waits on the server converting each photo to AVIF; on Vercel this is cached at the edge after the first request.

The changes:
1. **Reveals start earlier and run shorter.** Photo reveals start 10% of a screen before the frame reaches the bottom edge. Text reveals start at 5% inside it. Wipes and fades run 0.5 s and the zoom settles in 0.8 s.
2. **Wipes wait for their photo.** A wipe opens only once its photo has loaded and decoded. The cap is 0.8 s, and the wait ends as soon as the frame comes into view.
3. **Fast scrolls skip the animation.** A photo reveal that only fires once the frame is already on screen shows at once, without animating.
4. **Photos load and decode ahead.** Each lazy photo switches to eager loading and pre-decodes when it is within 1.5 screens. Photos further down stay lazy, so long pages do not load everything up front.
5. **Placeholder colours.** Every frame paints its photo's average colour (`src/content/image-colors.json`, 87 photos, about 7 KB) until the photo arrives.
6. **Quality.** Photos are served at quality 70 (`images.qualities: [70]`). The optimiser cache is kept for 31 days.
7. **Crop zoom in `sizes`.** `sizes` now accounts for crop zoom on story photos, cropped photos and the service food band.
8. **Story viewer.** It now also preloads the next story's first photo.

Image bytes per page went down: / 446 to 381 KB, weddings 382 to 359 KB, Our work 364 to 352 KB, boutique 83 to 73 KB. The look (wipe direction, scale settle, stagger) is unchanged.

`sizes` audit (`node scripts/image-sizes-audit.mjs`): no phone downloads a desktop width. Some landscape photos in tall frames are served below their cover width, so they are slightly soft. That is a quality-versus-bytes choice and was left as it is.

## Lighthouse (mobile, :3032, Turbopack production build)

| Page | Perf | LCP | CLS | TBT |
|---|---|---|---|---|
| / (saved: lighthouse-home-w10-2.json) | 80 | 3.8 s | 0 | 230 ms |
| / (re-runs) | 84 / 85 | 3.6 / 3.8 s | 0 | 160 / 120 ms |
| /services/weddings (saved: lighthouse-weddings-w10-2.json) | 74 | 4.0 s | 0 | 420 ms |
| /services/weddings (re-runs) | 87 / 85 | 3.5 / 3.7 s | 0 | 150 / 170 ms |

The W9 reference was home 85 / LCP 3.5 s and weddings 83 / LCP 3.4 s. The first runs were slowed down by a parallel build on the same machine (see the TBT). The re-runs match W9.

CLS is 0 on all six main pages at 360 and 1440 px while scrolling. There are no console errors, and nothing is left hidden at the bottom. `node scripts/a11y-check.mjs http://localhost:3032` reports all checks passed.
