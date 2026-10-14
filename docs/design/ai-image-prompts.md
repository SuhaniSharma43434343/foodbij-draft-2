# AI image plan and prompts (W5.2, 2026-10-14)

Status: **no AI images exist yet.** This session cannot generate images and the image lanes have no
keys. The owner is deciding how images will be made. This file lists every gap slot, where it goes,
the size to export, and a ready-to-use prompt. Sources: `docs/brief/06-GUIDE.md` step 5,
`docs/design/taste-spec.md` (Photography), `docs/design/photo-picks.md` (Gaps),
`docs/brief/07-OPEN-ITEMS.md` (C2, C7, C8), `docs/brief/INVENTORY.md`.

## Rules for using them on the site

1. **Mood, food and heroes only.** Never inside a named event story: nothing AI goes on `/our-work`
   or `/our-work/<slug>`, and no AI image is ever captioned or alt-texted as a real event, client,
   venue or date.
2. **Labelled internally as AI.** File names start with `ai-` (for example
   `public/images/ai/ai-celeb-01-table.webp`), and the `note` field of the image in `src/content/*.ts`
   says `AI-generated (prompt id ...)`. Alt text describes what is shown, plainly, like any photo.
3. **Recorded in NOTES.md** with file name and full prompt (and in the table at the end of this file)
   before the image is merged.
4. **Content rules, every image:** Indian food and Indian service; no faces (hands and forearms at
   most, no recognisable person); no chef hats or toques; no crossed cutlery; no text, lettering,
   menus with readable words, signage or logos (real or invented); not a specific real event.
5. **One grade with the real photos:** slightly warm, lifted blacks, light grain, tight crops on food
   and hands, magazine still-life composition, square corners. Palette that sits with navy
   `#0B1C2D` and copper `#B87333`: deep blue-black shadows, warm brass and copper metal, white
   linen, natural food colour. No neon, no teal-orange blockbuster grade, no beige "shaadi" haze.
6. **Check by eye before use:** reject any frame with warped hands, extra fingers, melted cutlery,
   gibberish text, a logo-like shape, a face, or food that is not plausibly Indian.
7. **Export:** WebP (AVIF optional), sRGB, the long edge given per slot, width and height set in
   code, lazy-loaded below the first screen. Keep the master (PNG or highest quality) outside
   `public/`.
8. **Video loops:** 6-10 s, silent, clean loop, H.264 MP4 (plus WebM optional), under about
   2 MB on phone, autoplay muted with a pause button, a poster still, and still-only under
   `prefers-reduced-motion`.

### Shared prompt blocks

**Style tail (append to every prompt):**
> Editorial magazine still life, shot on a full-frame camera with a 50-90mm lens, shallow depth of
> field, soft directional window or lamp light, slightly warm grade, lifted blacks, fine film grain,
> deep navy-black shadows, warm brass and copper tones, white linen. Indian food and Indian service.
> No faces, hands only. No chef hats or toques. No text, no lettering, no logos, no signage. Not a
> specific real event. Photorealistic.

**Negative prompt (use for every image and video):**
> faces, people's heads, eyes, portraits, recognisable person, chef hat, toque, crossed cutlery,
> text, letters, words, numbers, writing, menu text, signage, logo, watermark, brand mark, label,
> caption, Western steakhouse food, burgers, wine-and-cheese stock look, cartoon, illustration, 3D
> render look, plastic food, oversaturated, neon, teal and orange grade, HDR, heavy vignette, beige
> haze, wedding cliches, rose petals heart, extra fingers, deformed hands, melted cutlery, blurry,
> low resolution

## Size targets used below

| Kind | Aspect | Long edge | Notes |
|---|---|---|---|
| Hero / opening | 3:2 desktop, 4:5 phone crop from the same master (keep subject in the centre 60%) | 2400px | WebP q80, about 250-400 KB |
| Service card / section image | 4:5 | 1600px | WebP q80 |
| Gallery tile | 1:1 or 4:5 | 1400px | WebP q78 |
| Video loop | 16:9 desktop, 9:16 or 4:5 phone version | 1920px desktop / 1080px phone | 6-10 s, under 2 MB phone |

## Slots and prompts

### Home opening

**OPEN-V1 - plating loop (video).** Route `/`, opening section. Would replace the still
`cartier-07` (owner's choice; the still stays as the fallback until then). 16:9 at 1920px for
desktop, 4:5 or 9:16 at 1080px for phone; 6-10 s, silent, loops cleanly.
> Slow, close overhead-to-three-quarter shot of two hands finishing an Indian dish: a steel and brass
> thali on a dark wooden table, small katoris of dal, sabzi and raita, the hands placing a folded
> phulka and a spoon of ghee, then a pinch of coriander, steam rising. Gentle push-in, no cuts,
> loops back to the first frame. + style tail.

**OPEN-P1 - poster still for OPEN-V1.** Same slot; also the reduced-motion still. 3:2 at 2400px with
a 4:5 phone crop. Generate as the first frame of the loop or as a matching still.
> Close three-quarter still of hands in a dark service jacket sleeve finishing a brass thali on a
> dark wooden table: katoris of dal, paneer and raita, a folded phulka, a spoon of ghee mid-pour, a
> wisp of steam. Space at the bottom for a headline. + style tail.

**OPEN-P2 - alternative poster (chaat).** Same slot, if the owner prefers a lighter opening.
> Hands finishing a plated papdi chaat on a white plate: a drizzle of tamarind and green chutney,
> sev and pomegranate falling from the fingertips, dark slate ground, low warm side light. + style
> tail.

### Celebrations & private dining - sit-down dinners at home (zero real photos, C2)

Route `/services/celebrations`, "What we do" format "Sit-down dinners at home" (today words only;
no real photo stands in for it). Not on any story page.

**CELEB-01 - set table.** 3:2 at 2400px with a 4:5 crop; section image beside the format text.
> A dinner table set for a sit-down dinner at home in a Mumbai apartment at dusk: white linen, brass
> thalis used as chargers, copper water tumblers, small brass diyas and a low arrangement of
> marigold and white tuberose, folded cotton napkins, no people. Window light fading to lamp light.
> + style tail.

**CELEB-02 - plated course.** 4:5 at 1600px.
> A single plated course for a seated dinner: a small portion of Goan prawn curry with red rice
> shaped neatly on a white plate, a curry leaf and a line of coconut cream, a brass spoon beside
> it, dark table, tight crop. + style tail.

**CELEB-03 - hands serving.** 4:5 at 1600px.
> A server's hands, sleeves of a dark navy jacket, setting a plate of tandoori paneer tikka with mint
> chutney in front of a guest's place at a linen-covered home dining table; only hands and the table
> are visible, a glass of nimbu pani at the edge, warm lamp light. + style tail.

### Corporate & office dining - daily office dining (zero real photos)

Route `/services/corporate-dining`, "What we do" format "Daily office dining". Today the page uses
corporate function photos only. Not on any story page.

**CORP-01 - office pantry counter at lunch.** 3:2 at 2400px with a 4:5 crop.
> A clean, modern office pantry counter at lunchtime: steel chafing dishes with dal, jeera rice,
> mixed vegetable sabzi and chapatis in a covered basket, neat stacks of plates, daylight from a
> large window with a soft blurred city behind, no people, no screens, no signage. Calm, minimal,
> functional. + style tail.

**CORP-02 - tiffin-style plated lunch.** 4:5 at 1600px.
> Overhead view of a tiffin-style office lunch on a light wooden desk: a steel compartment plate with
> rajma, rice, a dry sabzi, salad and two rotis, a small bowl of curd, a cloth napkin, a laptop edge
> out of focus at the corner with a blank screen, daylight. + style tail.

**CORP-03 - self-service line.** 3:2 at 2400px.
> Close side view along a self-service lunch line in an office cafeteria: hands holding a steel plate
> and serving a ladle of chole from a polished steel bain-marie, a row of dishes receding, small
> blank cards in front of each dish, bright clean daylight, no faces. + style tail.

### Food gallery close-ups (C7)

Route `/` (food gallery band) and the service-page galleries. Tiles only, mixed with the real picks
(`bangalore-wedding-01`, `raymond-chairmans-lounge-03`, `aurangabad-wedding-04`, `cartier-07`,
`cartier-09`). Never on `/our-work`. 1:1 or 4:5 at 1400px.

**FOOD-01 - live dosa counter.**
> Close crop of a live dosa counter: a hand spreading batter in a spiral on a black cast-iron tawa,
> a finished golden masala dosa folded beside it, small steel bowls of coconut chutney and sambar.
> + style tail.

**FOOD-02 - chaat being finished.**
> Hands finishing dahi puri on a brass plate: curd spooned into crisp puris, then sev, chopped
> coriander and pomegranate, tamarind chutney glistening, dark ground. + style tail.

**FOOD-03 - mithai on copper.**
> Kaju katli, pista barfi with silver vark and saffron pedas arranged in neat rows on a hammered
> copper tray, a few strands of saffron and rose petals, low side light on navy cloth. + style tail.

**FOOD-04 - biryani handi opened.**
> A clay handi of dum biryani just opened, the dough seal broken and lifted, steam rising, saffron
> rice, fried onions and mint on top, a brass serving spoon held by a hand. + style tail.

**FOOD-05 - coastal fish plated.**
> A plated Malvani surmai fry on a banana leaf on a white plate, kokum curry in a small brass bowl,
> a lime wedge, sol kadhi in a glass, tight crop, warm light. + style tail.

**FOOD-06 - bhakri and dal.**
> Jowar bhakri on a dark iron plate with a bowl of varan dal topped with ghee, thecha in a small
> stone dish, a hand breaking the bhakri, rustic but clean, warm light. + style tail.

### Weddings mood (optional, only if a section needs it)

Route `/services/weddings`, a mood image beside "What we do" or the closing band. Never on a wedding
story page. 4:5 at 1600px.

**WED-01 - sangeet counter at night.**
> A live chaat and kebab counter at an outdoor evening wedding function, brass vessels and copper
> handis lit by warm festoon lights, marigold strings hanging, hands of a server plating seekh kebab
> with onion rings, no faces, no signage. + style tail.

**WED-02 - brass and marigold detail.**
> Close still life of brass serving ware on a table at a wedding: a brass lota, small katoris of
> mithai and a garland of orange and yellow marigolds, white linen, night lamp light. + style tail.

## Register (fill in when images exist; copy each row into NOTES.md)

| File (`public/images/ai/...`) | Slot (route + section) | Prompt id | Tool and model | Date | Checked by eye (who) |
|---|---|---|---|---|---|
| | | | | | |
