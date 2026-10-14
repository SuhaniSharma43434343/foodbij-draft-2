# Foodbiz v2 - hand-in notes

Preview build of the new Foodbiz site, 2026-10-14. Brief: `docs/brief/01-BRIEF.md`.

## Design idea

A printed dinner menu for a Mumbai host: a fine, high-contrast serif on white and deep navy, with the
food photographed and laid out like a magazine spread. Copper appears only where you can act or where
the logo would, so every page stays calm and "Plan your event" is always the obvious next step.

## Fonts and colours, and why

- **Cormorant** (display, 500/600, one italic line per page at most): the most refined serif we tested
  at 360px; at 500 the hairlines stay whole on a phone, which answers the "type not refined on mobile"
  complaint.
- **Jost** (text, 400/500): a geometric sans with the round O's and straight strokes of the FOODB/Z
  wordmark, so type and logo read as one family. Body is 16px (17px from 768px), weight 400.
- Colours come from the new logo. Navy `#0B1C2D` for text and dark bands (reads as black, softer on
  photos). Copper `#B87333` for buttons, the active nav marker, thin rules and service numerals,
  never body text. Copper-deep `#8F5523` for small copper text on white (6.0:1). White page ground.
  Mist `#F4F1EC` for one alternate light band. About 70% white, 25% navy, under 5% copper; the photos
  carry the colour.
- **Owner's decision (2026-10-14):** keep the logo copper `#B87333` as the button fill. White on that
  copper is **3.8:1**, below the 4.5:1 AA level for small text. Mitigation: button labels are 13px,
  uppercase, weight 500, wide tracking, in buttons at least 48px tall. Fallback if this changes:
  fill `#A0612A` (5.0:1), a one-token swap.

## Pages built, and how

Routes: `/`, `/services/weddings`, `/services/celebrations`, `/services/brand-launches`,
`/services/corporate-dining`, `/our-work`, `/our-work/<slug>` (13 stories), `/our-story`,
`/plan-your-event`, `/privacy`, `/terms`. (The design sketch pages were removed before hand-in; their
screenshots stay in `docs/design/shots/` as the review record.)

Stack: Next.js 16 (App Router), React 19, Tailwind 4, TypeScript, npm. All copy lives in
`src/content/*.ts` (`site.ts`, `services-pages.ts`, `stories.ts`, `pages.ts`). Run: `npm install`,
then `npm run dev` (http://localhost:3010); `npm run build` for a production build. Kept out of
search three ways: `robots: noindex` in metadata, an `X-Robots-Tag: noindex, nofollow` header
(`next.config`), and `robots.ts` disallowing everything.

## AI-generated images

**None yet.** No image on the site is AI-made. Planned slots (opening plating loop and poster,
sit-down dinners, daily office dining, food close-ups, optional wedding mood) with sizes and prompts
are in `docs/design/ai-image-prompts.md`. Each one will be listed here with file name and prompt
before it is merged, and none will appear on `/our-work`.

## Photos

- All real photos come from the pack's `05-assets` (cleared frames only), copied to `public/images/`.
  Picks and reasons: `docs/design/photo-picks.md`.
- The folder named after a sub-brand was renamed to `glasshouse-dessert-table` so the name never
  shows in image URLs (`docs/brief/IMAGE-INDEX.csv.NOTE.md`).
- Left out on purpose: `diosa-store-launch-01/-02` (may be renders); `uti-02` (sideways, 720px);
  `peppa-pig-05`, `black-pink-01` (character-themed parties); Ferrari and other logo-heavy frames
  (also `cartier-02`, `casio-01`, `bsmr-02/-03`, `sbi-01`); `ninja-03` (an old sub-brand counter
  card in frame); `sbi-04` (menus with the retired logo); `bayview-lawns-wedding-04` and
  `merc-eqg-launch-02` (cooks in face masks date the photos).
- Crops hide a logo, a chef's toque (`bangalore-wedding-03`), a TV and wall lettering.

## Flagged for a second look

- `sbi-02`: a small old-logo card on a lamp. Kept; the card is tiny and unreadable at site sizes.
- `ninja-01` and `ninja-04`: re-checked by eye, no character theme. The themed pizzas were only in
  `ninja-03`, which is removed.
- Every frame that shows a client's brand: logo-use rights are not confirmed (07-OPEN-ITEMS C4).
- Story pages use event and client names taken from the photo folders (C4). Titles are generic, but
  the visible brief placeholders on `/our-work/<slug>` name the event (for example "the brief for the
  Cartier boutique event"). Confirm name rights, or make those placeholders generic, before sharing
  outside the team.
- The relay menu board photo carries the event's own small mark in its top-left corner.

## Accessibility and speed

Full write-up and re-run commands: `docs/qa/a11y-perf.md`.

- **Checks** (`scripts/a11y-check.mjs`, all 23 linked pages, production build): one h1 per page, no
  skipped heading levels, alt text on every image, labelled form controls, unique titles, tap targets
  at least 44px and no sideways scroll at 360px, all pass. Keyboard: the phone menu opens, keeps focus
  inside, closes on Escape and returns focus; skip link works; visible focus ring on every stop.
- **Lighthouse, local, mobile preset** (median of three runs, on a slow laptop; PageSpeed needs a public
  URL): Home 78 / 96 / 96 / 66, Weddings 79 / 96 / 96 / 66, Our work 82 / 96 / 96 / 66
  (performance / accessibility / best practices / SEO). Page weight cut by about a third (AVIF photos,
  right-sized hero, only the hero preloaded, unused font weight dropped).
- **Known and accepted:** accessibility 96 because of the copper buttons (owner decision above);
  SEO 66 because the preview is deliberately noindex. Performance is limited mainly by framework
  start-up time under Lighthouse's CPU throttling; expect higher scores on pagespeed.web.dev once
  deployed.
- **Not done yet:** real-phone checks (one Android, one iPhone), the fresh-eyes test from 06-GUIDE
  step 7, and a screen-reader pass.

## What is unfinished

- AI images and the opening video loop (not made yet; see above).
- The enquiry form does not send: there is no backend. It says so plainly and shows how to reach
  Foodbiz; nothing pretends to have sent.
- Privacy and Terms are drafts for Foodbiz's counsel (marked on both pages).
- Contact details (phone, WhatsApp, email, address) are placeholders.
- No client-logo strip (rights). No Venues page (not in v1, C10).
- Brand guidelines and the black logo have not arrived (C1); the site uses the supplied logo files.
- Preview link not deployed yet (owner's decision pending).
- Noindex and robots rules stay until launch.
- Favicon: a placeholder (navy square with the copper stroke from the logo); swap for an official mark.

## Every [NEEDS CLIENT] item

49 items, de-duplicated (from `grep -rn "NEEDS CLIENT" src/` plus 07-OPEN-ITEMS).

**Contact (4)** - [NEEDS CLIENT: phone], [NEEDS CLIENT: whatsapp], [NEEDS CLIENT: email],
[NEEDS CLIENT: address]. Used wherever contact details appear: closing bands, the plan page,
the form status message and the legal pages. (Instagram `@foodbizcatering` is the verified handle in
CONTENT-EXPORT and is used.)

**The brief for each event, 2-3 sentences (13, C3)** - shown as placeholders on the story pages and
service pages:
1. Wedding in Bengaluru (`bangalore-wedding`)
2. Outdoor wedding (`bayview-lawns-wedding`)
3. Wedding in Aurangabad (`aurangabad-wedding`)
4. Children's birthday in the garden (`ninja`; "the birthday in Mumbai" on the Celebrations page)
5. Counters for a children's party (`playseum-set-ups`; "the play-space counters")
6. Dessert table in a glasshouse (`glasshouse-dessert-table`; also the occasion)
7. Music festival (`rolling-loud`)
8. Anime launch party (`crunchyroll`; only one cleared frame)
9. Evening at a jewellery boutique (`cartier`; "the boutique evening")
10. Car launch at night (`merc-eqg-launch`; "the car launch")
11. Retail evening by the garden (`casio`)
12. Relay race between office towers (`bloomberg-bsmr`; "the corporate relay")
13. Bank's anniversary lunch (`sbi`; "the bank day lunch")

Amar's own examples (Akanksha wedding, Mirani wedding, Ferrari Purosangue launch, Crunchyroll show,
the upcoming Maserati launch) have no briefs or matching cleared photos yet.

**Name rights (13 + 1, C4)** - permission to name each of the 13 events/clients/venues above, and
logo-use rights for every frame showing a client brand (and for any future logo strip).

**Menus quoted from the clients' own boards and cards (4)** - confirm we may quote:
1. Bayview Lawns counter signage (Thai Chatuchak ice cream, The Mangolian live wok, chai).
2. The birthday counter cards (Ninja margherita pizzas, sushi board station).
3. The ramen counter at the anime launch.
4. The relay menu board (thukpa with momos, Corfu salad, etc.; also quoted on the Corporate page).

**About the business (6)**
- [NEEDS CLIENT: founder bios] (who does what is not confirmed).
- Are tastings offered? (no tasting step on the Weddings page until confirmed).
- Which diets are catered for as standard, e.g. Jain (Corporate page names none).
- [NEEDS CLIENT: reply time] (form "sent" message).
- Confirm the large-event capability on Brand launches ("Concerts and festivals" format).
- Numbers (years, events, cities, C5): none on the site until supplied.

**Legal (2)** - [NEEDS CLIENT: date of legal review] for the "Updated" line; counsel's read of both
drafts.

**Photos and assets (6)** - sit-down dinner photos (C2); daily office dining photos; food close-ups
(C7); founders' photos (C6: left out, no stock or AI faces); usable event video (C8); brand
guidelines and the black logo (C1).
