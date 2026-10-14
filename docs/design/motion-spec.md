# Motion spec (2026-10-14)

The owner asked for interactions, scroll effects and animations. This replaces the taste spec's
"almost none" motion section. Rule of thumb: slow, soft and sure, like a waiter setting a table.
Nothing bounces, spins or flashes. Every effect is off under `prefers-reduced-motion: reduce`.

## Tokens
- Ease: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (expo-out feel), `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`.
- Durations: micro 200-240ms (hover/focus), reveals 600-700ms, hero intro 700ms per line, Ken Burns 14s (ambient, the only long one).
- Distances: reveal translateY 28px (phone 20px); stagger 90ms per item, max 6 items.

## Effects
1. **Opening (home, service heroes, story heroes):** headline lines rise in (translateY 100% -> 0 inside
   an overflow-hidden line wrapper, 700ms, 80ms stagger per line), then lead and button fade up
   (start at 350ms). Pure CSS on first paint (no JS gate). The headline animates from a visible state (translateY 18px + opacity 0.001 is NOT allowed; use translateY only, from 0.35em, with opacity starting at 1), so LCP holds. A fine copper rule draws in under the lead (scaleX 0 -> 1, 700ms). Hero photo:
   slow scale 1.08 -> 1.0 over 14s ease-out, once; plus scroll parallax (photo moves at ~85% of scroll
   while the hero is in view).
2. **Scroll reveals:** sections' headings, paragraphs, images and cards fade up (opacity 0 -> 1,
   translateY 28px -> 0, 700ms) when 15% in view; grids stagger children. One IntersectionObserver
   for the whole page; elements marked `data-reveal` (and `data-reveal-stagger` on a parent).
   Content is visible without JS (the hidden state is only applied after JS adds `.js-motion` to <html>).
3. **Image reveal:** large photos (service rows, story hero) unveil with a clip-path inset wipe from
   bottom (inset(100% 0 0 0) -> inset(0)), 700ms, with the image scaling 1.12 -> 1.0.
4. **Parallax:** images inside `[data-parallax]` frames translate up to ±6% of their height with scroll
   (CSS scroll-driven `animation-timeline: view()` where supported; no JS fallback needed - static is fine).
5. **Food gallery (desktop >=1024px):** the navy band pins (position: sticky) and the photo row moves
   sideways as the visitor scrolls down (height of the section = row overflow + 100vh). CSS scroll-driven
   where supported; elsewhere it falls back to the current asymmetric grid. Phone keeps the swipe row.
6. **Hover/focus (pointer devices only, `@media (hover:hover)`):** image zoom 1.0 -> 1.04 (700ms) in its
   frame on cards; ArrowLink arrow slides 6px right and the label gets a copper underline drawing in
   from the left; solid buttons get a darker copper (#9E5F27) sweep from left to right behind the label
   (label stays white); outline buttons fill copper with white label; nav links get an underline that
   draws in. Same feedback on :focus-visible.
7. **Header:** hides (translateY(-100%)) when scrolling down past 120px, returns on scroll up;
   always shown when the menu is open or focus is inside it.
8. **Smooth scroll:** Lenis (desktop pointer only; `syncTouch: false`), lerp ~0.1, anchor links handled
   with the header offset; disabled under reduced motion and when the phone menu is open.
9. **Section numerals and rules:** copper rules draw in (scaleX 0 -> 1 from the left, 700ms) on reveal.
10. **Page transitions:** cross-fade via the View Transitions API only if cheap (Next 16 `viewTransition` / CSS `@view-transition { navigation: auto }`); otherwise skip.
11. **Sticky Plan bar (phone):** slides up/down (translateY) instead of popping.
12. **Our work filter:** cards fade/settle into place when the filter changes (opacity + translateY, 300-400ms, stagger); no reflow animation of layout properties.
13. **Phone tap feedback:** cards and buttons get an :active state (scale 0.98 / darker copper), 120ms.
14. **Form fields:** calm focus (border to copper-deep, 200ms) on top of the existing focus ring.

## Guardrails
- Desktop-only parallax; 360px designed and tested first.
- No layout shift: transforms and opacity only; no animating width/height/top.
- Above-the-fold text must paint without JS; LCP image must not start transparent.
- Total motion JS small (Lenis ~4 KB + our ~2 KB); no animation framework.
- Respect `prefers-reduced-motion: reduce` everywhere: no transforms, no parallax, no smooth scroll,
  reveal elements simply visible.

---

# Expressive pass (W7, 2026-10-14) - supersedes the calm limits above where they conflict

The owner found the site "too much simple", "way too plain" on mobile, and wants an "experience":
raise motion from calm to **expressive, cinematic luxury**. Navigation stays simple; every brief rule
stays (no invented facts, no sub-brands, pack photos only, phone first).

Shared primitive: `src/components/motion/useScrollProgress.ts` writes `--p` (0..1) and optional
`data-step` on a section; effects are CSS driven by `var(--p)`. Pins are `position: sticky`.

1. Opening: copper slash (from the logo's "/") draws in; headline lines reveal through masks; photo
   settles from 1.08. On scroll the photo scales down into a framed "plate" (inset with a navy margin,
   slight radius 0) while the text drifts up and fades. Phone too.
2. Services: phone = full-height cards that pin and stack over each other; desktop = pinned section,
   the photo changes with a clip/wipe as each service comes into focus, plus a cursor-following image
   preview on hover over the service list.
3. Statement line(s): words light up as you scroll (scroll-scrubbed opacity 0.18 -> 1 per word).
4. Food gallery: desktop pinned horizontal scroll with parallax inside each frame; phone swipe
   carousel where the active photo scales up and the others dim.
5. Marquee of occasion types in the large serif (sangeet, mehendi, reception, birthday, product launch,
   store opening, concert, office lunch, offsite...) - no client names, no numbers. Slow, pausable
   (pauses on hover/focus; static under reduced motion).
6. Image reveals: clip-path wipes, scale-ins, inner parallax.
7. Desktop: small copper cursor dot that grows into a "View" disc over images/cards; magnetic primary buttons.
8. Page transitions: a short navy curtain with the copper slash between pages (only if it does not
   break scroll restoration or focus; fall back to none).
9. Keep: header hide/return, sliding sticky bar, Our work filter animation, hovers, Lenis on desktop.

Guardrails: everything off under reduced motion; nothing hidden without JS; no layout shift; opening
photo and headline never start hidden; text readable at 360px; Plan your event always one tap away;
Lighthouse mobile performance >= ~70 locally. Durations may run longer for scroll-scrubbed effects
(they follow the scroll); time-based animations stay 200-900ms except the ambient zoom and marquee.
