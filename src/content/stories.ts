// CEO review 2026-10-14: removed bayview-lawns-wedding-04 and merc-eqg-launch-02 (masked cooks date the photos),
// ninja-03 (an old sub-brand counter card in frame) and sbi-04 (menus with the retired logo).
// Event stories for "Our work" (/our-work and /our-work/<slug>), W4.2.
// Rules (01-BRIEF.md sections 6 and 9): every brief is a [NEEDS CLIENT] placeholder until the client
// sends it; "what we made" describes only what the photographs show, or quotes the menus in
// docs/brief/CONTENT-EXPORT.md section 7. Summaries are the KEEP-ADAPT teasers from section 4.
// No guest counts, dates, venues, quotes or dishes beyond those sources.
//
// Titles stay generic. Event and client names come only from the photo folders and are NOT shown
// on the page until the client confirms name rights (07-OPEN-ITEMS.md C4); each entry is marked
// "NEEDS CLIENT: name rights" below. Frames dominated by a client logo are left out.
//
// [NEEDS CLIENT] items in this file (collect into NOTES.md):
//   - the brief for each of the 13 events below (07-OPEN-ITEMS.md C3)
//   - name rights for each event (folder names: bangalore-wedding, bayview-lawns-wedding,
//     aurangabad-wedding, ninja, playseum-set-ups, glasshouse-dessert-table, rolling-loud,
//     crunchyroll, cartier, merc-eqg-launch, casio, bloomberg-bsmr, sbi)
//   - confirm the menus quoted from the event photographs (Bayview Lawns counters, the birthday
//     counter cards, the ramen counter, the relay menu board)

import type { ServiceSlug } from "./site";

/** Art direction: `zoom` > 1 enlarges the photo inside its frame; `position` is the CSS
 *  object-position of the enlarged photo ("50% 100%" keeps the bottom, cutting the top). */
export type StoryCrop = { zoom?: number; position?: string };

export type StoryImage = {
  /** Path under public/, starting with /images/ */
  src: string;
  alt: string;
  crop?: StoryCrop;
  /** Crop for the wide (3:2) story hero from 768px, when it differs from `crop`. */
  wideCrop?: StoryCrop;
};

export type EventStoryFull = {
  slug: string;
  service: ServiceSlug;
  title: string;
  /** One line under the card title (and the page description): the KEEP-ADAPT teaser where one exists. */
  summary: string;
  /** Two or three sentences from the client; a [NEEDS CLIENT] placeholder until then. */
  brief: string;
  /** Two or three short sentences: only what the photos show, or the section-7 menus. */
  whatWeMade: string;
  /** One line, where a live counter is visible in the photos. */
  liveStation?: string;
  /** The first image is the card photo and the story's hero. */
  images: StoryImage[];
};

const W = "/images/1-weddings";
const C = "/images/2-celebrations-private-dining";
const B = "/images/3-brand-launches-live-events";
const O = "/images/4-corporate-office-dining";

/** Chef at the live counter: keep hands, plate and garnish; the tall hat goes out of frame. */
const CHEF_CROP: StoryCrop = { zoom: 2, position: "50% 100%" };

export const stories: EventStoryFull[] = [
  // ---------------------------------------------------------------- Weddings
  {
    // NEEDS CLIENT: name rights (city taken from the photo folder "bangalore-wedding")
    slug: "wedding-in-bengaluru",
    service: "weddings",
    title: "A wedding in Bengaluru",
    summary:
      "A gold buffet built up in tiers, a chef finishing plates by hand, and dessert that arrived looking like it was grown.",
    brief: "[NEEDS CLIENT: the brief for the Bengaluru wedding]",
    whatWeMade:
      "A tiered gold buffet, lit by a row of brass lamps. Domed yellow desserts set into a bed of dried beans on the service trays.",
    liveStation: "A live counter where a chef finished each plate by hand.",
    images: [
      { src: `${W}/bangalore-wedding/bangalore-wedding-04.jpg`, alt: "A tiered gold buffet structure lit by a row of brass lamps." },
      { src: `${W}/bangalore-wedding/bangalore-wedding-01.jpg`, alt: "Domed yellow desserts set into a bed of dried beans on a service tray." },
      {
        src: `${W}/bangalore-wedding/bangalore-wedding-03.jpg`,
        alt: "A chef finishing a plate with tweezers at a live counter.",
        crop: CHEF_CROP,
      },
    ],
  },
  {
    // NEEDS CLIENT: name rights (venue taken from the photo folder "bayview-lawns-wedding")
    slug: "outdoor-wedding",
    service: "weddings",
    title: "An outdoor wedding",
    summary:
      "Chai and ice cream outdoors, earthen pots along a wooden counter, and a live wok counter cooking to order.",
    brief: "[NEEDS CLIENT: the brief for the Bayview Lawns wedding]",
    whatWeMade:
      "A chai and ice-cream station in white and pale wood, framed by foliage. Earthen pots and copper vessels along a wooden counter, each with a printed card.",
    // Counter names from the Foodbiz signage in the photographs (CONTENT-EXPORT.md section 7).
    liveStation: "Thai Chatuchak ice cream, The Mangolian live wok, and chai, each at its own counter.",
    images: [
      {
        src: `${W}/bayview-lawns-wedding/bayview-lawns-wedding-01.jpg`,
        alt: "An outdoor chai and ice-cream station in white and pale wood, framed by foliage.",
      },
      {
        src: `${W}/bayview-lawns-wedding/bayview-lawns-wedding-02.jpg`,
        alt: "Earthen pots and copper vessels arranged along a wooden counter with printed cards.",
      },
    ],
  },
  {
    // NEEDS CLIENT: name rights (city taken from the photo folder "aurangabad-wedding")
    slug: "wedding-in-aurangabad",
    service: "weddings",
    title: "A wedding in Aurangabad",
    summary: "Brass thalis, and a printed menu at every setting.",
    brief: "[NEEDS CLIENT: the brief for the Aurangabad wedding]",
    whatWeMade:
      "Brass thalis on a red cloth, with a printed menu scroll beside each one. A long buffet counter dressed in green and orange, set with brass service ware against carved wooden screens.",
    images: [
      {
        src: `${W}/aurangabad-wedding/aurangabad-wedding-04.jpg`,
        alt: "Brass thalis laid out on a red cloth with printed menu scrolls beside each setting.",
      },
      {
        src: `${W}/aurangabad-wedding/aurangabad-wedding-01.jpg`,
        alt: "A long buffet counter dressed in green and orange, set with brass service ware against carved wooden screens.",
      },
    ],
  },

  // ---------------------------------------------------------------- Celebrations & private dining
  {
    // NEEDS CLIENT: name rights (photo folder "ninja"; the party theme is not named on the page)
    slug: "garden-birthday",
    service: "celebrations",
    title: "A children's birthday in the garden",
    summary: "Pizzas with faces on them, sliders sized for small hands, and a sushi board.",
    brief: "[NEEDS CLIENT: the brief for the garden birthday party]",
    // Dish names from the Foodbiz counter cards in the photographs (CONTENT-EXPORT.md section 7).
    whatWeMade:
      "Ninja margherita pizzas with olive and mozzarella faces, on a wooden board. A garden drinks station with jars of infused water and fresh oranges, and a grazing spread beside the play area.",
    liveStation: "A sushi board station, with a chef behind it under a warm lamp.",
    images: [
      { src: `${C}/ninja/ninja-04.jpg`, alt: "A garden drinks station with jars of infused water and fresh oranges." },
      { src: `${C}/ninja/ninja-02.jpg`, alt: "An outdoor grazing spread laid out beside a garden play area." },
      { src: `${C}/ninja/ninja-01.jpg`, alt: "A chef standing behind a sushi board station under a warm lamp." },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "playseum-set-ups")
    slug: "childrens-counters",
    service: "celebrations",
    title: "Counters for a children's party",
    summary: "A counter small people want to walk up to, with food they finish.",
    brief: "[NEEDS CLIENT: the brief for the Playseum children's counters]",
    whatWeMade:
      "Two counters, two looks: a pastel one dressed with paper fans and painted signs, and a farm-themed one in gingham under warm lamps. Servers in green aprons brought the food out on wooden crates.",
    images: [
      {
        src: `${C}/playseum-set-ups/playseum-set-ups-03.jpg`,
        alt: "A pastel children's counter dressed with paper fans and painted signage.",
      },
      {
        // A television above the counter shows a broadcast with sponsor logos: zoomed from the bottom.
        src: `${C}/playseum-set-ups/playseum-set-ups-02.jpg`,
        alt: "A farm-themed children's food counter with gingham and warm lamps.",
        crop: { zoom: 1.3, position: "50% 100%" },
      },
      {
        src: `${C}/playseum-set-ups/playseum-set-ups-01.jpg`,
        alt: "A server holding a crate at a jungle-themed children's counter.",
      },
    ],
  },
  {
    // NEEDS CLIENT: name rights and the occasion (photo folder "glasshouse-dessert-table")
    slug: "glasshouse-dessert-table",
    service: "celebrations",
    title: "A dessert table in a glasshouse",
    summary: "Brownies, cookies and macarons on wooden boards, with the garden behind the glass.",
    brief: "[NEEDS CLIENT: the brief for the glasshouse dessert table]",
    whatWeMade:
      "Brownies, cookies, cupcakes under glass domes and macarons, on wooden boards dressed with purple statice and red blossom. Plates and cutlery stacked at one end of the table.",
    images: [
      {
        src: `${C}/glasshouse-dessert-table/glasshouse-dessert-table-01.jpg`,
        alt: "A dessert table in a glasshouse: brownies, cookies, cupcakes under glass domes and macarons, dressed with purple statice and red blossom.",
      },
      {
        src: `${C}/glasshouse-dessert-table/glasshouse-dessert-table-02.jpg`,
        alt: "Wooden dessert boards and stacked plates on a black and white floor.",
      },
    ],
  },

  // ---------------------------------------------------------------- Brand launches & live events
  {
    // NEEDS CLIENT: name rights (photo folder "rolling-loud")
    slug: "music-festival",
    service: "brand-launches",
    title: "A music festival",
    summary: "Service that had to run to the set times, not the other way round.",
    brief: "[NEEDS CLIENT: the brief for the Rolling Loud festival]",
    whatWeMade:
      "A long buffet counter against a black backdrop, lit by brass lamps. Chafing dishes in service down the line, lids up.",
    images: [
      { src: `${B}/rolling-loud/rolling-loud-02.jpg`, alt: "A long buffet counter lit by lamps against a black backdrop." },
      { src: `${B}/rolling-loud/rolling-loud-01.jpg`, alt: "Chafing dishes in service at a festival catering station." },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "crunchyroll"). Only one cleared frame exists.
    slug: "anime-launch-party",
    service: "brand-launches",
    title: "An anime launch party",
    summary: "A ramen counter cooking to order, with a queue in front of it all night.",
    brief: "[NEEDS CLIENT: the brief for the Crunchyroll launch party]",
    whatWeMade:
      "A ramen counter built as a wooden stall and hung with red paper lanterns, with the kitchen team cooking behind it.",
    // Counter name from the event signage in the photographs (CONTENT-EXPORT.md section 7).
    liveStation: "Ramen, cooked to order through the evening.",
    // Counter name from the event signage in the photographs (CONTENT-EXPORT.md section 7).
    images: [
      {
        // The client's banner sits above the counter: zoomed from the bottom until it leaves the frame.
        src: `${B}/crunchyroll/crunchyroll-02.jpg`,
        alt: "A ramen counter with the kitchen team working behind it.",
        crop: { zoom: 1.45, position: "30% 100%" },
        wideCrop: { position: "50% 72%" },
      },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "cartier"; cartier-02 shows the boutique sign and is left out)
    slug: "boutique-evening",
    service: "brand-launches",
    title: "An evening at a jewellery boutique",
    summary: "Canapés off slate, drinks built to order, and a floor team that kept moving all evening.",
    brief: "[NEEDS CLIENT: the brief for the Cartier boutique event]",
    whatWeMade:
      "Tartlets and small bites on slate trays, finished with fresh flowers and carried through the room by gloved servers. Cocktails built at the bar, coupes and shakers on the pass.",
    liveStation: "A garden bar, finishing each cocktail to order.",
    images: [
      { src: `${B}/cartier/cartier-07.jpg`, alt: "Tartlets dressed with edible flowers on a slate board." },
      { src: `${B}/cartier/cartier-03.jpg`, alt: "Cocktails being built at a bar, coupes and shakers on the pass." },
      { src: `${B}/cartier/cartier-09.jpg`, alt: "A slate tray of canapés finished with fresh flowers." },
      { src: `${B}/cartier/cartier-05.jpg`, alt: "A bartender finishing a drink at a garden bar station." },
      { src: `${B}/cartier/cartier-08.jpg`, alt: "A gloved server presenting a slate of canapés." },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "merc-eqg-launch")
    slug: "car-launch-at-night",
    service: "brand-launches",
    title: "A car launch at night",
    summary: "A reveal lit in blue and violet. We built the food to read at night, under coloured light, in photographs.",
    brief: "[NEEDS CLIENT: the brief for the Mercedes-Benz EQG launch]",
    whatWeMade:
      "A dessert display under blue light, with warm table lamps, and a charcuterie and grazing spread lit in violet. Two chefs finished a large tray of rolls at the counter.",
    liveStation: "Two chefs rolling and plating at the counter.",
    images: [
      { src: `${B}/merc-eqg-launch/merc-eqg-launch-01.jpg`, alt: "A dessert display under blue light with a single warm lamp." },
      { src: `${B}/merc-eqg-launch/merc-eqg-launch-03.jpg`, alt: "A charcuterie and grazing spread lit in violet." },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "casio"; casio-01 is a product wall and is left out)
    slug: "retail-evening",
    service: "brand-launches",
    title: "A retail evening by the garden",
    summary: "Warm lamps, garden air, and a counter built to be read slowly.",
    brief: "[NEEDS CLIENT: the brief for the Casio retail event]",
    whatWeMade:
      "An evening buffet under table lamps, set against the garden. Mantel clocks and globes stood among the platters, with candles down the length of the table.",
    images: [
      { src: `${B}/casio/casio-02.jpg`, alt: "An evening buffet under table lamps, set against garden foliage." },
      {
        // A small brand sign shows at the right edge: framed from the left.
        src: `${B}/casio/casio-03.jpg`,
        alt: "A buffet counter dressed with a mantel clock and warm lamps.",
        crop: { position: "20% 50%" },
      },
    ],
  },

  // ---------------------------------------------------------------- Corporate & office dining
  {
    // NEEDS CLIENT: name rights (photo folder "bloomberg-bsmr"; bsmr-02 and -03 carry client signage and are left out)
    slug: "office-relay",
    service: "corporate-dining",
    title: "A relay race between office towers",
    summary: "An outdoor corporate relay between office towers. Feed the runners, then feed everyone else.",
    brief: "[NEEDS CLIENT: the brief for the Bloomberg Square Mile Relay]",
    // Transcribed from the event's own menu board (CONTENT-EXPORT.md section 7).
    whatWeMade:
      "The menu board read: Tibetan thukpa with momos, a Corfu salad, cottage cheese and bamboo shoots with stir-fried rice or tempura chicken, then a banana milk chocolate slice or a quinoa chocolate brownie. Trestle tables and shade tents on the lawn between the buildings.",
    images: [
      {
        src: `${O}/bloomberg-bsmr/bloomberg-bsmr-04.jpg`,
        alt: "A printed menu board listing the hot pot, salad and main meal for the day.",
        crop: { position: "50% 70%" },
      },
      {
        src: `${O}/bloomberg-bsmr/bloomberg-bsmr-05.jpg`,
        alt: "Trestle tables and shade tents laid out on a lawn between office buildings.",
      },
    ],
  },
  {
    // NEEDS CLIENT: name rights (photo folder "sbi"; sbi-01 is the client's stage set and is left out)
    slug: "bank-day-lunch",
    service: "corporate-dining",
    title: "A bank's anniversary lunch",
    summary: "A long line of chafing dishes, lamps down the length of it, and a fixed lunch window.",
    brief: "[NEEDS CLIENT: the brief for the SBI Bank Day]",
    whatWeMade:
      "A long line of polished chafing dishes under brass table lamps, draped in gold. Round tables laid with linen and flowers, and a printed menu at every cover.",
    images: [
      { src: `${O}/sbi/sbi-02.jpg`, alt: "A long banquet line of polished chafing dishes under brass table lamps." },
      { src: `${O}/sbi/sbi-03.jpg`, alt: "Round banquet tables laid with linen beside a draped buffet." },
    ],
  },
];

export function getStory(slug: string): EventStoryFull | undefined {
  return stories.find((s) => s.slug === slug);
}

/** Heading, filter and closing copy for /our-work (closer adapted from CONTENT-EXPORT.md section 4). */
export const work = {
  heading: "Every event starts with a brief.",
  filterLabel: "Show stories for",
  allLabel: "All",
  empty: "No stories for this service yet.",
  plan: {
    heading: "Brief us on something similar.",
    lead: "A date, a rough guest count and the kind of event is enough to start.",
    cta: "Plan your event",
  },
  story: {
    briefLabel: "The brief",
    madeLabel: "What we made",
    liveLabel: "At the live counter",
    photosLabel: "Photographs",
  },
};
