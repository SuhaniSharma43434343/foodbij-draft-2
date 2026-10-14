# Content export - previous site (Brief Box build), 2026-10-14

Everything the live review build (https://foodbiz-brief-box.vercel.app) renders, as readable Markdown, pulled from `lib/content.ts`, `lib/pages.ts`, `lib/menus.ts`, `lib/site.ts`, `lib/intent.ts` and the `app/` routes. 

How to use it: this is the OLD copy, kept so nothing good is lost. It is not the new site. Each block has a tag from the 2026-09-30 review decisions (services-led site; sub-brands deferred to later micro-sites; Pillar Live dropped by the client).

## Tags

| Tag | Meaning |
|---|---|
| KEEP-ADAPT | Good material. Reuse, but rewrite to lead with the service, not the sub-brand name. |
| DROP | Do not carry over (old concept, dropped brand, or jargon). |
| NEEDS-CLIENT | Cannot be used until Amar or Kushal confirms (a fact, a right, a decision). |

## Read this first

1. **SIGNOFF claims** (section 9) are claims the founders have NOT confirmed. They were removed from the site. They must not be published until confirmed in writing by Amar or Kushal. Section 9 is reproduced verbatim.
2. **Wording note.** The source copy uses curly quotes, em-dashes and middle dots. This export converts them to plain ASCII (" - ", straight quotes, "|") per house rules. Words are unchanged.
3. **Sub-brand names inside copy.** Wherever old copy says Moira, Caterpillar, Gummy Gourmet or Pillar Live, the new site should say the service instead (one of the four services in 01-BRIEF.md). Pillar Live copy is DROP as a brand; the large-event ideas can feed Service 3.
4. **Phone and address** are not confirmed for publication; write [NEEDS CLIENT: phone] / [NEEDS CLIENT: address].

---

## 1. Global elements (every page)

### 1.1 Header navigation (`NAV` in lib/pages.ts) - DROP the structure, KEEP-ADAPT the plain-language blurbs

The old nav listed four invented sub-brand names with a one-word explainer each. The new nav should be the services themselves.

| Label | Explainer shown | Goes to | Tag |
|---|---|---|---|
| Moira | Weddings | /moira | KEEP-ADAPT (becomes Weddings / Corporate / Kids' parties) |
| Caterpillar | Corporate dining | /caterpillar | KEEP-ADAPT (becomes Weddings / Corporate / Kids' parties) |
| Pillar Live | Large events | /pillar-live | DROP |
| Gummy Gourmet | Kids' parties | /gummy-gourmet | KEEP-ADAPT (becomes Weddings / Corporate / Kids' parties) |
| Work |  | /work | KEEP-ADAPT |
| About |  | /about | KEEP-ADAPT |

Header button: "Let's talk" - KEEP-ADAPT (from the CTA library in context/VOICE.md).

### 1.2 Footer (`FOOTER`)

- Closer line: "Made for hosts who'd rather be present." - KEEP-ADAPT
- Address: [NEEDS CLIENT: address]
- Phone: [NEEDS CLIENT: phone]
- Email: hello@foodbiz.co.in - NEEDS-CLIENT (confirm the mailbox exists and who reads it)
- Social: Instagram https://www.instagram.com/foodbizcatering - KEEP-ADAPT (only verified handle)
- Cities line: "Mumbai | Bengaluru | Aurangabad" - NEEDS-CLIENT (only cities the photo library shows; not a founder-confirmed list)
- Copyright: "(c) Foodies Hospitality. All rights reserved." - KEEP-ADAPT
- Footer links: Home, About, Moira, Caterpillar, Pillar Live, Gummy Gourmet, Work, Contact, Privacy, Terms - DROP the sub-brand links, rebuild around services

### 1.3 Site settings (`lib/site.ts`)

- Site name: "Foodbiz".
- Canonical URL falls back to https://foodbiz-brief-box.vercel.app until a real domain is set.
- Search engines are blocked (robots disallow all + noindex) until NEXT_PUBLIC_ALLOW_INDEXING is "true". Keep that behaviour until launch.

---

## 2. Homepage (/)

### 2.1 The Brief Box hero (`HERO`) - DROP

The client said the landing page "could be a data/analytics company". The type-in-a-brief box is the old concept. Lines kept here for reference only.

- Prompt: "What are you planning?"
- Placeholder: "A wedding, an event, a kid's party..."
- Chips: "A wedding", "A corporate launch", "A 1000+ person event", "An office lunch programme", "A kid's birthday", "Honestly, I don't know yet"
- Strapline: "Catering & hospitality | Mumbai" - KEEP-ADAPT (says plainly what the business is)
- Reset button: "Change brief"; empty nudge: "Tell us a bit more."
- Language note: "We respond in English and Hindi." - KEEP-ADAPT (confirm they really do respond in Hindi; NEEDS-CLIENT)

### 2.2 Story (`STORY`) - KEEP-ADAPT, with facts NEEDS-CLIENT

> We started in a kitchen in Powai. We still cook out of Powai. What's changed is how much comes out of it.

> We do weddings, corporates and events. We've also built specialist brands for each, because doing all three well at the same time needs different muscles. The promise underneath all of them is the same one Amar and Kush started with: outsource the stress to us, and be present at your own event.

Pull quote: "We're not just in the business of food. We're in the business of food and experience." - Amar Jog and Kushal Shetty, founders. KEEP-ADAPT (the "food and experience" line is the founders' own words).

Notes: "kitchen in Powai" comes from an earlier brief. The voice-note player is built but has no audio (NEEDS-CLIENT: Amar has not recorded one).

### 2.3 Headline figures (`STATS`) - only the confirmed ones rendered

- **Five** - specialist brands - one for each kind of event (confirmed: true). "Five brands" is now OUT OF DATE: Pillar Live is dropped and sub-brands are deferred. DROP/rewrite.
- **Two** - founders, still running the kitchen and the floor (confirmed: true). "Five brands" is now OUT OF DATE: Pillar Live is dropped and sub-brands are deferred. DROP/rewrite.

The old unconfirmed counters (thirty years, 1,800+ events, 21 cities, four countries) do not render. See SIGNOFF.

### 2.4 Sectors line (`SECTORS`) - KEEP-ADAPT

Every one is evidenced in the client photo library.

Luxury retail, Automotive, Watches, Banking and funds, Streaming, Music festivals, Sport, Aviation, Weddings, Children's parties.

### 2.5 Entry cards ("Or start from a brand") - DROP

- Eyebrow: "Or start from a brand"
- Heading: "Five specialist brands. One kitchen behind them."
- Body: "Weddings, corporate dining, large events and children's parties each need a different kind of attention, so we built a brand for each. Pick the one that sounds like you."

This is the sub-brand-led structure the client asked us to replace. The idea "one kitchen behind everything" is worth keeping in a services framing.

### 2.6 Other homepage section labels

- "The five tables" panel set - DROP (sub-brand panels; button "Take me here")
- "Selected work" - KEEP-ADAPT; filter chips: Weddings, Corporate, Brand launches, Live & festivals, Kids
- "Brands we've hosted" wall - NEEDS-CLIENT (logo-use rights, see section 5)
- "What happens next" process band - KEEP-ADAPT (the process steps are in section 3)
- "The story, briefly" - KEEP-ADAPT
- "The people" / "The team behind the work" - NEEDS-CLIENT (see section 6)
- Hero scroll cues: "A quick read below", "Scroll" - DROP

### 2.7 What the Brief Box says back (`lib/intent.ts`) - DROP

When a visitor types, a keyword matcher picks a sub-brand and shows one line. These lines name the sub-brands, so they are DROP, but the plain tone is worth noting.

| Match | Line shown | Form heading |
|---|---|---|
| Moira (weddings) | Sounds like a Moira brief. Here's what that looks like. | Tell us about your wedding. |
| Pillar Live | This is the kind of event Pillar Live is built for. Read on. | Brief us on your event. |
| Caterpillar | Caterpillar territory. Here's how we'd run it. | Plan a corporate programme. |
| Gummy Gourmet | Kid's party. Our favourite brief. Read on. | Tell us about the party. |
| Foodbiz (default) | Got it. Here's what we do, all of it. We'll figure out which corner we're in together. | Tell us what you're planning. |

Submit button on every form: "Send the brief". Keyword lists (wedding, sangeet, office lunch, birthday, summit, 1000+ guests and similar) are in lib/intent.ts. A guest count of 300 or more nudged toward Pillar Live. DROP the whole matcher; the form headings are KEEP-ADAPT.

---

## 3. Sub-brand pages -> become service pages

Each old page has: hero (brand name, tagline, description, button), lede, three blocks, a process, a menu panel, selected work, gallery, cross-links, closing line. Hero photos are in section 4.

### 3.1 Moira (/moira) - KEEP-ADAPT -> Service 1 Weddings

- Tagline: "The wedding side of Foodbiz."
- Description: "Multi-day weddings, the family dishes that have to be there, cross-cultural menus, and someone who actually shows up to the morning haldi. Built for couples and families who'd rather enjoy their wedding than manage it."
- Button: "Tell us about your wedding"
- Lede: "Weddings are the hardest catering there is. Not because of the food - because of everyone the food has to mean something to."

**Three blocks**

- **We start with your family, not our menu.** Before we write anything down, we sit with you and work out what has to be on the table. Your mother's khichdi. Your grandmother's gajar ka halwa. The dish an aunt will notice is missing. Those go in first, and we build the rest around them.
- **A multi-day wedding is many events, not one.** Mehndi, haldi, sangeet, the wedding, the reception - each has its own hour, its own mood and its own appetite. We plan them separately and staff them separately, so the breakfast after a late sangeet is as considered as the dinner before it.
- **Dietary detail is the job, not an exception.** Jain, satvik, halal, no onion or garlic, allergies that matter. Tell us once. We carry it through every counter, every service and every day, and we label so guests never have to ask.

**How a wedding runs with us**

1. **We meet.** You tell us the shape of it - days, ceremonies, families, and the dishes that aren't negotiable.
2. **We taste.** You eat the menu before your guests do, and we change what doesn't land.
3. **We plan the days.** Each ceremony gets its own menu, its own timing and its own team.
4. **We arrive early.** Our team is on site before the first guest, every day of it.
5. **You're a guest.** That's the whole point. Someone else is watching the counters.

Closing line: "Tell us about your wedding. Even if it's a year out and nothing is fixed yet."

Search listing title: "Moira - the wedding side of Foodbiz"
Search listing description: "Multi-day wedding catering in Mumbai and beyond. Family recipes, cross-cultural menus, and a team that shows up for the morning haldi."

**Menu panel ("what a menu is built from", not real dishes)**: A wedding menu starts with the dishes your family expects to see, and gets built outwards from there. This is the range we draw on.

- Where the food comes from: Regional Indian, Traditional, Cross-cultural, Contemporary, Family recipes
- How it's served: Live counters, Plated, Thali service, Grazing tables, Late-night counters
- Always accounted for: Jain, Satvik, Halal, No onion or garlic, Allergies, labelled

### 3.2 Caterpillar (/caterpillar) - KEEP-ADAPT -> Service 4 Corporate & office dining

- Tagline: "Lunch, every day, well."
- Description: "Same team, same standards, fresh menu every day. Built for offices that take what their people eat seriously. Daily corporate dining, executive lunches, the events your office hosts every month."
- Button: "Plan a corporate programme"
- Lede: "Lunch for the same people, five days a week, for years. It's the least glamorous thing we do and the hardest to do well."

**Three blocks**

- **The test is Tuesday, not the launch party.** Anyone can cook well once. Doing it every day for the same room, without the menu going stale and without the standard slipping, is a different discipline. That's what this brand is for.
- **Same kitchen, same team, new menu.** Your programme runs off the same kitchen and the same people as everything else we do. The menu changes daily; who's cooking it doesn't.
- **Built to fit a working day.** A lunch window is short and everyone arrives at once. We plan counters, flow and covers around that, so people eat and get back to work without queuing through their break.

**Setting up a programme**

1. **We look at your floor.** Headcount, timings, the room, and where a counter can actually go.
2. **We propose a cycle.** A menu rotation long enough that nothing repeats before people want it to.
3. **We run a trial week.** You see the real thing, on your floor, with your people eating it.
4. **We settle in.** Standing programme, standing team, monthly review of what's working.

Closing line: "Tell us how many people you feed and when they eat."

Search listing title: "Caterpillar - recurring corporate dining by Foodbiz"
Search listing description: "Daily corporate dining, executive lunches and office food programmes in Mumbai. Same team, same standards, a fresh menu every day."

**Menu panel ("what a menu is built from", not real dishes)**: A programme menu rotates so nothing repeats before people want it to. This is the range it rotates through.

- Where the food comes from: Regional Indian, Global, Contemporary, Comfort cooking
- How it's served: Daily counters, Executive dining, Working lunch, Grazing
- Always accounted for: Vegetarian, Jain, Allergies, labelled

### 3.3 Gummy Gourmet (/gummy-gourmet) - KEEP-ADAPT -> part of Service 2 Celebrations & private dining

- Tagline: "Real food for small people."
- Description: "No neon icing. No mystery cheese. Mini pizzas with faces, sliders kids actually finish, and a counter they want to walk up to. Birthdays, kids' menus at adult events, school programmes."
- Button: "Plan a kids' party"
- Lede: "Real food for small people. The party still looks like a party - the food just isn't an apology."

**Three blocks**

- **Food children actually finish.** Mini pizzas with faces on them. Sliders sized for small hands. A sushi board a nine-year-old will try because it looks like fun, not like a dare. We cook for what children eat, not for what looks good in a photograph.
- **A counter they want to walk up to.** Children eat with their eyes and their feet. We build low counters they can reach, with things happening on them, so eating is part of the party rather than an interruption to it.
- **Parents get fed too.** There are always adults at a children's party, standing up, holding a bag. We plan for them as well, so nobody leaves hungry.

**Planning a party**

1. **Tell us the age.** A four-year-old's party and a ten-year-old's party are different jobs.
2. **Tell us the theme.** We'll cook to it without turning everything into sugar.
3. **Tell us the allergies.** We label everything and keep it separate. Parents shouldn't have to ask.
4. **We set up and clear.** You get the party. We take the mess.

Closing line: "Tell us whose birthday it is and how old they're turning."

Search listing title: "Gummy Gourmet - children's catering by Foodbiz"
Search listing description: "Gourmet catering for children in Mumbai. Real food, proper labelling for allergies, and a counter kids want to walk up to."

**Menu panel ("what a menu is built from", not real dishes)**: A children's menu is judged on what gets finished. This is what we build from.

- What children actually eat: Mini pizzas, Sliders, Pasta, Dosa, Fruit
- How it's served: Low counters they can reach, Live stations, Boards to share
- Always accounted for: Allergies, labelled and kept separate, Something for the adults

### 3.4 Pillar Live (/pillar-live) - DROP (Pillar Live dropped by client)

- Tagline: "Built for the big briefs."
- Description: "Festival grounds, stadium days, launches with a protocol list and a security perimeter. When the guest count runs to thousands and the schedule is set by someone else, this is the team that takes it."
- Button: "Brief us on your event"
- Lede: "Festival grounds, stadium days, launches with a protocol list. When the schedule belongs to someone else and the guest count runs to thousands."

**Three blocks**

- **We work to someone else's clock.** At scale, catering doesn't set the timing - the run sheet does. Sets, speeches, reveals and security windows come first, and the food has to land inside them. We plan backwards from the schedule you're given.
- **Volume without a drop in the room.** Feeding thousands is a logistics problem before it's a cooking one: counters, flow, holding, restocking, and staff who know where to stand. We plan all of it before we plan a menu.
- **We're used to the paperwork.** Accreditation, perimeters, load-in slots, restricted access, vendor briefings. We've worked events where all of that is fixed before we arrive, and we come with the documentation done.

**How a large event runs**

1. **We read the run sheet.** Before menus. The schedule decides what's possible.
2. **We walk the site.** Access, power, water, load-in, and where the counters can physically live.
3. **We plan the flow.** Where people queue, how long for, and how we keep it moving between sets.
4. **We staff to the peak.** Not to the average. The peak is the only number that matters.
5. **We're there for load-out.** The site goes back the way we found it.

Closing line: "Send us the run sheet and the guest count. We'll tell you what it takes."

Search listing title: "Pillar Live - large-scale event catering by Foodbiz"
Search listing description: "Festivals, stadium events and launches with protocol requirements. Catering built for scale, schedules and security perimeters."

**Menu panel ("what a menu is built from", not real dishes)**: At scale the menu is built around the run sheet - what can be held, plated and moved inside the window you're given.

- Where the food comes from: Global, Regional Indian, Contemporary, Street food
- How it's served: High-volume counters, Grazing, Boxed service, Bar and cocktails
- Always accounted for: Vegetarian, Vegan, Allergies, labelled

Note: the ideas here (work to someone else's clock, volume, paperwork) are claims about capability at scale. If the client keeps large events as part of a solution, treat them as NEEDS-CLIENT.

### 3.5 Parent brand page card (`SUBBRANDS.parent`) - KEEP-ADAPT

- Tagline: "The full spread."
- Description: "The parent brand. Weddings, corporates, events - whichever you've come for, you can start here. We'll route you to the right team."
- Button: "Brief us"
- Menu panel intro: "Every menu is written for the brief. This is the range we draw on."; Where the food comes from: Regional Indian, Global, Traditional, Contemporary, Fusion; How it's served: Live counters, Plated, Grazing tables, Boxed service; Always accounted for: Jain, Satvik, Halal, Vegan, Allergies, labelled

---

## 4. Work (/work) and the 24 case studies (/work/[slug])

/work intro line: "Weddings, corporate programmes, brand launches, festival grounds and children's parties. A selection - the full list is longer and quieter." - KEEP-ADAPT
Search title: "Selected work - Foodbiz"; description: "A selection of Foodbiz's catering work across weddings, corporate dining, brand launches, festivals and children's parties."
Closing CTA on /work and every case page: "Brief us on something similar." - KEEP-ADAPT
Case pages also carry: breadcrumbs, previous/next, a menu section ("The menu" / "On the menu"; the fallback sentence is in section 7), and a gallery.

The client wants new short "what was the brief" stories, about five top events per service eventually. The captions below describe what the photographs show only; none gives a brief, guest count, venue or date. They are a starting point, not finished stories. Every client name is NEEDS-CLIENT (logo and name use rights, SIGNOFF item 3).

| # | Slug | Client | Event | Caption (verbatim) | Old category | Old brand | Photo folder (public/images/) | Tag |
|---|---|---|---|---|---|---|---|---|
| 1 | cartier | Cartier | Boutique event | Canapes off slate, drinks built to order, and a floor team that kept moving all evening. | Brand launches | Foodbiz | cartier | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 2 | mercedes-eqg | Mercedes-Benz | EQG launch | A reveal lit in blue and violet. We built the food to read at night, under coloured light, in photographs. | Brand launches | Foodbiz | merc-eqg-launch | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 3 | raymond | Raymond | Chairman's Lounge | A small room, a senior guest list, and trays that had to look right from every angle. | Brand launches | Foodbiz | raymond-chairmans-lounge | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 4 | diosa | Diosa | Store launch | Caviar tartlets, a marble console, and the brand's name in flowers behind it. | Brand launches | Foodbiz | diosa-store-launch | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 5 | hublot | Hublot | Boutique event | A grazing table run down the length of the room, restocked all evening. | Brand launches | Foodbiz | hublot | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 6 | ferrari | Ferrari | Launch event | Red on red. The car was the centrepiece; we plated to it. | Brand launches | Foodbiz | ferrari | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 7 | defender | Land Rover | Himalayan Defender Journey | A cheese board set beside the vehicle, named cards on every wedge. | Brand launches | Foodbiz | himalayan-defender-journey | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 8 | air-india-express | Air India Express | Livery launch | Aircraft on one side, a copper buffet counter on the other, and a night to fill. | Brand launches | Pillar Live | air-india-express | KEEP-ADAPT as an event story (old Pillar Live label DROPPED) + NEEDS-CLIENT (name rights) |
| 9 | love-beauty-planet | Love Beauty and Planet | Brand day | Infusions, cut fruit and a living wall. Daylight, outdoors, all of it holding for hours. | Brand launches | Foodbiz | love-beauty-planet | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 10 | crunchyroll | Crunchyroll | Launch party | A ramen counter cooking to order, with a queue in front of it all night. | Brand launches | Foodbiz | crunchyroll | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 11 | casio | Casio | Retail event | Warm lamps, garden air, and a counter built to be read slowly. | Brand launches | Foodbiz | casio | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 12 | un40 | UN40 | Festival grounds | Gold canopies over the picnic tables, a ferris wheel behind them, and a crowd to feed between sets. | Live & festivals | Pillar Live | un40 + NEEDS-CLIENT; hero frame is HELD, do not copy |
| 13 | rolling-loud | Rolling Loud | Festival catering | Service that had to run to the set times, not the other way round. | Live & festivals | Pillar Live | rolling-loud | KEEP-ADAPT as an event story (old Pillar Live label DROPPED) + NEEDS-CLIENT (name rights) |
| 14 | red-bull-f1 | Red Bull | Race screening | A show car on the carpet and a room that emptied and filled with the race. | Live & festivals | Pillar Live | red-bull-f1-screening | KEEP-ADAPT as an event story (old Pillar Live label DROPPED) + NEEDS-CLIENT (name rights) |
| 15 | sbi | State Bank of India | Bank Day | A long line of chafing dishes, lamps down the length of it, and a fixed lunch window. | Corporate | Caterpillar | sbi | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 16 | netflix | Netflix | Press event | Six trays, one line, and a room that had to be served between sessions. | Corporate | Caterpillar | netflix | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 17 | motilal-oswal | Motilal Oswal | Wealth Creation Study | Canapes on tiered boards at a window table, with the city doing the rest. | Corporate | Caterpillar | motilal-oswal | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 18 | uti | UTI Mutual Fund | Corporate programme | Banana leaf, brass and white lilies. A working lunch that didn't look like one. | Corporate | Caterpillar | uti | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 19 | bloomberg | Bloomberg | Square Mile Relay | An outdoor corporate relay between office towers. Feed the runners, then feed everyone else. | Corporate | Caterpillar | bloomberg-bsmr | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 20 | wedding-bengaluru | A family in Bengaluru | Wedding | A gold buffet built up in tiers, a chef finishing plates by hand, and dessert that arrived looking like it was grown. | Weddings | Moira | bangalore-wedding | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 21 | wedding-aurangabad | A family in Aurangabad | Wedding | Brass thalis, printed menus at every setting, and a welcome that started at the gate. | Weddings | Moira | aurangabad-wedding | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 22 | wedding-bayview | A wedding at Bayview Lawns | Wedding | Chai and ice cream outdoors, earthen pots along a wooden counter, and a live counter running past midnight. | Weddings | Moira | bayview-lawns-wedding | KEEP-ADAPT + NEEDS-CLIENT (name rights) |
| 23 | playseum | Playseum | Children's counters | A counter small people want to walk up to, with food they finish. | Kids | Gummy Gourmet | playseum-set-ups | KEEP-ADAPT for Kids (deferred sub-brand) + NEEDS-CLIENT |
| 24 | kids-ninja | A birthday in Mumbai | Children's party | Pizzas with faces on them. Sliders in ramekins. A sushi board a nine-year-old will try. | Kids | Gummy Gourmet | ninja | KEEP-ADAPT for Kids (deferred sub-brand) + NEEDS-CLIENT |


### 4.1 Brands wall (`BRANDS_WALL`) - NEEDS-CLIENT

Heading: "Brands we've hosted". Closing line: "And a long list of families who'd rather their names weren't on a wall."

Names (text only, no logos): CARTIER, FERRARI, MERCEDES-BENZ, HUBLOT, RAYMOND, NETFLIX, SBI, BLOOMBERG, UTI, MOTILAL OSWAL, AIR INDIA EXPRESS, RED BULL, ROLLING LOUD, CRUNCHYROLL, LAND ROVER, CASIO, LACOSTE, GALERIES LAFAYETTE, ROCA, EDELWEISS, KOTAK, TIMES NETWORK, VODAFONE, RANGE ROVER, INDIAN NAVY, ULTRA JAPAN, YOUTUBE, INSTAGRAM.

Source is the 2025 client presentation plus the photo library, not a signed-off list. Some luxury clients bar suppliers from publicising work. Nothing here is usable until Amar and Kushal approve name by name. Indian Navy, Edelweiss, Kotak, Times Network, Vodafone, Range Rover, Ultra Japan, YouTube, Instagram, Lacoste, Galeries Lafayette and Roca have no case study on the new list; treat as lowest confidence.

---

## 5. About (/about) - KEEP-ADAPT

Lede: "Two founders, one kitchen in Powai, and five brands that came out of it." (DROP "five brands" part)

> Foodbiz is a catering and hospitality company in Mumbai, run by Amar Jog and Kushal Shetty. We cook for weddings, for offices, for brand launches, for festival grounds and for children's birthdays - and over time each of those turned out to need a different kind of attention, so we built a brand for each.

> What doesn't change is the promise underneath: outsource the stress to us, and be present at your own event. Our clients have mostly come from other clients recommending us, which is a slow way to grow and a good way to stay honest.

**What we hold to**

- **Food and experience, not food alone.** We're not just in the business of food. We're in the business of food and the evening around it - how it's served, when, by whom, and how it feels to be a guest in the room.
- **Be transparent about what things cost.** You should know what you're paying for and why. No line items that only make sense to us.
- **The host should get to enjoy it.** If you spend your own event managing your own event, we haven't done our job.
- **Say what the food is.** Name the dish, the region, the cook. Heritage comes through on the plate, not in the adjectives around it.

Search title: "About Foodbiz - Mumbai catering and hospitality"; description: "Foodbiz is a Mumbai catering and hospitality company run by Amar Jog and Kushal Shetty, with five specialist brands for weddings, corporates, large events and children's parties."

Note: "Our clients have mostly come from other clients recommending us" is a business claim not in a founder-signed document. NEEDS-CLIENT.

## 6. People (home and /about) - NEEDS-CLIENT

Opener: "Two founders. A team that's been together long enough that the kitchen runs without raised voices."

- **Amar Jog**, Co-founder. Amar runs the front of the business - clients, brands, and the weeks where everything has to come together at once. (No portrait yet: renders an empty placeholder block.)
- **Kushal "Kush" Shetty**, Co-founder. Kush runs the back of the business - the kitchen, the food, and the standards everything is held to. (No portrait yet: renders an empty placeholder block.)

Team cards (placeholders with role titles, no real names):

- Head Chef - Kitchen lead: "I plate the food we serve."
- Events Lead - Operations: "I run the days you've been planning for a year."
- Pillar Live Lead - Large events: "I read the run sheet before I read the menu." DROP
- Moira Lead - Weddings: "I sit with families. Then I plan the menu."

The founder bios are a one-line inference of who runs what (front vs kitchen). Confirm with Amar and Kushal. "Team that's been together long enough that the kitchen runs without raised voices" is unverified.

---

## 7. Contact (/contact), form and menus

Lede: "Send a brief, or just call. Both work."
Body: "If you already know what you're planning, the form is faster - it reaches the right team directly. If you'd rather talk it through first, Amar picks up."
Search title: "Contact Foodbiz - Mumbai catering"; description: "Send Foodbiz a brief, or call. [NEEDS CLIENT: address]."

**Brief form (`FORM_COPY`)** - KEEP-ADAPT

- Subline: "We'll come back within a working day."
- Fields: What you're planning | When | Where | Roughly how many guests | Your name | Your number or email | Anything we should know up front?
- Hints: When "A month or rough date is fine."; Guests "A range works."; Contact "One or the other."; Notes "Optional."
- Success: "Got it, <name>. We'll be in touch within a working day. If it's urgent, call [NEEDS CLIENT: phone] - say you sent a brief."
- Network error: "That didn't go through. Try once more, or call [NEEDS CLIENT: phone]."
- Acknowledgement email subject: "We've got your brief"; body: "<name>, Thanks - your brief has reached us. We'll come back within a working day. If it's urgent, call [NEEDS CLIENT: phone] and say you sent a brief." (app/api/brief/route.ts)
- Email to Foodbiz subject: "Brief from <name> - <when>"

"Within a working day" is a service promise: NEEDS-CLIENT.

**Menu panels on case pages**

- Fallback sentence when a case has no real menu: "We don't publish the menu from an individual event. Every one is written for the brief in front of us - tell us yours and we'll build it."
- Sub-brand version: "There's no standing menu. Every one is written for the brief in front of us."

**Menus built from the client's own photographs (`EVENT_MENUS`)** - KEEP-ADAPT, NEEDS-CLIENT (confirm each)

- **bloomberg** - source: Transcribed from the event's own menu board, photographed on site. Every runner took one of each course, then chose between a vegetarian or meat main and a dessert.
 - Hot pot: Tibetan thukpa (Dumplings soaked in piping hot thukpa with noodles. Served with a choice of classic veg momos or classic chicken momos.)
 - Salad: Corfu salad (Feta, cucumber, onion, kidney beans, tomatoes, olives, mixed lettuces, parsley, crunchy croutons and a lemon vinaigrette.)
 - Main meal: Cottage cheese and bamboo shoots with stir-fried rice (Broccoli and water chestnuts tossed in smoked chilli ginger sauce; the rice with edamame, enoki mushrooms, garlic chips and a mildly spiced Chinese cabbage.); Stir-fry veg (Snow peas, edamame, long beans, baby spinach and carrots tossed in smoked chilli garlic.); Tempura chicken (Broccoli tossed in black bean sauce.)
 - Dessert: Banana milk chocolate slice (With cardamom cream.); Quinoa chocolate brownie
 - Footnote: (Ve) vegan | (Ve*) vegan on demand | (V) vegetarian | (D) dairy. Menus contain allergens and are prepared in kitchens that handle nuts, shellfish, gluten and eggs - speak to the team about any allergy.
- **wedding-bayview** - source: Counter names from the Foodbiz signage in the event photographs.
 - Live counters: Thai Chatuchak ice cream; The Mangolian (A live wok counter.); Chai
- **kids-ninja** - source: Dish names from the Foodbiz counter cards in the event photographs.
 - Counters: Ninja margherita pizza (Made with faces on them.); Sliders (Sized for small hands, with dips.); Sushi board
- **crunchyroll** - source: Counter name from the event signage in the photographs.
 - Live counter: Ramen (Cooked to order through the evening.)

---

## 8. Legal pages (/legal/privacy, /legal/terms) - KEEP-ADAPT, NEEDS-CLIENT

Plain-language drafts written for what the old site did (a form that emails Foodbiz, no cookies, no tracking). They say "published with our clients' agreement" about photos, which is NOT yet true for all frames. Foodbiz's own counsel must read these before launch. Not legal advice. Updated stamp: September 2026.

### Privacy

- **What we collect.** Only what you type into the brief form: what you're planning, when and where, a rough guest count, your name, a phone number or email address, and any notes you add. Nothing else. There is no account to create and no profile behind the scenes.
- **What we do with it.** We email it to ourselves so we can reply to you, and we send you an acknowledgement if you gave us an email address. We use it to quote for and plan your event. We don't sell it, rent it, or pass it to anyone outside Foodbiz.
- **How long we keep it.** For as long as we're talking to you about your event, and for our own records afterwards. Ask us to delete your enquiry and we will.
- **Cookies and tracking.** This site sets no cookies and runs no advertising or tracking scripts. Our host keeps standard server logs, which include IP addresses, for security and reliability.
- **Photographs.** The photographs on this site are from events we've catered, published with our clients' agreement. If you appear in one and would rather not, write to us and we'll take it down.
- **Getting in touch.** Questions about any of this, or a request to see or delete what we hold: hello@foodbiz.co.in.

### Terms

- **About this site.** This site is published by Foodies Hospitality, trading as Foodbiz, of [NEEDS CLIENT: address].
- **What's on it.** The pages describe the kind of work we do. They aren't a quote or an offer. Menus, prices, availability and what we can deliver are agreed in writing for each event.
- **Sending a brief.** Sending a brief starts a conversation. It doesn't create a booking, and it doesn't hold a date. A booking exists once we've both confirmed it in writing.
- **Photographs and marks.** The photographs, text and brand marks on this site belong to Foodies Hospitality or to the clients concerned. Third-party names and marks appear to identify work we've catered and remain the property of their owners.
- **Governing law.** These terms are governed by the laws of India, and the courts at Mumbai have jurisdiction.

---

## 9. SIGNOFF list - claims awaiting founder confirmation (verbatim from `SIGNOFF` in lib/content.ts)

**These items must NOT be published until Amar or Kushal confirms each one in writing.** None of them rendered on the review site. Do not put any of them into new copy, new pages, captions, alt text or AI-generated imagery prompts.

1. **Years in business.** The draft ran "thirty years" and "started in 1996". Neither appears in any source document we hold. Need the founding year.
2. **Events delivered, cities, countries.** The draft ran "1,800+ events", "21 cities", "four countries" as animated counters. Unsourced. Need real figures or they stay off.
3. **Canonical client list and logo-use rights.** an earlier brief section 4 already flags this. Some luxury clients contractually bar suppliers from publicising the work. Needs a name-by-name yes.
4. **Photographs showing guests and public figures.** 37 frames held back: identifiable wedding guests and festival-goers, international cricketers, a press panel. Need releases or they stay out.
5. **Licensed character parties.** Eight Gummy Gourmet frames show Peppa Pig, My Little Pony and BlackPink settings, one naming a child. Foodbiz catered them; the characters belong to others. Held back.
6. **Real menus per event.** Every sub-brand and case page has a menu section. Four are filled from the client's own photographs - the Bloomberg menu board in full, plus counter names at Bayview Lawns, the Ninja birthday and Crunchyroll. The other 20 cases show the brand's cuisine range instead, because attributing invented dishes to Cartier or SBI is not something we'll publish. Send menus and they drop straight in.
7. **Founder portraits.** Amar and Kush render as empty placeholder blocks until we have real photographs.
8. **Amar's voice note.** The player is built. The audio has never been recorded, so the block stays out rather than carry a written quote he didn't say.
9. **Social handles beyond Instagram.** LinkedIn, Pinterest and YouTube were linked to "#". Removed until we have real URLs.
10. **"Gourmair".** A name appears on the counter in the Air India Express photographs. Unexplained in any document we hold - is it a Foodbiz line, or the client's?

Two more open points from the engagement notes: domain/DNS access for foodbiz.co.in (the form cannot send until the sending domain is verified), and logo-use rights for the named client list (same as item 3).
