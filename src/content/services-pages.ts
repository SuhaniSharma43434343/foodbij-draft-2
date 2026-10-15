// Site copy for the other three service pages (W4.1): Celebrations & private dining, Brand
// launches & live events, Corporate & office dining. Same structure as `weddings` in ./site.ts.
// Sources: docs/brief/01-BRIEF.md (sections 5-6), docs/brief/02-MEETING-NOTES.md (mood per area),
// docs/brief/CONTENT-EXPORT.md (KEEP-ADAPT blocks in sections 3.2-3.4 and teaser lines in section 4,
// the relay menu board in section 7), docs/brief/IMAGE-INDEX.csv for photo descriptions.
//
// [NEEDS CLIENT] items used in this file (collect into NOTES.md):
//   1. [NEEDS CLIENT: the brief for the birthday in Mumbai]       - celebrations.stories[0]
//   2. [NEEDS CLIENT: the brief for the play-space counters]      - celebrations.stories[1]
//   3. [NEEDS CLIENT: the brief for the boutique evening]         - brandLaunches.stories[0]
//   4. [NEEDS CLIENT: the brief for the car launch]               - brandLaunches.stories[1]
//   5. [NEEDS CLIENT: the brief for the corporate relay]          - corporateDining.stories[0]
//   6. [NEEDS CLIENT: the brief for the bank day lunch]           - corporateDining.stories[1]
// Also flagged in code comments below (not visible on the page):
//   - name rights for every event taken from a photo folder (titles stay generic, no client named)
//   - sit-down dinner photos: none exist (AI imagery planned); the format is described in words only
//   - daily office dining photos: none exist (AI imagery planned); the corporate photos are functions
//   - large-event capability lines (brandLaunches "Concerts and festivals"): confirm with the client
//   - the relay menu board photo carries the event's own small mark in its top-left corner

import { services, type ServicePage } from "./site";

const IMG = "/images";
const CELEB = `${IMG}/2-celebrations-private-dining`;
const BRAND = `${IMG}/3-brand-launches-live-events`;
const CORP = `${IMG}/4-corporate-office-dining`;

// ---------------------------------------------------------------------------
// Celebrations & private dining (playful but refined; dinners at home a little mad)
// ---------------------------------------------------------------------------

export const celebrations: ServicePage = {
  hero: {
    headline: "Celebrations & private dining",
    cta: "Tell us about your party",
    line: "Birthdays, family functions and dinners at home. We cook, serve and clear, so you stay with your guests.",
    image: services[1].heroImage,
  },
  whatWeDo: {
    heading: "Every party has a different crowd.",
    formats: [
      {
        title: "Birthdays and children’s parties",
        text: "Mini pizzas with faces on them, sliders sized for small hands, and a counter children want to walk up to.",
      },
      {
        title: "Family and social functions",
        text: "The dishes your family expects go on the menu first, and the rest is built around them.",
      },
      {
        // NEEDS CLIENT: sit-down dinner photos (AI imagery planned). No real photo shows this format,
        // so it is described in words only and no event photo on this page stands in for it.
        title: "Sit-down dinners at home",
        text: "The menu is allowed a little madness; the service stays calm, and the kitchen is left as we found it.",
      },
      {
        title: "Dessert tables",
        text: "Brownies, cookies and macarons, cupcakes under glass domes, dressed with flowers.",
      },
    ],
  },
  howItWorks: {
    heading: "How a party comes together.",
    steps: [
      {
        title: "Tell us the occasion",
        text: "Whose party it is, who’s coming and where. For a child’s party, tell us the age: it changes everything.",
      },
      {
        title: "Tell us the allergies",
        text: "We label everything and keep it separate. Parents shouldn’t have to ask.",
      },
      {
        title: "We write the menu",
        text: "Around your guests and the dishes that have to be there. If there’s a theme, we cook to it without turning everything into sugar.",
      },
      {
        title: "We set up and clear",
        text: "You get the party. We take the mess.",
      },
    ],
  },
  stories: {
    heading: "Parties we’ve catered.",
    linkLabel: "See the work",
    items: [
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "ninja"; the title stays
        // generic and never names a theme)
        folder: "ninja",
        title: "A birthday in Mumbai",
        brief: "[NEEDS CLIENT: the brief for the birthday in Mumbai]",
        whatWeMade:
          "Pizzas with faces on them, a sushi board station under warm lamps, and a garden drinks counter stacked with oranges.",
        image: {
          src: `${CELEB}/ninja/ninja-01.jpg`,
          alt: "A server standing behind a sushi board station under warm lamps.",
        },
      },
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "playseum-set-ups"; the title
        // avoids the venue until the client confirms it can be named)
        folder: "playseum-set-ups",
        title: "Children’s counters at a play space",
        brief: "[NEEDS CLIENT: the brief for the play-space counters]",
        whatWeMade:
          "A counter small people want to walk up to, dressed with paper fans, bunting and painted animals, and food they finish.",
        image: {
          src: `${CELEB}/playseum-set-ups/playseum-set-ups-03.jpg`,
          alt: "A pastel children’s counter dressed with paper fans and painted signage.",
        },
      },
    ],
  },
  gallery: {
    heading: "Food children finish, and tables the adults linger at.",
    images: [
      {
        src: `${CELEB}/glasshouse-dessert-table/glasshouse-dessert-table-02.jpg`,
        alt: "Wooden dessert boards and stacked plates on a black and white floor.",
      },
      {
        src: `${CELEB}/ninja/ninja-03.jpg`,
        alt: "Small pizzas decorated with olive and mozzarella faces on a wooden board.",
        note: "Crop to the pizzas at the bottom of the frame; keep the printed card out.",
      },
      {
        src: `${CELEB}/ninja/ninja-04.jpg`,
        alt: "A garden drinks station with jars of infused water and fresh oranges.",
      },
      {
        src: `${CELEB}/playseum-set-ups/playseum-set-ups-02.jpg`,
        alt: "A farm-themed children’s food counter with gingham and warm lamps.",
        note: "Crop the television at the top of the frame out.",
      },
      {
        src: `${CELEB}/carnival/carnival-01.jpg`,
        alt: "An outdoor children’s setup with bunting and striped food counters.",
      },
    ],
  },
  otherServices: {
    label: "Other things we do",
  },
  plan: {
    heading: "Tell us about your party.",
    lead: "Whose party it is and roughly how many are coming is enough to start.",
    cta: "Plan your event",
    presetService: "celebrations",
  },
};

// ---------------------------------------------------------------------------
// Brand launches & live events (contemporary, stark, minimal)
// ---------------------------------------------------------------------------

export const brandLaunches: ServicePage = {
  hero: {
    headline: "Brand launches & live events",
    cta: "Tell us about your launch",
    line: "Food that suits the brand, holds up under stage light and keeps pace with the crowd.",
    image: services[2].heroImage,
  },
  whatWeDo: {
    heading: "At a launch, the food is part of the brand for one evening.",
    formats: [
      {
        title: "Store and product launches",
        text: "Canapés plated to suit the brand, and a floor team that keeps moving around the room.",
      },
      {
        title: "Brand days and private previews",
        text: "Trays that look right from every angle, and service that stays out of the conversation.",
      },
      {
        title: "Bars and cocktails",
        text: "Drinks built to order at the bar, poured to suit the evening and the brand behind it.",
      },
      {
        // NEEDS CLIENT: confirm the large-event capability described here (CONTENT-EXPORT 3.4 note)
        title: "Concerts and festivals",
        text: "Service that runs to the set times, not the other way round.",
      },
    ],
  },
  howItWorks: {
    heading: "How a launch runs with us.",
    steps: [
      {
        title: "We read the brief",
        text: "The brand, the room, the guest list, and the moment the evening is built around.",
      },
      {
        title: "We read the run sheet",
        text: "Reveals, speeches and sets come first. The food has to land around them.",
      },
      {
        title: "We walk the venue",
        text: "Access, power, water, and where a counter can actually go.",
      },
      {
        title: "We write the menu",
        text: "Food that suits the brand and still makes sense in one hand, standing up.",
      },
      {
        title: "On the night",
        text: "Our floor team runs service to the schedule, and the room goes back the way we found it.",
      },
    ],
  },
  stories: {
    heading: "Launches we’ve catered.",
    linkLabel: "See the work",
    items: [
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "cartier"; the title stays
        // generic and no client is named until the client confirms)
        folder: "cartier",
        title: "A boutique evening",
        brief: "[NEEDS CLIENT: the brief for the boutique evening]",
        whatWeMade: "Canapés off slate, drinks built to order, and a floor team that kept moving all evening.",
        image: {
          src: `${BRAND}/cartier/cartier-08.jpg`,
          alt: "A gloved server presenting a slate of canapés.",
        },
      },
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "merc-eqg-launch"; the title
        // stays generic and no brand is named until the client confirms)
        folder: "merc-eqg-launch",
        title: "A car launch at night",
        brief: "[NEEDS CLIENT: the brief for the car launch]",
        whatWeMade:
          "A reveal lit in blue and violet. We built the food to read at night, under coloured light, and in photographs.",
        image: {
          src: `${BRAND}/merc-eqg-launch/merc-eqg-launch-01.jpg`,
          alt: "A dessert display under blue light with a single warm lamp.",
        },
      },
    ],
  },
  gallery: {
    heading: "On the tray, at the bar, along the counter.",
    images: [
      {
        src: `${BRAND}/cartier/cartier-07.jpg`,
        alt: "Tartlets dressed with edible flowers on a slate board.",
      },
      {
        src: `${BRAND}/raymond-chairmans-lounge/raymond-chairmans-lounge-03.jpg`,
        alt: "Tiered white and black canapé trays dressed with white flowers.",
        note: "Small file: grid tile only, never full-bleed.",
      },
      {
        src: `${BRAND}/casio/casio-02.jpg`,
        alt: "An evening buffet under table lamps, set against garden foliage.",
      },
      {
        src: `${BRAND}/cartier/cartier-09.jpg`,
        alt: "A slate tray of canapés finished with fresh flowers.",
      },
      {
        src: `${BRAND}/kaytranada/kaytranada-03.jpg`,
        alt: "A service counter lit by table lamps inside a dark concert venue.",
      },
      {
        src: `${BRAND}/himesh-reshamiya/himesh-reshamiya-01.jpg`,
        alt: "The service team lined up in waistcoats along a red carpet before doors open.",
      },
    ],
  },
  otherServices: {
    label: "Other things we do",
  },
  plan: {
    heading: "Tell us about your launch.",
    lead: "The date, the venue and the run sheet, if you have one, is enough to start.",
    cta: "Plan your event",
    presetService: "brand-launches",
  },
};

// ---------------------------------------------------------------------------
// Corporate & office dining (minimal, clean, functional)
// ---------------------------------------------------------------------------

// NEEDS CLIENT: daily office dining photos (AI imagery planned). Every corporate photo in the
// library is event catering, so the photos on this page are shown as corporate functions only.
export const corporateDining: ServicePage = {
  hero: {
    headline: "Corporate & office dining",
    cta: "Talk to us about your office",
    line: "Lunch for the same people, every working day, and the functions your office hosts in between.",
    image: services[3].heroImage,
  },
  whatWeDo: {
    heading: "The test is Tuesday, not the launch party.",
    formats: [
      {
        title: "Daily office dining",
        text: "Planned around a short lunch window, so people eat and get back to work without queuing through their break.",
      },
      {
        title: "Executive and working lunches",
        text: "Lunch in the boardroom or at the desk, served when the meeting allows and cleared without fuss.",
      },
      {
        title: "Corporate functions",
        text: "Annual days, conferences, press events and outdoor days.",
      },
      {
        // NEEDS CLIENT: which diets Foodbiz caters for as standard (e.g. Jain) - not confirmed, so not named.
        title: "Every diet, every day",
        text: "Dietary needs are agreed with you up front and labelled at the counter.",
      },
    ],
  },
  howItWorks: {
    heading: "Setting up a programme.",
    steps: [
      {
        title: "We look at your floor",
        text: "Headcount, timings, the room, and where a counter can actually go.",
      },
      {
        title: "We propose a cycle",
        text: "A menu rotation long enough that nothing repeats before people want it to.",
      },
      {
        title: "We set up",
        text: "Counters, team and the daily routine, agreed with your facilities team.",
      },
      {
        title: "We settle in",
        text: "A standing team, and a regular review of what’s working.",
      },
    ],
  },
  stories: {
    heading: "Corporate functions we’ve catered.",
    linkLabel: "See the work",
    items: [
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "bloomberg-bsmr"; the title
        // stays generic). The dishes are transcribed from the event's own menu board (CONTENT-EXPORT
        // section 7). The board carries the event's small mark in its top-left corner.
        folder: "bloomberg-bsmr",
        title: "An outdoor corporate relay",
        brief: "[NEEDS CLIENT: the brief for the corporate relay]",
        whatWeMade:
          "Feed the runners, then feed everyone else. A menu board with Tibetan thukpa, a Corfu salad and a quinoa brownie, and counters set out between office towers.",
        image: {
          src: `${CORP}/bloomberg-bsmr/bloomberg-bsmr-04.jpg`,
          alt: "A printed menu board listing the hot pot, salad and main meal for the day.",
        },
      },
      {
        // NEEDS CLIENT: name rights (event taken from the photo folder "sbi"; the title stays generic
        // and no bank is named; no signage in this frame)
        folder: "sbi",
        title: "A bank day lunch",
        brief: "[NEEDS CLIENT: the brief for the bank day lunch]",
        whatWeMade: "A long line of chafing dishes, lamps down the length of it, and a fixed lunch window.",
        image: {
          src: `${CORP}/sbi/sbi-02.jpg`,
          alt: "A long banquet line of polished chafing dishes under brass table lamps.",
        },
      },
    ],
  },
  gallery: {
    heading: "Set out, served, cleared.",
    images: [
      {
        src: `${CORP}/sbi/sbi-03.jpg`,
        alt: "Round banquet tables laid with linen beside a draped buffet.",
      },
      {
        src: `${CORP}/netflix/netflix-03.jpg`,
        alt: "Six servers in black standing in a line, each holding a prepared tray.",
      },
      {
        src: `${CORP}/uti/uti-03.jpg`,
        alt: "A buffet counter set into a wood-panelled banquet room.",
      },
      {
        src: `${CORP}/motilal-oswal/motilal-oswal-01.jpg`,
        alt: "Canapés arranged on tiered wooden boards at a window table with the city behind.",
        note: "Crop in on the canapé boards so the tile reads as a detail, not a repeat of the hero.",
      },
    ],
  },
  otherServices: {
    label: "Other things we do",
  },
  plan: {
    heading: "Tell us about your office.",
    lead: "How many people you feed, and when they eat, is enough to start.",
    cta: "Plan your event",
    presetService: "corporate-dining",
  },
};
