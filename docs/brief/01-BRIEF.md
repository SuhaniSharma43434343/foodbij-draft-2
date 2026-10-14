# Brief - Foodbiz website v2 (services-led)

For: Nidhi Thakore and Suhani Sharma. From: Purusharth. 2026-10-14.

---

## 1. The job in one paragraph

Foodbiz is a Mumbai catering and hospitality company (owned by Foodies Hospitality, founders Amar Jog and Kushal
Shetty). We built them a site; they reviewed it on 30 Sep and want it reworked. The new site must feel like a
**luxury lifestyle catering company**, be **simple to navigate** for anyone, and **lead with what Foodbiz does**
(its four services), not with its sub-brand names. Think of the Toronto site they love,
https://www.obcatering.com: a calm homepage, four services, a page per service, short event stories, a beautiful
food section, and one clear "plan your event" action. Their season starts in November, so a clean, finished v1
beats a deep, half-done one.

## 2. How this works: two versions, built separately

**Each of you builds your own complete version of the site, on your own.** Same brief, same assets, different
answers. Do not share designs, code or copy with each other until both versions are handed in. Purusharth will
compare the two and pick one (or combine the best of both) to take to the client.

So you each own everything for your version: look and feel, layout, type, copy, images, the build, and testing.
Ask Purusharth your questions directly; he will share answers that matter with both of you.

**What you hand in:**
1. A working **preview link** to your site (Vercel, Netlify or similar), hidden from Google.
2. The **source** (a GitHub repo, or a zip if you built it in a no-code tool, plus the tool's share link).
3. A one-page **NOTES.md**: your design idea in two sentences, the fonts and colours you chose and why, which
   images are AI-generated, what is unfinished, and every `[NEEDS CLIENT]` item you hit.
4. **Screenshots** of the homepage and one service page on a phone (360px wide) and on a laptop.

Use any tools you like: code (Next.js, Astro, plain HTML), Framer, Webflow, AI design and coding tools. The test is
the result, not the stack.

## 3. What success looks like

1. Amar opens it on his phone and says it feels luxury and refined (the type on mobile was his biggest complaint).
2. A visitor who has never heard of Moira or Caterpillar understands in five seconds what Foodbiz does and finds
   their kind of event in one tap.
3. Every page shows food, service and presentation.
4. A visitor can start an enquiry from any page.
5. Nothing on the site is invented: no made-up numbers, guest counts, menus, years or quotes.

## 4. Decided - do not reopen

- **Four services. No sub-brands in the navigation or on the homepage.** Moira, Caterpillar, Gummy Gourmet and The
  Travelling Circus become separate micro-sites later. Do not show their names or logos in v1.
- **Pillar Live no longer exists.** Do not mention it anywhere.
- **New Foodbiz logo only** (`05-assets/logos/`). The old teal/brown marks and the gold wedding mark are legacy.
- **AI-generated photos and video loops are allowed** where real photos are weak. Good real photos come first.
- **Short, brief-led event stories**, not full menus or credit lists.

## 5. Site map

```
Home
Services
  1. Weddings
  2. Celebrations & private dining   (birthdays and kids' parties, family and social functions,
                                      gourmet sit-down dinners)
  3. Brand launches & live events    (product and store launches, brand days, concerts, festivals,
                                      large-format events)
  4. Corporate & office dining       (daily and recurring catering for offices and campuses,
                                      plus corporate functions)
Our work        (event stories, filterable by service)
Our story       (who they are, the founders, how they work)
Plan your event (contact + enquiry form)
Privacy, Terms
```

You may rename the four services if you find clearer words, but keep the same four groupings.
Not in v1: venues, menu pages, sub-brand pages, blog/news.

Photos per service are in `05-assets/images/1-weddings/` ... `4-corporate-office-dining/`. Service 3 has plenty;
Service 2 has no gourmet sit-down photos at all (use AI for that part); see `05-assets/INVENTORY.md`.

## 6. Page plans (the minimum; improve on it)

### Home
1. **Opening:** full-screen video loop or still of food being plated or served (the client liked the old site's
   "plate being laid" opening). One short line. One button: Plan your event. Logo and a quiet menu.
2. **Services:** the four services, each with one strong image, a name and one or two plain sentences, each linking
   to its page. This is the heart of the homepage.
3. **Food:** a gallery of beautiful food close-ups. AI-generated is fine here if real close-ups are weak.
4. **Our story, short:** two or three sentences and a link. Optional line about real event photos ("real events,
   nothing staged"); Amar is fine either way.
5. **Event stories:** three to six cards, each "the brief, in one line" plus a photo.
6. **Plan your event** band, then the footer (contact, address, Instagram, legal).
7. No client-logo strip yet: the client has not confirmed logo-use rights.

### Service page (one template, four pages)
1. Hero: image or loop, the service name as the headline, one line under it.
2. What we do: three or four formats within the service (for example, Weddings: sangeet, wedding day, reception).
3. How it works: three to five plain steps from first call to the event.
4. Event stories from this service (two is fine at launch).
5. Food and presentation photos from this service.
6. Links to the other three services.
7. Plan your event, with the enquiry preset to this service.

### Event story
Title -> **The brief** (two or three sentences) -> What we made (food, service, presentation) -> photos -> a
live-station teaser if relevant -> Plan your event. No menus, guest numbers or venue claims. Where we have photos
but no brief from the client, write `[NEEDS CLIENT: the brief for <event>]` as the text.

### Our story
Who Foodbiz is, the founders (no placeholder faces; leave the photo out if we have none), what they believe
(hassle-free: "leave the stress to us, be present"; "the business of food and experience"), how they take a brief.

### Plan your event
Short form: name, phone, email, type of event (the four services), date, guests (a range), city, a free-text
brief. The form does not need to send email yet; it must clearly not pretend to have sent if it cannot.
Contact details are not confirmed: use `[NEEDS CLIENT: phone]` etc.

## 7. Look and feel

- **Words the client used:** opulence, luxury, lifestyle; cool, contemporary, very stylish; simple. For corporate:
  minimal, clean, functional.
- **Colour:** built from the new logo: very dark navy `#0B1C2D` (reads as black), copper `#B87333` (reads as
  orange), and white. Lots of space. Let the photography carry colour. Not the old dull, "shaadi" background.
- **Type:** the main fix. A refined display face that still looks expensive at 360px wide, plus a quiet text face.
  Test on a real phone before anything else.
- **Avoid:** anything that looks like a tech or data company (dashboards, chips, form-first openings), chef hats,
  crossed cutlery, wedding cliches.
- **Phone first.** The reference site is weak on phones (see `03-reference/TEARDOWN.md` s5); ours must be better
  there than on desktop.

## 8. Words

- Voice rules: `04-previous-version/context/VOICE.md`: warm, considered, modern; short sentences; specific
  beats decorative; the banned word lists.
- **Do not write the word "solutions" on the site.** The voice doc bans it. Say "What we do" or "Services".
- Reuse what still fits from `04-previous-version/CONTENT-EXPORT.md` (blocks marked KEEP-ADAPT).

## 9. Rules you must not break

1. **Never invent facts.** Numbers, years, guest counts, cities, client names on stories, dishes against a real
   client, founder quotes. Use `[NEEDS CLIENT: ...]` and list it in your NOTES.md.
2. **Photo rights.** Use only images in `05-assets/images/`. Check the frames listed in `07-OPEN-ITEMS.md` before
   using them.
3. **AI images must not pretend to be a real event.** Use them for mood, food and heroes, never inside a named
   event story. Keep a list of which images are AI.
4. **You never contact the client.** Everything goes to Purusharth.
5. **Keep your preview hidden from Google** (a `noindex` tag, or a password if your tool has one).
6. No passwords or API keys in code, screenshots or chat.

## 10. Order of work (suggested, no fixed dates)

1. Read the pack. Study the reference and our old site on a phone and a laptop.
2. Pick your look: collect references, choose fonts and colours, sketch the homepage on a phone first.
3. Build the homepage and the Weddings page. Send Purusharth phone screenshots for a quick check.
4. Build the other three service pages, Our work, Our story, Plan your event.
5. Place photos, generate AI images, write the copy.
6. Test on real phones, fix, and hand in (section 2).
