# Foodbiz v2, editorial redesign: hand-in notes

2026-10-15. Source: https://github.com/SuhaniSharma43434343/foodbij-draft-2 (`main` = this redesign,
`first-draft` = the earlier version, which is also what foodbiz-v2.vercel.app shows). Locally the work is on branch
`redesign-editorial` of `v-my-apps/foodbiz-v2`.
Brief: `docs/brief/01-BRIEF.md`. Screenshots: `docs/handin/`.

## Design concept

Cinematic hospitality: every page alternates full-bleed dark photographs, navy chapters, linen and white editorial
spreads, so the visitor moves through a sequence of scenes rather than a stack of sections. Oversized serif type,
photographs layered over each other's edges and a few precise motions (masked words, rising photos) carry the
luxury; the copy stays short and factual.

## Fourth pass: interaction and motion system (current version)

**Audit of the deployed site before this pass** (Playwright driving Chrome against foodbij-draft-2.vercel.app):
worked: back/forward, the phone menu (open, close, Escape), the gallery's Next button, the hover photo on the
service index, no console errors, no failed requests, no layout shift. Missing or weak: no opening; internal
navigation was an instant swap with no transition; gallery photos could not be opened; the header stayed white over
navy sections; the `/#services` link on every service page pointed at an anchor the third pass had removed.

**What was built.** No new dependencies: GSAP is not installed and was not added. Page transitions use React 19.3's
`<ViewTransition>` with Next.js 16's own client-side navigation; everything else is CSS plus small components.
Timing tokens: 0.3s for feedback, about 0.6s for page transitions, 1-1.6s for photographs and display type, one
easing family (`--ease`, `--ease-io`).

1. **Opening** (homepage, first visit of a session): navy panel, the logo draws left to right over a copper rule,
   the panel wipes upward onto the hero photo, which opens out from a frame; the headline rises word by word, then the
   line and the button. About 1.2s to settled. It never blocks clicks or scrolling (`pointer-events: none`), and it does
   not play on a reload in the same session, on back/forward, with reduced motion, or without JavaScript.
   (`layout.tsx` inline script, `.opening` in `globals.css`.)
2. **Page transitions**: every internal link (`src/components/Link.tsx`, next/link tagged `transitionTypes={["page"]}`,
   pages wrapped in `PageTransition.tsx`) runs a view transition. The old page lifts and fades (0.24s), the document
   behind it turns navy, and the new page rises in behind a clean edge (0.44s from 0.14s). The header stays anchored.
   Back/forward: Next.js restores those pages without a view transition, so `HistoryEntrance.tsx` fades the arriving
   page in (0.32s). Ctrl/Cmd-click, new tabs, external links and downloads are left to the browser (next/link does not
   run client navigation for them). Browsers without view transitions swap pages instantly. `HeroPrefetch.tsx`
   warms the destination's first photograph when a link is pointed at, focused or touched, so the transition starts
   sooner.
3. **Scroll**: navy chapters open from a framed card to full bleed as they enter (`.tone-in`); layered photos move at
   a different speed from the page (`.depth`); on service pages the "how it works" heading stays in place (CSS sticky)
   while the steps scroll past and a copper rule fills; photo mask reveals, word reveals and drift as before. Native
   scrolling throughout; nothing is pinned or hijacked.
4. **Service heroes, one reveal each**: Weddings opens from a frame with a slow word stagger; Celebrations' photo opens
   from the right like a door, then the inset photo rises; Brand launches' three photos rise one after another with a
   fast word stagger; Corporate draws a copper rule and wipes its wide photo left to right.
5. **Lightbox** on the service film strips, the homepage food spread and story photos: the photo grows out of the one
   clicked (a view transition), arrows, keys and swipes step through, Escape, the close button or a downward swipe
   return, focus is trapped while open and returned afterwards, page scroll is locked.
6. **Header** reads what is under it: transparent over full-bleed photos, navy over navy sections, white elsewhere.
7. **Feedback**: buttons lift on hover and press in on click; arrows extend on hover and on keyboard focus.
8. **Fixed on the way**: the `/#services` anchor. And a bug in the first build of the opening, caught by the
   screenshot test before shipping: the overlay and the `<html>` element shared the class `intro`, which hid the whole
   homepage for 2.6s.

**Tested** (production build on a local server, Chrome driven by Playwright; scripts kept outside the repo):
- Opening: shows at once, does not block clicks, clears itself, settled hero; not on reload, not on back/forward.
- Page transitions: a view transition with the `page` type starts 22-116ms after a click, the animation starts
  85-290ms after the click (with a brief hover first), and the page is settled 0.7-1.05s after the click. No transition
  overlay remains afterwards; the new page is interactive. Checked frame by frame at reduced playback speed: old page
  lifts onto navy, new page rises.
- The four service links on the homepage index, the header's Our work link, the phone menu's Weddings link, a story
  card and a service page's enquiry button each reach the right page with a transition; back and forward return to the right pages with the fade; Ctrl-click opens a new tab and leaves the page
  alone; the Instagram link goes straight to the browser with no transition; `/#services` lands on the index; a nested
  route (`/our-work/boutique-evening`) loads directly with status 200.
- Lightbox: opens with a morph, focus on Close, ArrowRight/ArrowLeft step, Tab stays inside, Escape closes and returns
  focus, scroll unlocks; on a phone a swipe steps and the close button closes.
- Phone menu: opens, links navigate with a transition and close the menu, scroll unlocks. Header turns navy over navy
  sections on a phone.
- Reduced motion: no opening, no reveal states, transitions do not animate, content visible.
- Crawl of all 23 pages: all 200, no failed images, no console errors, one `h1` each, alt text, noindex; no horizontal
  overflow at 360, 375, 390, 768, 1024, 1280 and 1920px; tap targets at least 44px at 360px.
- Form: errors and focus, bad email caught, "not sent" status, no success claim, service preset from the URL.
- Speed (Chrome's own LCP observer, phone viewport, 4x CPU slowdown, about 1.6 Mbps, cache off): Weddings LCP 1.3s,
  Our work 2.9s, homepage 3.7s. The homepage is slower because the opening holds the hero text back by design; repeat
  visits in a session skip it. CLS 0 on the homepage and Weddings. Not Lighthouse.
- Not tested: Safari and Firefox (only Chrome is available here), real phones.

**Limits**: where `animation-timeline` is unsupported (Firefox today), the scroll-linked effects (drift, depth, tone
shift, steps rule) stay still; page transitions and the lightbox morph need view-transition support and otherwise swap
instantly; back/forward get a fade rather than the curtain.

## Third pass: the radical visual redesign

Why: the review recording showed too much empty space, repeated layouts and large blank image areas.

**Blank image areas, found and fixed.** Two causes, both measured. (1) Every photo went through Next's on-demand
image optimiser, which took 0.5 to 1.3s per photo on first request (measured on the local production server), so
large frames sat empty while scrolling. (2) Frames waiting to reveal were transparent, so a slow photo showed as white.
Fix: `scripts/optimize-images.mjs` pre-builds every photo into static WebP files at five widths (`public/o/`,
committed with the code) and records each photo's dominant colour; a custom `next/image` loader (`src/lib/image-loader.ts`)
serves them directly; every frame is filled with its photo's own colour while loading; reveals start slightly before a
photo enters the screen. Logos are now 9-14 KB WebP files instead of 55-65 KB PNGs. A fast-scroll test (one screen
every 0.5s) now finds no empty frames on Home, Weddings or Brand launches; on Celebrations, three film-strip photos
were still arriving at one scroll stop, shown as colour blocks rather than white.

**Homepage, rebuilt scene by scene:** a full-screen photograph with the headline set at up to 152px, rising word by
word; a second photograph rises out of the hero's lower edge into the introduction; a typographic introduction and a
service index (hover shows a photo on desktop); four service chapters, each in its own mood (Weddings: full-height gold
photograph beside navy; Celebrations: linen with a photo set into another's corner; Brand launches: navy with the name
across the page and three photos at three sizes; Corporate: white with a ruled grid of what the service covers); the
founders' line as an oversized navy statement; an asymmetric linen food spread; a horizontal Recent work sequence;
and a full-screen closing invitation.

**Service pages, four moods on one structure** (`ServicePage.tsx`, `variant` in `content/services.ts`):
cinematic (Weddings, full-bleed dark hero), intimate (Celebrations, linen with layered photos), stage (Brand
launches, navy with a row of photos), precise (Corporate, white with a 21:9 photograph). The light and dark rhythm of
the later sections changes with the mood, and the closing invitation uses an unused photo when one is available.

**Signature motion (CSS only, no new dependency; GSAP is not installed and was not added):** masked word-by-word
heading reveals (`RevealText.tsx`), mask reveals for photos, scroll-linked drift inside frames, the hero opening
out from a frame, hover lift on photos and the service index. Native scrolling throughout; nothing is pinned.

## How it differs from the first draft

| | First draft | This version |
|---|---|---|
| Opening | Navy panel with a photo fading in from the right | One full-bleed night photograph opening out from a frame, oversized headline rising word by word, a second photo layered over the edge |
| Type | Cormorant + Jost, uppercase tracked labels and buttons | Instrument Serif at display sizes up to 152px + Manrope, sentence case everywhere |
| Navigation | Bottom thumb dock, intro loader, copper cursor, page curtain | Header that hides on scroll down and returns on scroll up; a Services panel with photos on desktop; a full-screen phone menu listing the four services; no loader, cursor or curtain |
| Services on home | Pinned list with a swapping image | A service index, then four chapters with different compositions and moods |
| Service pages | One template | Four hero compositions and section rhythms |
| Buttons | Copper fill | Navy (white on dark); copper only for arrows, underlines, focus rings and fine rules |
| Motion | Lenis smooth scroll plus several effects | Native scrolling; masked type, photo reveals and drift, all CSS |

## Fonts and colours

- **Instrument Serif 400** (and its italic, used only for the founders' line and loaded without preloading):
  narrow and high-contrast, it holds at 42px on a 360px phone and at 152px on a laptop.
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
- **Service page heroes:** Weddings `aurangabad-wedding-04` (thalis, full-bleed); Celebrations
  `glasshouse-dessert-table-02` with `ninja-01` set in; Brand launches `raymond-chairmans-lounge-05`, `cartier-03`,
  `rolling-loud-02`; Corporate `sbi-03`.
- **Homepage chapters:** `bangalore-wedding-04` with `bayview-lawns-wedding-02`; `glasshouse-dessert-table-02` with
  `ninja-04`; `cartier-01`, `merc-eqg-launch-03`, `kaytranada-03`; `netflix-03`. Statement: `himesh-reshamiya-01`.
  Food spread: the live-counter crop, `roca-store-launch-01`, `aurangabad-wedding-04`, `cartier-03`,
  `himalayan-defender-journey-01`, `bayview-lawns-wedding-01`. Hero inset: `cartier-09`.
- No photo appears twice on the same page; the homepage and each service page skip any photo already shown.
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

## Second pass

- No service page repeats a photograph: story cards and the gallery skip any image already used higher on the page
  (`ServicePage.tsx`). Galleries were re-chosen so each still has three to six frames.
- Story pages led by a portrait photo now set the photo beside the title and brief instead of cropping it to a
  letterbox; landscape-led stories keep the wide image.
- Brand launches: the "what we cover" photo no longer repeats the first story's photo.
- Homepage corporate spread: larger 4:5 frame so the four spreads carry equal weight.
- Headings use balanced wrapping and paragraphs avoid single-word last lines (no "with / us" orphans).

## Testing done (production build, local, headless Chrome; re-run after the third pass)

- `npm run build`: passes, 27 static pages, no type errors. Also passes from a clean copy of the pushed commit with
  Vercel's ignored files removed and a fresh `npm ci` (the same way Vercel builds).
- Crawl of every internal link from the homepage: 23 pages, all 200, no failed images, no console errors, one `h1`
  per page, every image has alt text, noindex on every page.
- No horizontal overflow on any of the 23 pages at 360, 375, 390, 768, 1024, 1280 and 1920px.
- Tap targets: every visible link and button at 360px is at least 44px tall (only the hidden skip link is smaller).
- Form: empty submit shows two errors and focuses the summary; a bad email is caught; a valid brief shows the
  "not sent" status and focuses it; no success claim; the preset from `?type=corporate-dining` works.
- Phone menu: opens with focus on Close, locks page scroll, closes on Escape and returns focus to Menu, closes after
  following a link. Desktop Services panel opens and closes on Escape.
- Sticky phone action: hidden while scrolling down, shown on scroll up, hidden over closing invitations and the footer,
  absent on the enquiry page.
- Motion: 45 of 45 reveal elements fire on a desktop scroll-through and again after client navigation; with
  reduced motion and with JavaScript off, no photo is clipped and no text is hidden.
- Blank frames: the fast-scroll test described above.
- Not verified: the "Copy my brief" clipboard button (headless Chrome blocks clipboard access).
- Speed, Chrome's own LCP/CLS observers on a phone viewport with 4x CPU slowdown and about 1.6 Mbps: home LCP 1.9s,
  Weddings LCP 1.8s, CLS 0 on both. With the browser cache disabled, first paint on the homepage ranged from 2.3s to
  2.9s across runs; the page is heavier than the second pass (more photographs and display type). Without the CPU
  slowdown it is about 1.4s. **This is not Lighthouse** (not installed; I did not install it). Run PageSpeed Insights
  on a preview URL.
- Not done: real iPhone and Android devices, a TV, a fresh-eyes test, PageSpeed Insights. No preview deployment yet.

## Unfinished

- AI images for the two slots above.
- Preview deployment: the noindex config is ready; not deployed.
- `docs/design/` and `docs/qa/` still describe the first draft; this file is the record for this version.
- After adding or changing a photo, run `npm run images` and commit `public/o/` and `src/content/image-manifest.json`.
  The build does not regenerate them: Vercel's `.vercelignore` drops `scripts/`, which is why the first Vercel
  build of this version failed (fixed by shipping the prepared photos with the code).
- The homepage hero photo is 1602px wide and looks slightly soft on large high-density screens.
- First paint on a slow phone connection is slower than in the second pass (see Speed above).

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
