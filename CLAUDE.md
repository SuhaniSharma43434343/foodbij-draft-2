# Foodbiz v2 - project rules

A phone-first, luxury website for Foodbiz (Mumbai catering and hospitality). The brief is
`docs/brief/01-BRIEF.md`; where documents disagree, the brief wins. Stack: Next.js 16 (App Router),
React 19, Tailwind 4, TypeScript, npm. Dev server: `npm run dev` on port 3010.

## Hard rules (never break)

1. **Four services, in this order:** Weddings; Celebrations & private dining; Brand launches & live
   events; Corporate & office dining. Names may be refined, groupings may not.
2. **No sub-brand names or logos anywhere** (Moira, Caterpillar, Gummy Gourmet, The Travelling
   Circus). **Never mention Pillar Live.**
3. **New 2026 logo only** (`public/logos/`). The legacy marks are not in this repo and must not be added.
4. **Never invent facts:** no numbers, years, guest counts, cities, client claims, menus or quotes
   that are not in `docs/brief/`. Write `[NEEDS CLIENT: ...]` instead and list it in NOTES.md.
5. **Only photos from `public/images/`** (copied from the pack's 05-assets; index in
   `docs/brief/IMAGE-INDEX.csv`, notes in `docs/brief/INVENTORY.md`). Check the frames listed in
   `docs/brief/07-OPEN-ITEMS.md` before using them. No client-logo strip.
6. **AI images** are allowed for mood, food and heroes, never inside a named event story and never
   captioned as a real event. Record every AI image (file + prompt) in NOTES.md.
7. **Phone first.** Design and check at 360px wide before 1440px. Body text at least 16px, weight
   400, left-aligned on phone; tap targets at least 44px.
8. **Banned words in site copy** (full list in `docs/brief/VOICE.md`): solutions, bespoke, curated,
   crafted, exquisite, gourmet (as a boast), elevated, hand-picked, artisanal, culinary journey,
   culinary excellence, premium, world of flavour, passionate about food, every detail, reverence,
   sacred, soulful, leverage, world-class, best-in-class, turnkey, end-to-end, holistic, seamless,
   touchpoint, ecosystem, your special day, the big day, fairytale, dream wedding, magical moments,
   unforgettable memories, once-in-a-lifetime, happily ever after, and any "From X to Y" opener.
   Say "Services" or "What we do", never "Solutions".
9. **Plan your event** must be reachable from every page. The enquiry form must not pretend to
   have sent if it cannot.
10. **Keep the preview out of search:** `robots: noindex` in metadata, `X-Robots-Tag` header and
    `robots.ts` disallow stay until launch. No secrets, keys or `.env` files in the repo.

## Colour (from the logo)

Navy `#0B1C2D` (reads as black), copper `#B87333`, white. Let photography carry colour. Avoid the
old dull "shaadi" look, tech/dashboard styling, chef hats, crossed cutlery and wedding cliches.

## Where things are

- `docs/brief/` - brief, meeting notes, guide, open items, voice, old copy export, image index
- `docs/reference/` - teardown of obcatering.com (the client's reference) with screenshots
- `docs/design/` - taste spec and mockups (produced in the look phase)
