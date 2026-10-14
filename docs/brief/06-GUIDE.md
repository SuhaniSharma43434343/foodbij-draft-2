# Guide - how to do the Foodbiz rework

Read `01-BRIEF.md` first; this file is the how. You are each building your own version, alone.

The short version: **look before you design, design on a phone first, never invent a fact, and test on a real
phone before you hand in.**

---

## Step 1 - Understand it (first day)

1. Read in order: `01-BRIEF.md`, `02-MEETING-NOTES.md`, `03-reference/TEARDOWN.md`,
   `04-previous-version/CONTENT-EXPORT.md`, `05-assets/INVENTORY.md`, `07-OPEN-ITEMS.md`.
2. Open https://www.obcatering.com on your phone **and** on a laptop. Click every service page and one event story.
   Then do the same with our old site, https://foodbiz-brief-box.vercel.app (or its screenshots in
   `04-previous-version/shots/`). Write five lines on each: what works, what does not.
3. Go through every folder in `05-assets/images/`. Know the photos before you design. Note your 10 favourites.
4. Send Purusharth your questions in one message, not one at a time.

## Step 2 - Choose your look

1. Collect 10-15 references with screenshots. At least half should not be catering websites: hotel and
   restaurant sites, menus, fashion lookbooks, food magazines, packaging.
   Look for: (a) luxury type that still works on a phone, (b) food photos shown like a magazine, (c) dark navy or
   black, white and one warm accent that looks expensive, (d) service lists that are easy to scan.
2. Write your idea in two sentences. Example shape: "A dinner-menu feel: big serif headings, lots of white,
   copper used only for actions." Yours will be different.
3. Choose two fonts (one display, one text) and the colours. Start from the logo: navy `#0B1C2D`, copper
   `#B87333`, white. Check text contrast with a contrast checker (aim for 4.5:1 or better for body text).
4. Sketch the homepage on a phone first (360px wide), then the laptop.

## Step 3 - Build the homepage and the Weddings page

1. Follow the page plans in `01-BRIEF.md` section 6. Improve them if you have a better idea; say why in NOTES.md.
2. The opening screen and the type are what the client will judge first. Try two or three versions of the opening
   and keep the best.
3. Send Purusharth phone screenshots of these two pages before building the rest.

## Step 4 - Build the rest

The other three service pages (same template as Weddings), Our work (event stories, filter by service), Our story,
Plan your event, Privacy and Terms. Keep the navigation to: Services, Our work, Our story, and a Plan your event
button.

## Step 5 - Images

**Real photos first.** Pick from `05-assets/images/` using the hero picks in `05-assets/INVENTORY.md`. Most are
phone-shot, so:
- crop tight and give them all the same treatment (same warmth, contrast, maybe the same slight grain) so they look
  like one set;
- prefer close details (food, hands, counters) over wide, messy room shots;
- drop any frame that looks weak. Fewer, better images beat more images.

**AI images** where real ones are missing or weak: the opening, the food gallery, gourmet sit-downs (no real photos
exist), service-page moods.
- Indian food and Indian service where it matters, not a generic Western stock look.
- No chef hats, crossed cutlery, fake logos, recognisable faces, or text in the image.
- Never inside a named event story, never captioned as a real event. Keep a list of every AI image and its prompt.

**Video loops** (optional): 6-10 seconds, silent, autoplay muted, a still poster image, a still-only fallback for
people who turn motion off, and small files (under about 2 MB each on phone).

Export images in WebP or AVIF, sized for the screen, with width and height set and lazy loading below the first
screen.

## Step 6 - Copy

- Follow `04-previous-version/context/VOICE.md`: short sentences, plain words, specific over decorative.
- Read every line out loud. If it sounds like a brochure, rewrite it.
- Never write "solutions", "bespoke", "curated", "elevated", "your special day" (full lists in the voice doc).
- Reuse old copy marked KEEP-ADAPT in `CONTENT-EXPORT.md` where it fits.
- Any fact you do not have: `[NEEDS CLIENT: ...]`.

## Step 7 - Test

1. **Real phones:** one Android and one iPhone if you can borrow them. Check every page: type size, nothing cut off,
   no sideways scrolling, buttons easy to tap, menu easy to find.
2. **Laptop and a large screen** (the founders review on a TV).
3. **Speed:** run your homepage through https://pagespeed.web.dev (mobile). Aim for a green or orange score; fix
   heavy images first.
4. **Basics:** every image has alt text, every page has one main heading, every link works, the enquiry form is on
   or one tap from every page.
5. Ask someone who has not seen the project to find "how do I book catering for my office" on your phone site.
   Watch, do not help. Fix what they struggle with.

## Step 8 - Hand in

Everything listed in `01-BRIEF.md` section 2: preview link (hidden from Google), source, NOTES.md, phone and laptop
screenshots. Send to Purusharth.

## Checklist before you hand in

- [ ] Four services, as in the brief. No sub-brand names or logos anywhere. No Pillar Live.
- [ ] New logo only.
- [ ] Every number, name and quote comes from the pack or a client message; everything else is `[NEEDS CLIENT]`.
- [ ] Only photos from `05-assets/images/`; AI images listed and never shown as real events.
- [ ] Looks refined on a real phone at 360px wide.
- [ ] Plan your event reachable from every page.
- [ ] Tested on phone, laptop, PageSpeed, and with one fresh pair of eyes.
- [ ] Preview hidden from Google. No passwords or keys in the code.
- [ ] NOTES.md written.
