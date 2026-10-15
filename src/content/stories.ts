// Event stories (01-BRIEF.md s6 "Event story"). Each starts from the brief; until the client sends it,
// the brief is a visible [NEEDS CLIENT] placeholder. "What we made" describes only what the photos show
// (or the counter names and menu board visible in them, CONTENT-EXPORT.md s7).
// Titles stay generic: client names need the client's OK (07-OPEN-ITEMS C4). The placeholders name the
// photo folder so the reviewer knows which event is meant. No AI image appears in any story.

import { photos, type Img, type ServiceSlug } from "./site";

export type Story = {
  slug: string;
  service: ServiceSlug;
  title: string;
  /** One line: the card and the page description. */
  summary: string;
  brief: string;
  whatWeMade: string;
  /** One line, only where a live counter is visible in the photos. */
  liveCounter?: string;
  /** The first image is the card photo and the story's lead image. */
  images: Img[];
};

export const stories: Story[] = [
  {
    slug: "wedding-in-bengaluru",
    service: "weddings",
    title: "A wedding in Bengaluru",
    summary: "A gold buffet built up in tiers, a chef finishing plates by hand, and dessert set into dried beans.",
    brief: "[NEEDS CLIENT: the brief for this wedding (photo folder: Bangalore Wedding)]",
    whatWeMade:
      "A tiered gold buffet under a row of brass lamps. Domed yellow desserts set into a bed of dried beans on the service trays.",
    liveCounter: "A live counter where a chef finished each plate by hand.",
    images: [photos.bangaloreBuffet, photos.bangaloreDesserts, photos.livePlating],
  },
  {
    slug: "outdoor-wedding",
    service: "weddings",
    title: "An outdoor wedding",
    summary: "Chai and ice cream outdoors, earthen pots along a wooden counter, and a wok cooking to order.",
    brief: "[NEEDS CLIENT: the brief for this wedding (photo folder: Bayview Lawns Wedding)]",
    whatWeMade:
      "A chai and ice-cream station in white and pale wood, framed by foliage. Earthen pots and copper vessels along a wooden counter, each with a printed card.",
    liveCounter: "Thai Chatuchak ice cream, The Mangolian live wok, and chai, each at its own counter.",
    images: [photos.bayviewChai, photos.bayviewPots],
  },
  {
    slug: "wedding-in-aurangabad",
    service: "weddings",
    title: "A wedding in Aurangabad",
    summary: "Brass thalis, and a printed menu at every setting.",
    brief: "[NEEDS CLIENT: the brief for this wedding (photo folder: Aurangabad Wedding)]",
    whatWeMade:
      "Brass thalis on a red cloth, with a printed menu scroll beside each one. A long buffet counter in green and orange, set with brass service ware against carved wooden screens.",
    images: [photos.aurangabadThali, photos.aurangabadCounter],
  },
  {
    slug: "garden-birthday",
    service: "celebrations",
    title: "A children’s birthday in the garden",
    summary: "Infused water and oranges, a grazing spread by the play area, and a sushi board.",
    brief: "[NEEDS CLIENT: the brief for this party (photo folder: Ninja)]",
    whatWeMade:
      "A garden drinks station with jars of infused water and fresh oranges, and a grazing spread beside the play area.",
    liveCounter: "A sushi board station, with a chef behind it under a warm lamp.",
    images: [photos.ninjaOranges, photos.ninjaGarden, photos.ninjaSushi],
  },
  {
    slug: "childrens-counters",
    service: "celebrations",
    title: "Counters for a children’s party",
    summary: "A counter small people want to walk up to.",
    brief: "[NEEDS CLIENT: the brief for these counters (photo folder: Playseum Set Ups)]",
    whatWeMade:
      "Two counters, two looks: one pastel, dressed with paper fans and painted signs; one farm-themed, in gingham under warm lamps. Servers in green aprons brought the food out on wooden crates.",
    images: [photos.playseumPastel, photos.playseumFarm, photos.playseumServers],
  },
  {
    slug: "glasshouse-dessert-table",
    service: "celebrations",
    title: "A dessert table in a glasshouse",
    summary: "Brownies, cookies and macarons on wooden boards, the garden behind the glass.",
    brief: "[NEEDS CLIENT: the brief for this dessert table]",
    whatWeMade:
      "Brownies, cookies, cupcakes under glass domes and macarons, on wooden boards dressed with purple statice and red blossom.",
    images: [photos.glasshouseTable, photos.glasshouseBoards],
  },
  {
    slug: "boutique-evening",
    service: "brand-launches",
    title: "An evening at a jewellery boutique",
    summary: "Canapés off slate, drinks built to order, and a floor team that kept moving all evening.",
    brief: "[NEEDS CLIENT: the brief for this event (photo folder: Cartier)]",
    whatWeMade:
      "Tartlets and small bites on slate trays, finished with fresh flowers and carried through the room by gloved servers. Cocktails built at the bar, coupes and shakers on the pass.",
    liveCounter: "A garden bar, finishing each cocktail to order.",
    images: [photos.cartierPresented, photos.cartierTartlets, photos.cartierCocktails, photos.cartierBar, photos.cartierPink],
  },
  {
    slug: "car-launch-at-night",
    service: "brand-launches",
    title: "A car launch at night",
    summary: "A reveal lit in blue and violet, and food built to read under coloured light.",
    brief: "[NEEDS CLIENT: the brief for this launch (photo folder: Merc EQG Launch)]",
    whatWeMade:
      "A dessert display under blue light with warm table lamps, and a charcuterie and grazing spread lit in violet.",
    images: [photos.mercBlue, photos.mercViolet],
  },
  {
    slug: "anime-launch-party",
    service: "brand-launches",
    title: "A ramen counter at a launch party",
    summary: "A wooden ramen stall hung with red lanterns, cooking to order.",
    brief: "[NEEDS CLIENT: the brief for this party (photo folder: Crunchyroll)]",
    whatWeMade: "A ramen counter built as a wooden stall and hung with red paper lanterns, the kitchen team cooking behind it.",
    liveCounter: "Ramen, cooked to order through the evening.",
    images: [photos.ramenCounter],
  },
  {
    slug: "music-festival",
    service: "brand-launches",
    title: "A music festival",
    summary: "Service that had to run to the set times, not the other way round.",
    brief: "[NEEDS CLIENT: the brief for this festival (photo folder: Rolling Loud)]",
    whatWeMade: "A long buffet counter against a black backdrop, lit by brass lamps, chafing dishes in service down the line.",
    images: [photos.rollingLoudLine, photos.rollingLoudDishes],
  },
  {
    slug: "retail-evening",
    service: "brand-launches",
    title: "A retail evening by the garden",
    summary: "Warm lamps, garden air, and a counter built to be read slowly.",
    brief: "[NEEDS CLIENT: the brief for this event (photo folder: Casio)]",
    whatWeMade:
      "An evening buffet under table lamps, set against the garden, with mantel clocks among the platters and candles down the table.",
    images: [photos.casioEvening, photos.casioClock],
  },
  {
    slug: "bank-day-lunch",
    service: "corporate-dining",
    title: "A bank’s anniversary lunch",
    summary: "A long line of chafing dishes, lamps down the length of it, and a fixed lunch window.",
    brief: "[NEEDS CLIENT: the brief for this lunch (photo folder: SBI)]",
    whatWeMade:
      "A long line of polished chafing dishes under brass table lamps, draped in gold. Round tables laid with linen and flowers.",
    images: [photos.sbiTables, photos.sbiLine],
  },
  {
    slug: "office-relay",
    service: "corporate-dining",
    title: "A relay race between office towers",
    summary: "Feed the runners, then feed everyone else.",
    brief: "[NEEDS CLIENT: the brief for this event (photo folder: Bloomberg BSMR)]",
    whatWeMade:
      "The menu board read: Tibetan thukpa with momos, a Corfu salad, cottage cheese and bamboo shoots with stir-fried rice or tempura chicken, then a banana milk chocolate slice or a quinoa chocolate brownie. Trestle tables and shade tents on the lawn between the buildings.",
    images: [photos.bsmrMenu, photos.bsmrLawn],
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function storiesBySlug(slugs: string[]): Story[] {
  return slugs.map((slug) => getStory(slug)).filter((s): s is Story => Boolean(s));
}
