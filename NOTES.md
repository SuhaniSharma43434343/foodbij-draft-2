# Foodbiz v2, editorial redesign: hand-in notes

2026-10-15. Source: https://github.com/SuhaniSharma43434343/foodbij-draft-2 (`main` = this redesign,
`first-draft` = the earlier version, which is also what foodbiz-v2.vercel.app shows). Locally the work is on branch
`redesign-editorial` of `v-my-apps/foodbiz-v2`.
Brief: `docs/brief/01-BRIEF.md`. Screenshots: `docs/handin/`.

## Design concept

A hospitality editorial: white pages where the real photographs are set like a magazine spread, each one cropped and
placed differently, with navy bands as the pauses between chapters. The words stay few and plain so the food,
the service and the one action, "Plan your event", carry every page.

## How it differs from the first draft

| | First draft | This version |
|---|---|---|
| Opening | Navy panel with a photo fading in from the right, three-line serif headline | One full-bleed night photograph (a server inside a lit crescent canapé counter) that opens out from a frame on arrival; small headline bottom-left, lead and action set apart bottom-right |
| Type | Cormorant + Jost, uppercase tracked labels and buttons | Instrument Serif (one weight) + Manrope, sentence case everywhere, no tracked caps |
| Navigation | Bottom thumb dock, intro loader, copper cursor, page curtain | Header that hides on scroll down and returns on scroll up; a Services panel with photos on desktop; a full-screen menu that lists the four services directly on phones; no loader, cursor or curtain |
| Services on home | Pinned list with a swapping image | Four spreads, each composed differently (portrait left, wide right, a navy full-bleed band, a narrow centred frame) |
| Food | Navy horizontal gallery | Linen band: asymmetric mosaic on desktop, one large photo plus a swipe row on phones |
| Buttons | Copper fill | Navy (white on dark); copper only for the arrow, underlines, focus ring and the nav marker |
| Motion | Lenis smooth scroll plus several effects | Native scrolling. Three effects only: clip-path rise for photos, short fade-up for text, gentle scroll-linked drift inside some frames (CSS scroll-driven, no library) |

## Fonts and colours

- **Instrument Serif 400** (and its italic, used only for the founders' line): narrow, high-contrast, still crisp at
  34px on a 360px phone; one weight keeps the hierarchy clean.
- **Manrope 400/500** for text: open and readable at 16px; body is 16px on phones, 17px from 1024px.
- Navy `#0B1C2D` (text, buttons, dark bands), white (page), copper `#B87333` for small details only;
  `#8F5523` copper ink for small copper text on white (6.0:1), `#D9A576` for small copper on navy (7.7:1).
  One neutral, linen `#F5F1EB`, is used for the food band and the brief steps on Our story. Secondary text
  `#46525E` (7.9:1). Primary buttons are navy with white text (16:1), so the old 3.8:1 copper-button compromise is gone.

## Images

All photographs are real, cleared frames from `05-assets/images/` (already in `public/images/`). One derived file:
`public/images/crops/hero-plating.jpg`, a crop of `bangalore-wedding-03` that removes the chef's head and toque
(the brief avoids chef hats), used as the live-counter image on Weddings and in one story.

Choices and why:
- **Home opening: `randive-wedding-01`.** Night light, a server and the food in one frame: service and presentation
  without a single word. Desktop crop keeps her face and the counter; phones show the full portrait.
  Limitation: the file is 1602px wide, so on a large high-density screen it is slightly soft. A wider version from the
  client, or the planned shoot, would fix it.
- **Service heroes:** `aurangabad-wedding-04` (thalis), `glasshouse-dessert-table-02`, `raymond-chairmans-lounge-05`,
  `motilal-oswal-01`. Homepage service images are different frames (`bayview-lawns-wedding-02`,
  `glasshouse-dessert-table-01`, `cartier-01`, `sbi-02`) so each page feels new.
- **Food:** `cartier-09`, `bangalore-wedding-01`, `himalayan-defender-journey-01`, `cartier-03`, `roca-store-launch-01`.
- Left out on purpose: `diosa-store-launch-01/-02` (may be renders, 07-OPEN-ITEMS), `uti-02` (sideways, 720px),
  `peppa-pig-05` and `black-pink-01` (character parties), `ninja-03` (old sub-brand card in frame), Ferrari and other
  logo-led frames, `merc-eqg-launch-02` and `bayview-lawns-wedding-04` (face masks date them), `raymond-chairmans-lounge-02`
  (garments dominate the frame).

## AI-generated images

**None are on the site.** No image-generation tool was available in this session, so I did not make any. Two slots
are flagged on the pages instead of being filled with weaker stand-ins. Planned prompts, for whoever generates them
(each must be labelled as AI here and never used in a story):

| Slot | Page | Prompt |
|---|---|---|
| Sit-down dinner | Celebrations | "A long dinner table at a Mumbai home at night, plated modern Indian courses on white porcelain, brass and copper serving pieces, low candlelight, hands placing a plate, no faces, no text, no logos, editorial food photography, shallow depth of field" |
| Daily office lunch | Corporate | "A clean office cafeteria counter at midday, steel and copper serving dishes of dal, rice, sabzi and salads, labelled with blank cards, soft daylight, no people's faces, no text, no logos, minimal and functional" |

## Pages and how it is built

Routes: `/`, `/services/weddings`, `/services/celebrations`, `/services/brand-launches`, `/services/corporate-dining`,
`/our-work` (filter by service), `/our-work/<slug>` (13 stories), `/our-story`, `/plan-your-event`, `/privacy`, `/terms`, and a 404.

Next.js 16 (App Router, static output), React 19, Tailwind 4, TypeScript. No animation library: `lenis` was removed.
Copy lives in `src/content/` (`site.ts`, `services.ts`, `stories.ts`, `pages.ts`). The four service pages share
`src/components/ServicePage.tsx`, varied by photography and by which side the image sits.
Motion: `RevealObserver.tsx` (IntersectionObserver, once per element, cleaned up on route change) and CSS in
`globals.css`. Hidden reveal states exist only when an inline script adds `html.mo`, which it does only when
reduced motion is not requested, so content is visible without JavaScript and with reduced motion on.

Out of search three ways (unchanged): `robots` noindex metadata, an `X-Robots-Tag: noindex, nofollow` header
(`next.config.ts`) and `robots.txt` disallowing everything.

The enquiry form has no backend (no inbox or sending domain is confirmed). It validates (name; phone or email; type
of event), shows an error summary that takes focus, and on a valid brief says plainly that nothing was sent, with a
"Copy my brief" button. The button reads "Check my brief", not "Send". The type of event is preset from
`?type=<service>` on every service page's actions.

## Second pass (after review against the first draft)

- No service page repeats a photograph: story cards and the gallery skip any image already used higher on the page
  (`ServicePage.tsx`). Galleries were re-chosen so each still has three to six frames.
- Story pages led by a portrait photo now set the photo beside the title and brief instead of cropping it to a
  letterbox; landscape-led stories keep the wide image.
- Brand launches: the "what we cover" photo no longer repeats the first story's photo.
- Homepage corporate spread: larger 4:5 frame so the four spreads carry equal weight.
- Headings use balanced wrapping and paragraphs avoid single-word last lines (no "with / us" orphans).

## Testing done (production build, local, headless Chrome; re-run after the second pass)

- `npm run build`: passes, 27 static pages, no type errors.
- Crawl of every internal link from the homepage: 23 pages, all 200, no failed images, no console errors, one `h1`
  per page, every image has alt text, noindex on every page.
- No horizontal overflow on any of the 23 pages at 360, 375, 390, 768, 1024, 1280 and 1920px.
- Tap targets: every visible link and button at 360px is at least 44px tall (the only flagged item is the hidden skip link).
- Form: empty submit shows two errors and focuses the summary; a bad email is caught; a valid brief shows the
  "not sent" status and focuses it; no success claim; the preset from `?type=corporate-dining` works.
- Phone menu: opens with focus on Close, locks page scroll, closes on Escape and returns focus to Menu, closes after
  following a link. Desktop Services panel opens and closes on Escape.
- Sticky phone action: hidden while scrolling down, shown on scroll up, hidden over closing invitations and the footer,
  absent on the enquiry page.
- Motion: 36 of 37 reveal elements fire on a desktop scroll-through (the one left is a phone-only photo that is
  hidden at desktop width), and they fire again after client navigation; with reduced motion and with JavaScript
  off, no photo is clipped and no text is hidden.
- Not verified: the "Copy my brief" clipboard button (headless Chrome blocks clipboard access; it falls back to a
  message telling the visitor to copy by hand).
- Speed, measured with Chrome's own LCP/CLS observers (phone viewport, 4x CPU slowdown, about 1.6 Mbps and 150ms
  latency): home LCP 1.3s, CLS 0, about 295 KB transferred; Weddings LCP 1.5s, CLS 0. **This is not Lighthouse.**
  Lighthouse is not installed on this machine and I did not install it; run PageSpeed Insights on the preview URL.
- Not done: real iPhone and Android devices, a TV, a fresh-eyes test, PageSpeed Insights. No preview deployment yet.

## Unfinished

- AI images for the two slots above.
- Preview deployment: the noindex config is ready; not deployed.
- `docs/design/` and `docs/qa/` still describe the first draft; this file is the record for this version.

## [NEEDS CLIENT] items

Contact and legal
1. Phone. 2. WhatsApp. 3. Enquiry email. 4. Address (footer, Plan your event, Privacy, Terms).
5. Date of legal review; retention period for enquiries; governing law and jurisdiction (counsel to confirm).
6. Instagram is the only verified handle (`@foodbizcatering`); no other social links are shown.

Our story
7. A line on each founder, and photographs if they want them (no placeholder faces are shown).

Photos
8. Photographs of gourmet sit-down dinners (none exist; AI planned).
9. Photographs of daily office dining (every corporate photo is a function).

Event briefs (one per story, shown on the story page as the placeholder)
10. Bangalore Wedding. 11. Bayview Lawns Wedding. 12. Aurangabad Wedding. 13. Ninja (garden birthday).
14. Playseum Set Ups. 15. Glasshouse dessert table. 16. Cartier. 17. Merc EQG Launch. 18. Crunchyroll.
19. Rolling Loud. 20. Casio. 21. SBI. 22. Bloomberg BSMR.

Permissions
23. Name rights: story titles are generic, but each brief placeholder names the photo folder (often the client)
    so reviewers know which event is meant. Make those generic before the build goes outside the team.
24. Logo-use rights: a few frames show a client's mark: the event mark on the relay menu board, the banner on the
    ramen stall, and a vehicle in the background of the moss-board canapé photo. No client-logo strip.
25. `sbi-02` carries a tiny old-logo card on a lamp; unreadable at site sizes, but flagged.
