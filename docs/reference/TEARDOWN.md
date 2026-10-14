# Teardown: obcatering.com (Oliver & Bonacini Catering, Toronto)

Date: 2026-10-14. Agent A. Written for Nidhi and Suhani. Plain English; jargon explained in brackets.

Why this exists: on 2026-09-30 Amar and Kushal said this is the site they love. Amar's line to keep in mind: "The greatest of the stories are the ones which are told simply." He liked it on a wide screen but said that on a phone the O&B site itself is weak. So this document separates what to copy (structure, restraint, story) from what not to copy (their mobile).

All screenshots are in `shots/`, named `<page>-<phone|desktop>-fold<N>.png` (a "fold" is one screen-height slice, going down the page). Phone = 360x640 at 2x, desktop = 1440x900. Every shot named below was looked at. Open mobile menu: `shots/menu-open-phone.png`. Per-page measured facts (fonts, colours, load size) are in the `shots/*.shots.json` files.

Caveat: I shot folds 1 to 4 per page (and 3 for What's New), so the bottom of long pages (footer, closing CTA) is described from the page text, not from a picture. Text was pulled from the live HTML.

---

## 1. Site map as they built it

It is a WordPress site (the file paths show `wp-content`) on the Oliver & Bonacini network. Small: about 9 real pages.

```
Header (same on every page)
  Logo (links home) | About v | Services v | Venues | Order Online | [Inquire] button
    About v      -> Our Story, What's New, Contact
    Services v   -> Full-Service Catering, Drop Catering, Wedding Catering, Corporate Hospitality Solutions

Pages
  /                                   Home
  /full-service-catering/             Service page
  /drop-catering/                     Service page
  /wedding-catering/                  Service page
  /corporate-hospitality-solutions/   Service page
  /venues/                            Partner venues (20 cards) + link out to O&B's own venue sites
  /our-story/                         Story, team bios, values, sustainability
  /whats-new/                         Blog / event stories index (note: NOT /news/)
  /news/<story-slug>/                 One event story each (6 on the home page)
  /contact/                           Inquiry form + phone, emails, address
```

Footer (same on every page): newsletter sign-up, phone, one events email, Instagram and Facebook, three cross-links (Venues, Order Online, Queen's Cross food hall), privacy policy, copyright, back-to-top.

Closing band on every page, just above the footer: "Start Planning Your Event with O&B Catering" with two buttons, Submit an Inquiry and Explore Venues, plus phone and email.

Two things worth noticing:
- Four services, one venues page, one story page, one stories page, one contact page. That is the whole company. Nothing else competes.
- Their two "drop catering" brands (Gather, Queen's Cross) are sub-brands, and the site does NOT lead with them. They appear as two buttons inside the Drop Catering page and as "Order Online" in the nav. This is exactly the pattern the client wants for Moira, Caterpillar and the rest: solution first, sub-brand as a small mention inside.

---

## 2. Page by page, section order

### 2.1 Home (`home-*.png`)

1. **Header.** Cream bar, logo left, nav right, one outlined Inquire button. (home-desktop-fold1)
2. **Hero video.** Full-width looping silent video: a hand placing an orange napkin on a plate. Headline "Menus as Memorable as the Moment" in white serif, one green button "Plan Your Event". Nothing else. Why it works: one image, one line, one action. The food is not even in the frame, it is the table, which feels like a restaurant, not a catering brochure.
3. **Four service blocks**, stacked, each half photo and half text, alternating left and right (zig-zag). Each block is: photo, service name as a heading, a 3-sentence paragraph, one outlined button to that service page. Order: Full-Service, Drop, Wedding, Corporate Hospitality Solutions. (home-desktop-fold2, fold3, fold4). Why it works: the home page IS the menu of services; a visitor knows what they sell within 5 seconds of scrolling.
4. **About Us.** One paragraph, link to Our Story.
5. **Featured Venues.** Six venue names with photos, "Explore All Venues" link.
6. **Get Inspired.** Six event stories as cards (photo, title, one-line summary): weddings, a corporate event, a museum dinner, a cause event, an alumni dinner. This is the proof-of-work section. It names real clients and real venues.
7. **Closing band** (Start Planning your Event), then footer.

### 2.2 The repeated service-page template (full-service, wedding, corporate, drop)

All four service pages are built from one template. This is the single most useful thing to copy. Order:

1. **Split hero** (desktop): left half is one big food photo, right half is cream text. Text = H1 ("Wedding Catering in Toronto"), a one-line promise ("Your love story deserves a menu to match."), one paragraph, a thin rule, then a second heading "WHY CHOOSE O&B CATERING?" with a one-line promise and one paragraph. (full-service-desktop-fold1, wedding-desktop-fold1). On phone the photo stacks on top, the text below. (full-service-phone-fold1)
2. **Dark green "Services" band.** Heading "Services", a one-line promise, two short paragraphs about what is included, one outlined button (View Package / View Toronto Catering Package). (full-service-desktop-fold2, corporate-desktop-fold2)
3. **"Looking for something more tailored?"** Two italic lines inviting a custom conversation, with a Get in touch link. Sits in the same green band.
4. **"How it works" / "The Planning Process".** Photo left, text right with a thin vertical rule. Always a one-line promise ("Smart. Streamlined. Supported.") then one paragraph in three beats: we listen, we plan, you relax. (corporate-desktop-fold2, drop-desktop-fold2)
5. **Photo grid / gallery.** Big, uncropped food photographs in two columns with generous gaps, no captions. (full-service-desktop-fold3, fold4)
6. **Closing band** "Start Planning Your Event" (shared with every page).

Pattern inside the copy: every block opens with a short promise sentence, then one paragraph. No bullet lists, no feature grids, no icons. The drop page replaces "View Package" with two Order buttons (they have an online ordering flow); the corporate page talks about a portal and rebates (they have a B2B program). The template flexes without changing.

### 2.3 Venues (`venues-*.png`)

1. Green band: tall photo of a set room on the left; right: H1 "Explore Our Network of Partner Venues", two paragraphs, an underlined text link. (venues-desktop-fold1)
2. "Looking For More?" - we can cater anywhere; link to O&B's own venues.
3. "O&B Partner Venues": 3-column photo grid. Each card = photo, venue name, venue type, capacity number, "Learn More". 20 venues, shown with a Load More button. (venues-desktop-fold2) The venues are wildly different (a nightclub, an art gallery, a leafy installation) which sells range.
4. Closing band.

### 2.4 Our Story (`our-story-*.png`)

1. Green band, centred H1 "Our Story", six short paragraphs of plain prose (restaurant pedigree, approach, community and suppliers, venues, positioning). (our-story-desktop-fold1) No timeline, no stats, no "since 19xx".
2. A big food-ingredient photo (asparagus laid in a row) as a breather. (our-story-desktop-fold2)
3. "Our Team": four named people with photo, role, a 2-sentence bio, and a Read More that opens the full bio.
4. Company Values (one paragraph). Sustainability (one paragraph).
5. Closing band.

### 2.5 What's New and an event story (`whats-new-*.png`, `news-geena-nicks-*.png`)

- **What's New index:** green band with H1 and one sentence, then a big hero photo and a list of story cards.
- **Event story page (a "case story"):** green band with H1 (names + venue, e.g. "Geena & Nick's Romantic Wedding at Steam Whistle Roundhouse"), one-sentence summary, one wide photo. (news-geena-nicks-desktop-fold1) Then a cream section: a second serif heading ("A Romantic Celebration in the Heart of Toronto"), a photographer credit line, then four short paragraphs: the venue and look, the first thing guests got, what was served, a warm sign-off ("it was a pleasure to be part of your unforgettable day"). Ends with two buttons: "Wedding Package" (back to the service page) and "Inquire". (news-geena-nicks-desktop-fold2)
- Why it matters for Foodbiz: this is the "what was the brief" story format the client asked for, and it is only about 150 words plus a few photos. Notice it does not explain a brief explicitly; it describes the room, the first moment, the menu and the feeling. Foodbiz can be more direct: Brief, What we did, What was served, How it felt.

### 2.6 Contact (`contact-*.png`)

Green band, two columns on desktop: left = H1 "Let's Start Planning", short welcome, a note for people who just want drop catering, phone, two emails (events vs drop orders), street address; right = one food photo. The inquiry form (a Tripleseat form, which is event-venue software) sits below. (contact-desktop-fold1, contact-phone-fold2) The form is the only form on the site.

---

## 3. Look and feel

### Typography (measured from the live CSS)
- **Headings: DM Serif Display** (a free Google font; a high-contrast serif). H1 about 48px on a 360px phone, normal weight (400), letter-spacing 0.8px, line-height about 1.1.
- **Body: "europa"** (a rounded geometric sans from Adobe Fonts), weight 300 (light), 16px, line-height 1.6. Nav and buttons are the same face in UPPERCASE with wide letter-spacing.
- Only two typefaces. Hierarchy comes from size and colour, not from adding fonts. Small bold serif ALL-CAPS for sub-headings ("WHY CHOOSE O&B CATERING?", "HOW IT WORKS").
- Everything is centred on the service and story pages, left-aligned only for lists and contact details.

### Colour (measured)
- Cream `#F9F9EB` (page background and header), rust `#A9502B` (headings, body text on cream, logo, buttons), deep green `#334E3D` (dark bands, primary button), white on the green. Also a red `#ED1C24` appears 6 times on contact (form error or accent).
- Just three colours plus white. Light sections and dark sections alternate, so the page has rhythm without any decoration.
- The cream-and-rust text is lower contrast than black on white. It reads warm and expensive but is a readability risk; do not copy it for small text.

### Image treatment
- Professional food photography only: top-down plates, hands in frame (tweezers placing a garnish, hands holding tomatoes), tight crops, props that add one colour. Mostly no people's faces. Tonal consistency: one stylist, one light.
- Photos are shown large and uncropped in grids with big gaps; no borders, no shadows, no rounded corners, no overlays on top of photos except the hero headline.
- Venue and event photos are wider room shots, brighter and less styled.

### Motion
- One hero video loop (muted, autoplay, loops), swapped for a lighter "mobile-optimized" file and a still poster image on phones, with a visible pause button on phone (good accessibility). Everything else is static. No scroll-jacking, no parallax, no animated counters.

### Spacing
- Very generous vertical space between sections (roughly 100px or more on desktop). Text columns are narrow, about 700 to 950px, centred. This is what makes it feel premium; it is mostly empty space doing the work.

### Buttons
- Two styles only: thin outlined rectangle (secondary, on every service block) and solid green rectangle (the one primary "Plan Your Event"). Square corners. Uppercase label.

### How mobile differs (and where it is weak)
- Hero video becomes a portrait crop, H1 stacks to four lines at about 48px. (home-phone-fold1)
- Split layouts stack: photo on top, text below. Zig-zag blocks become a single column.
- The header collapses to centred logo plus a small menu icon at the top left. In my capture the icon rendered as a tiny box with a question mark (`home-phone-fold1.png`). That may be an icon font failing in my headless browser, but if it is real it means the menu button is nearly invisible. Either way it is about 20px wide, far below a comfortable tap size.
- The open menu is a plain left-aligned list: About, Services, Venues, Order Online. No Inquire in the menu. Sub-items hide behind small arrow carets. (menu-open-phone.png)
- A sticky full-width rust "Inquire" bar sits at the bottom of every phone screen. Good idea, but it covers the text it sits on top of (see home-phone-fold2, full-service-phone-fold3, contact-phone-fold2) and its text is thin.
- Body copy stays at 16px in a light weight, centred. Long paragraphs centred on a phone are hard to read (our-story-phone-fold2 is a wall of centred text). Headings are very large relative to a 360px screen and wrap to 3 or 4 lines (full-service-phone-fold1).
- Page weight is heavy: the home page transferred about 6.2 MB on phone and made about 100 requests, mostly because of the video and images.

---

## 4. Borrow list for Foodbiz

Structure and story
1. **Nav of at most 5 items plus one Inquire button.** Foodbiz version: Services v (the list in `01-BRIEF.md` s5), Our work, Our story, and [Plan your event]. Label it "Services", never "Solutions" (banned in brand-voice.md). Remove everything else from the top bar. (Whether "Venues" fits Foodbiz is an open question for the founders: see section 6.)
2. **Home page = one block per service, zig-zag.** Hero, then one block per solution (photo, name, three sentences, one button). No sub-brand tiles, no stats strip, no "how it works" on the home page.
3. **One service-page template, reused.** Split hero, a dark "what is included" band, "how it works" in three beats, a big photo grid, closing Start Planning band. Build it once as a component (a reusable building block in the code) and fill it for each solution.
4. **A one-line promise before every paragraph.** "Your love story deserves a menu to match." Foodbiz has its own voice (`04-previous-version/context/VOICE.md`); write Foodbiz's promise lines in that voice, not O&B's.
5. **Closing "Start Planning" band on every page** with two buttons and a phone number. For Foodbiz, the second button can be "See our work" instead of "Explore Venues".
6. **Case stories as short, plain stories** (about 120 to 180 words) with: a title that names the event, one summary line, one wide photo, a photo credit line, a short body, then two buttons (back to the solution page, and Inquire). Aim for 5 per solution over time, as the client asked.
7. **"Our Story" as plain prose.** A handful of short paragraphs and named people with short bios. No timeline graphic. [Do not state a founding year, years in business, events delivered or team size: those facts are still unconfirmed by the founders.]
8. **A named-places proof section** (their "Get Inspired" cards). Titles that name the event and place are quietly credible. Only use client or venue names the founders have cleared (logo-use rights are still open).
9. **One serif plus one clean sans.** Two faces, one big step in size between them. Also valid for Foodbiz: a very small palette. Their new logo is black, white and orange, so the equivalent is white or off-white pages, black text, orange used only for the one primary button and small accents.
10. **Alternating light and dark bands** to create rhythm without decoration. Foodbiz version: white and black bands (with the orange accent), not cream and green.
11. **Big food photography in an unadorned grid.** No borders, no shadows, big gaps. This matches the client's wish for "a gorgeous food-photo section". It only works with strong photos; see Leave list and section 5.
12. **Hero video loop with a still poster fallback and a pause button.** Only after the client has footage they are happy with. Until then, one strong still image. [ASSUMPTION: no usable event video exists yet.]
13. **Uppercase, letter-spaced nav and button labels.** Cheap way to look refined.
14. **Sticky Inquire button on phone** (do it better, see section 5).
15. **Sub-brands as small mentions inside a solution page**, the way Gather and Queen's Cross sit inside Drop Catering. Matches the client decision: sub-brands later on micro-sites, at most a small logo on the matching solution page. No Pillar Live anywhere.

## 5. What to do better on phone (Amar's weak-mobile point)

1. **Left-align body text on phone.** Centred paragraphs of more than 3 lines are tiring to read. Keep centring only for 1 to 2 line headings.
2. **Shorter pages, shorter paragraphs on phone.** Cap each block at 2 to 3 short sentences. Hide the long version behind a "Read more" if needed.
3. **Smaller, lighter headings.** About 30 to 34px for H1 on a 360px phone so a title fits on 2 lines, not 4. Test that the serif still feels like luxury at that size. This is the direct answer to "not luxury, not refined" about our current mobile type: refinement comes from restraint in size and weight, plus open spacing, not from big or bold type.
4. **A clear menu button.** A visible "Menu" word or a clear icon that is at least 44px tall, and an Inquire button inside the open menu as well. Make the menu full-screen with large tap targets. Do not use an icon font that can fail to load; use an inline SVG icon.
5. **Sticky Inquire bar that does not cover the text.** Make it a slim bar (or a floating pill at one side), add bottom padding to every page equal to its height, and hide it while the user is at the hero and at the closing band (where an Inquire button already is).
6. **Higher contrast body text.** Near-black text on white or off-white. Keep the brand colour for headings and buttons only. Minimum 16px body, and weight 400 not 300 on small screens.
7. **Light first screen.** Use a poster image on phone, not an autoplaying video, until it is tuned; their phone home page was about 6 MB. Target a first screen that loads fast on mobile data. Compress photos, since the client's photos are phone-shot and will be large files.
8. **One-thumb layout for each solution page:** photo, H1 on 2 lines, one promise line, then the Inquire button before any long text (their phone pages bury the call to action under paragraphs).
9. **Photo grids go to one column, full width, swipeable gallery** for the food section, rather than a long stack.
10. **Test on a real 360px Android and a small iPhone**, not just on a desktop window.

## 6. Leave list for Foodbiz

1. **Do not copy their colours.** Cream, rust and forest green are O&B's identity. Foodbiz's new logo is black, white and orange. Copying the green would also fight the logo.
2. **Do not copy DM Serif Display or europa outright.** Pick Foodbiz's own pair that matches "opulence, luxury, lifestyle; simple, contemporary, stylish". One option to test, not a decision: a refined high-contrast serif for headings plus a clean sans. Test on a phone first.
3. **Do not copy their mobile layout or type sizes** (section 3, "How mobile differs").
4. **Do not copy centred paragraphs, light 300-weight body, or cream-on-rust text.**
5. **Do not copy "Order Online" and the drop-catering e-commerce flow.** Foodbiz does not sell that way. Do not add anything in the nav that is not a real offer.
6. **Do not copy the "partner venues" mechanic as is.** O&B has a venue network and sells venues. Foodbiz may or may not. Ask the founders whether they want a Venues page (venues they commonly cater at, with the name, the type and the capacity). If they do not have clean, cleared photos and facts for 20 venues, do not build a 20-card page. A short list of 4 to 6 real venues, or leave it out.
7. **Do not copy their "decades of experience" language** unless the founders confirm a number. Mark any such line "- K".
8. **Do not copy their copywriting.** It is generic ("unforgettable", "seamless", "elevated"). Use `04-previous-version/context/VOICE.md` instead. Avoid the words they rejected. Also avoid the house banned words (leverage, robust, exciting opportunities, disrupt).
9. **Do not copy their photography standard with our photos.** O&B uses a professional food stylist and photographer. Foodbiz's photos are phone-shot at real events, so a grid of big, uncropped images will expose weak ones. For launch: choose only the strongest cleared frames, crop and colour-grade them consistently, mix in AI-generated food imagery (allowed for launch, to be replaced after a pro shoot) and label internally which images are AI. Use only frames in `05-assets/images/`.
10. **Do not copy the tiny team-bios page** until the founders say who is shown and in what words.
11. **Do not copy their "Tripleseat" form.** Keep our own inquiry form (it exists in the current site; its sending domain still needs to be verified for launch).
12. **Do not copy the footer's three cross-links and newsletter** unless Foodbiz will actually send a newsletter. Skip it for launch.
13. **Do not carry any sub-brand navigation** (Moira, Caterpillar, Gummy Gourmet, Travelling Circus) into the main nav. Pillar Live is dropped by the client: remove all traces.
14. **Do not rely on the hero video** (the napkin shot works because it is beautifully shot). Without equivalent footage it will cheapen the page.

## 7. Questions to bring back to Purusharth (not answered by the reference)

- Does Foodbiz want a Venues page, and which venues can we name? (Affects the nav.)
- Settled: four services, see `01-BRIEF.md` s5.
- Is there any usable event video for a hero loop, or do we start with a still?
- Which event stories can be named publicly (client and photo release)? The client's photo library has 37 held frames; those cannot be used.

## 8. One-paragraph summary

O&B's site works because it is small and plain: five nav items, four solutions each told the same way (photo, promise line, short paragraph, one button), proof through named event stories, and one inquiry call to action repeated everywhere. The luxury comes from restraint: two typefaces, three colours, large photographs, lots of empty space. Foodbiz should copy that spine and discipline, with its own black, white and orange palette and its own voice, and make the phone version better: smaller type, left-aligned text, a clearly visible menu button, a sticky Inquire that does not cover content, and a light first screen.
