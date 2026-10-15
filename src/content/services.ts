// The four service pages. One template (components/ServicePage.tsx), four sets of words and photos.
// Facts: 01-BRIEF.md s5-6, 02-MEETING-NOTES.md, CONTENT-EXPORT.md (KEEP-ADAPT blocks).
// Nothing here names a dish, number or client that the pack does not support.

import { photos, type Img, type ServiceSlug } from "./site";

/** Each service page shares one structure but has its own mood:
 *  cinematic (weddings: full-bleed, dark, warm), intimate (celebrations: linen, layered photographs),
 *  stage (launches: navy, a row of photographs at scale), precise (corporate: white, ruled and exact). */
export type Variant = "cinematic" | "intimate" | "stage" | "precise";

export type ServicePageData = {
  slug: ServiceSlug;
  variant: Variant;
  meta: { title: string; description: string };
  hero: { promise: string; cta: string; image: Img; extra?: Img[] };
  /** "What we cover": one heading, then three or four formats as plain lines. */
  cover: { heading: string; formats: { title: string; text: string }[]; image: Img };
  steps: { heading: string; items: { title: string; text: string }[] };
  /** Story slugs from content/stories.ts. */
  stories: string[];
  gallery: Img[];
  /** Shown only where a real gap needs flagging on the review build. */
  galleryNote?: string;
  close: { heading: string; lead: string };
};

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  weddings: {
    slug: "weddings",
    variant: "cinematic",
    meta: {
      title: "Weddings",
      description: "Wedding catering in Mumbai: multi-day weddings, live counters, and the family dishes that have to be there.",
    },
    hero: {
      promise: "Your family’s dishes first. Then the counters, the service and the evenings around them.",
      cta: "Tell us about your wedding",
      image: photos.aurangabadThali,
    },
    cover: {
      heading: "Every ceremony gets its own menu.",
      formats: [
        { title: "Sangeet and mehendi", text: "Small plates that work in one hand, and counters that stay open as long as the dancing." },
        { title: "The wedding day", text: "The dishes your family won’t do without go on the menu first. We build the rest around them." },
        { title: "Reception", text: "Plated, a buffet or a thali service, with a floor team that keeps the evening moving." },
        { title: "Live counters", text: "Chai poured fresh, a wok cooking to order, desserts finished in front of your guests." },
      ],
      image: photos.livePlating,
    },
    steps: {
      heading: "How a wedding comes together",
      items: [
        { title: "We meet", text: "The days, the ceremonies, the families, and the dishes that aren’t up for discussion." },
        { title: "We write the menus", text: "One for each ceremony, around your family’s dishes and the dietary needs on both sides." },
        { title: "We plan the days", text: "Timings, counters and the team for each event, agreed with you and your planner." },
        { title: "You’re a guest", text: "Our team runs the food and the floor. Someone else is watching the counters." },
      ],
    },
    stories: ["wedding-in-bengaluru", "outdoor-wedding", "wedding-in-aurangabad"],
    gallery: [photos.bangaloreDesserts, photos.randiveCrescent, photos.bayviewPots, photos.aurangabadCounter, photos.bangaloreBuffet, photos.bayviewChai],
    close: { heading: "Tell us about your wedding.", lead: "Even if it’s a year out and nothing is fixed yet." },
  },

  celebrations: {
    slug: "celebrations",
    variant: "intimate",
    meta: {
      title: "Celebrations & private dining",
      description: "Catering in Mumbai for birthdays, children’s parties, family functions and sit-down dinners at home.",
    },
    hero: {
      promise: "Birthdays, family functions and dinners at home. We cook and serve, so you stay with your guests.",
      cta: "Tell us about your party",
      image: photos.glasshouseBoards,
      extra: [photos.ninjaSushi],
    },
    cover: {
      heading: "Every party has a different crowd.",
      formats: [
        { title: "Birthdays and children’s parties", text: "Food sized for small hands, and a counter children want to walk up to." },
        { title: "Family and social functions", text: "The dishes your family expects go on the menu first." },
        { title: "Sit-down dinners at home", text: "A menu that is allowed a little madness, served at your own table." },
        { title: "Dessert tables", text: "Brownies, cookies, macarons and cupcakes under glass, dressed with flowers." },
      ],
      image: photos.ninjaOranges,
    },
    steps: {
      heading: "How a party comes together",
      items: [
        { title: "Tell us the occasion", text: "Whose party it is, who’s coming and where. For a child’s party, the age changes everything." },
        { title: "Tell us the allergies", text: "And the dishes that have to be there." },
        { title: "We write the menu", text: "Around your guests. If there’s a theme, we cook to it without turning everything into sugar." },
        { title: "We set up and serve", text: "You get the party." },
      ],
    },
    stories: ["garden-birthday", "childrens-counters", "glasshouse-dessert-table"],
    gallery: [photos.glasshouseTable, photos.playseumServers, photos.ninjaGarden, photos.carnival, photos.playseumFarm],
    galleryNote: "[NEEDS CLIENT: photographs of sit-down dinners. None exist yet; AI imagery is planned for this slot, see NOTES.md]",
    close: { heading: "Tell us about your party.", lead: "Whose party it is and roughly how many are coming is enough to start." },
  },

  "brand-launches": {
    slug: "brand-launches",
    variant: "stage",
    meta: {
      title: "Brand launches & live events",
      description: "Catering in Mumbai for store and product launches, brand days, concerts, festivals and large-format events.",
    },
    hero: {
      promise: "Food that suits the brand, holds up under stage light and keeps up with the crowd.",
      cta: "Tell us about your launch",
      image: photos.raymondTrays,
      extra: [photos.cartierCocktails, photos.rollingLoudLine],
    },
    cover: {
      heading: "For one evening, the food is part of the brand.",
      formats: [
        { title: "Store and product launches", text: "Canapés plated to suit the brand, and a floor team that keeps moving around the room." },
        { title: "Brand days and private previews", text: "Trays that look right from every angle, and service that stays out of the conversation." },
        { title: "Bars", text: "Drinks built to order, poured to suit the evening." },
        { title: "Concerts, festivals and large formats", text: "Service that runs to the set times, not the other way round." },
      ],
      image: photos.cartierTartlets,
    },
    steps: {
      heading: "How a launch runs with us",
      items: [
        { title: "We read the brief", text: "The brand, the room, the guest list, and the moment the evening is built around." },
        { title: "We read the run sheet", text: "Reveals, speeches and sets come first. The food lands around them." },
        { title: "We walk the venue", text: "Access, power, water, and where a counter can actually go." },
        { title: "On the night", text: "Our floor team runs service to the schedule." },
      ],
    },
    stories: ["boutique-evening", "car-launch-at-night", "anime-launch-party", "music-festival"],
    gallery: [photos.mercViolet, photos.cartierBar, photos.defenderBoard, photos.kaytranadaCounter, photos.himeshTeam, photos.cartierPink],
    close: { heading: "Tell us about your launch.", lead: "The date, the venue and the run sheet, if you have one, is enough to start." },
  },

  "corporate-dining": {
    slug: "corporate-dining",
    variant: "precise",
    meta: {
      title: "Corporate & office dining",
      description: "Daily and recurring catering for offices and campuses in Mumbai, plus corporate functions.",
    },
    hero: {
      promise: "Lunch for the same people, every working day, and the functions your office hosts in between.",
      cta: "Talk to us about your office",
      image: photos.sbiTables,
    },
    cover: {
      heading: "The test is an ordinary Tuesday.",
      formats: [
        { title: "Daily office dining", text: "Planned around a short lunch window, so people eat and get back to work." },
        { title: "Working lunches", text: "In the boardroom or at the desk, served when the meeting allows." },
        { title: "Corporate functions", text: "Annual days, conferences, press events and outdoor days." },
        { title: "Every diet", text: "Dietary needs agreed with you up front, before the first lunch." },
      ],
      image: photos.motilalBoards,
    },
    steps: {
      heading: "Setting up a programme",
      items: [
        { title: "We look at your floor", text: "Headcount, timings, the room, and where a counter can go." },
        { title: "We propose a menu cycle", text: "Long enough that nothing repeats before people want it to." },
        { title: "We set up", text: "Counters, team and the daily routine, agreed with your facilities team." },
        { title: "We keep it running", text: "Lunch, every working day." },
      ],
    },
    stories: ["bank-day-lunch", "office-relay"],
    gallery: [photos.netflixTeam, photos.sbiLine, photos.utiRoom, photos.bsmrLawn, photos.bsmrMenu],
    galleryNote: "[NEEDS CLIENT: photographs of daily office dining. Every photo here is from a corporate function]",
    close: { heading: "Tell us about your office.", lead: "How many people you feed, and when they eat, is enough to start." },
  },
};
