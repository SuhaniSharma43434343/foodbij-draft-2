// Shared site data: contact, the photo library, the four services and the homepage.
// Facts come only from the pack (docs/brief/). Anything we do not have is a visible
// [NEEDS CLIENT: ...] placeholder, listed in NOTES.md.

export type Img = {
  /** Path under public/, starting with /images/ */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the crop. Default "50% 50%". */
  position?: string;
  /** Object-position from 1024px, when the wide crop needs a different focus. */
  positionWide?: string;
};

export type ServiceSlug = "weddings" | "celebrations" | "brand-launches" | "corporate-dining";

export type Service = {
  slug: ServiceSlug;
  href: string;
  name: string;
  /** One or two plain sentences: homepage, menus and related-service links. */
  blurb: string;
  linkLabel: string;
  /** The homepage image for this service (different from the service page hero). */
  image: Img;
};

export const PLAN_HREF = "/plan-your-event";

/** Image helper: keeps every photo's real pixel size next to its path. */
const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
  position?: string,
  positionWide?: string,
): Img => ({ src: `/images/${src}`, width, height, alt, position, positionWide });

export const site = {
  name: "Foodbiz",
  contact: {
    phone: "[NEEDS CLIENT: phone]",
    whatsapp: "[NEEDS CLIENT: WhatsApp]",
    email: "[NEEDS CLIENT: enquiry email]",
    address: "[NEEDS CLIENT: address]",
    // The only verified handle (04-previous-version/CONTENT-EXPORT.md).
    instagram: { handle: "@foodbizcatering", url: "https://www.instagram.com/foodbizcatering" },
  },
  legalName: "Foodies Hospitality",
};

// The photos the site uses, by name. Sizes are the files' real pixel sizes.
export const photos = {
  livePlating: img(
    "crops/hero-plating.jpg",
    1600,
    1220,
    "A chef lifts fresh noodles onto a plate at a live counter, above a wheel of cheese.",
    "52% 40%",
  ),
  randiveCrescent: img(
    "1-weddings/randive-wedding/randive-wedding-01.jpg",
    1602,
    2400,
    "A server in a block-printed waistcoat inside a lit crescent counter set with canapés, at night.",
    "50% 55%",
    "50% 46%",
  ),
  bayviewPots: img(
    "1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-02.jpg",
    1600,
    2400,
    "Earthen pots and copper vessels along a wooden counter, each with a printed card.",
    "50% 60%",
  ),
  bayviewChai: img(
    "1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-01.jpg",
    2400,
    1600,
    "An outdoor chai and ice-cream station in white and pale wood, framed by foliage.",
  ),
  bangaloreDesserts: img(
    "1-weddings/bangalore-wedding/bangalore-wedding-01.jpg",
    2400,
    2354,
    "Domed yellow desserts set into a bed of dried beans on a service tray.",
  ),
  bangaloreBuffet: img(
    "1-weddings/bangalore-wedding/bangalore-wedding-04.jpg",
    1600,
    2400,
    "A tiered gold buffet lit by a row of brass lamps.",
  ),
  aurangabadThali: img(
    "1-weddings/aurangabad-wedding/aurangabad-wedding-04.jpg",
    2400,
    1600,
    "Brass thalis laid on a red cloth, a printed menu scroll beside each setting.",
  ),
  aurangabadCounter: img(
    "1-weddings/aurangabad-wedding/aurangabad-wedding-01.jpg",
    1152,
    768,
    "A long buffet counter dressed in green and orange, with brass service ware against carved screens.",
  ),
  glasshouseTable: img(
    "2-celebrations-private-dining/glasshouse-dessert-table/glasshouse-dessert-table-01.jpg",
    2400,
    1800,
    "A dessert table in a glasshouse: brownies, cookies, macarons and cupcakes under glass domes, dressed with purple statice.",
  ),
  glasshouseBoards: img(
    "2-celebrations-private-dining/glasshouse-dessert-table/glasshouse-dessert-table-02.jpg",
    1800,
    2400,
    "Wooden dessert boards and stacked plates on a black and white chequered floor.",
    "50% 55%",
  ),
  ninjaOranges: img(
    "2-celebrations-private-dining/ninja/ninja-04.jpg",
    1800,
    2400,
    "A garden drinks station with jars of infused water and a pile of fresh oranges.",
    "50% 70%",
  ),
  ninjaGarden: img(
    "2-celebrations-private-dining/ninja/ninja-02.jpg",
    1800,
    2400,
    "An outdoor grazing spread laid out beside a garden play area.",
  ),
  ninjaSushi: img(
    "2-celebrations-private-dining/ninja/ninja-01.jpg",
    2400,
    1800,
    "A chef standing behind a sushi board station under a warm lamp.",
  ),
  playseumPastel: img(
    "2-celebrations-private-dining/playseum-set-ups/playseum-set-ups-03.jpg",
    2400,
    1800,
    "A pastel children's counter dressed with paper fans and painted signs.",
    "50% 75%",
  ),
  playseumFarm: img(
    "2-celebrations-private-dining/playseum-set-ups/playseum-set-ups-02.jpg",
    2400,
    1800,
    "A farm-themed children's food counter with gingham and warm lamps.",
    "50% 85%",
  ),
  playseumServers: img(
    "2-celebrations-private-dining/playseum-set-ups/playseum-set-ups-01.jpg",
    2400,
    1800,
    "Two servers in green aprons holding wooden crates at a children's counter.",
    "50% 70%",
  ),
  carnival: img(
    "2-celebrations-private-dining/carnival/carnival-01.jpg",
    1156,
    867,
    "An outdoor children's set-up with bunting and striped food counters.",
  ),
  cartierCarried: img(
    "3-brand-launches-live-events/cartier/cartier-01.jpg",
    2400,
    1600,
    "A slate tray of canapés carried through a room, the server's hand and sleeve in frame.",
  ),
  cartierCocktails: img(
    "3-brand-launches-live-events/cartier/cartier-03.jpg",
    2400,
    1600,
    "Cocktails being built at a bar, coupes and shakers on the pass.",
    "60% 50%",
  ),
  cartierPink: img(
    "3-brand-launches-live-events/cartier/cartier-04.jpg",
    2400,
    1600,
    "A deep pink cocktail held up in a stemmed glass.",
    "40% 50%",
  ),
  cartierBar: img(
    "3-brand-launches-live-events/cartier/cartier-05.jpg",
    2400,
    1600,
    "A bartender finishing a drink at a garden bar.",
  ),
  cartierTartlets: img(
    "3-brand-launches-live-events/cartier/cartier-07.jpg",
    2400,
    1600,
    "Tartlets dressed with edible flowers on a slate board.",
  ),
  cartierPresented: img(
    "3-brand-launches-live-events/cartier/cartier-08.jpg",
    2400,
    1598,
    "A gloved server presenting a slate of canapés.",
  ),
  cartierFlowers: img(
    "3-brand-launches-live-events/cartier/cartier-09.jpg",
    2400,
    1600,
    "A slate tray of canapés finished with fresh flowers.",
    "45% 55%",
  ),
  raymondCups: img(
    "3-brand-launches-live-events/raymond-chairmans-lounge/raymond-chairmans-lounge-02.jpg",
    1086,
    1448,
    "Dark canapé cups finished with saffron-coloured piping and a sprig of green.",
    "50% 75%",
  ),
  raymondTrays: img(
    "3-brand-launches-live-events/raymond-chairmans-lounge/raymond-chairmans-lounge-05.jpg",
    1800,
    2400,
    "A long run of white and black trays, each lined with plated canapés and white flowers.",
  ),
  rocaDesserts: img(
    "3-brand-launches-live-events/roca-store-launch/roca-store-launch-01.jpg",
    1800,
    2400,
    "Individually plated desserts under pink and violet display light.",
    "50% 60%",
  ),
  casioEvening: img(
    "3-brand-launches-live-events/casio/casio-02.jpg",
    2400,
    1800,
    "An evening buffet under table lamps, mantel clocks among the platters, the garden behind the glass.",
  ),
  casioClock: img(
    "3-brand-launches-live-events/casio/casio-03.jpg",
    2400,
    1800,
    "A buffet counter dressed with a mantel clock and warm lamps.",
    "20% 50%",
  ),
  mercBlue: img(
    "3-brand-launches-live-events/merc-eqg-launch/merc-eqg-launch-01.jpg",
    2400,
    1800,
    "A dessert display under blue light, with a single warm lamp.",
  ),
  mercViolet: img(
    "3-brand-launches-live-events/merc-eqg-launch/merc-eqg-launch-03.jpg",
    1800,
    2400,
    "A charcuterie and grazing spread lit in violet.",
  ),
  kaytranadaCounter: img(
    "3-brand-launches-live-events/kaytranada/kaytranada-03.jpg",
    2400,
    1800,
    "A service counter lit by table lamps inside a dark concert venue, the team working behind it.",
  ),
  himeshTeam: img(
    "3-brand-launches-live-events/himesh-reshamiya/himesh-reshamiya-01.jpg",
    1800,
    2400,
    "The service team in waistcoats, lined up along a red carpet before the doors open.",
    "50% 65%",
  ),
  rollingLoudLine: img(
    "3-brand-launches-live-events/rolling-loud/rolling-loud-02.jpg",
    2400,
    1800,
    "A long buffet counter lit by lamps against a black backdrop.",
  ),
  rollingLoudDishes: img(
    "3-brand-launches-live-events/rolling-loud/rolling-loud-01.jpg",
    1800,
    2400,
    "Chafing dishes in service at a festival catering station.",
  ),
  ramenCounter: img(
    "3-brand-launches-live-events/crunchyroll/crunchyroll-02.jpg",
    1800,
    2400,
    "A wooden ramen stall hung with red paper lanterns, the kitchen team working behind the counter.",
    "50% 70%",
  ),
  defenderBoard: img(
    "3-brand-launches-live-events/himalayan-defender-journey/himalayan-defender-journey-01.jpg",
    1350,
    2400,
    "Canapés set on a moss-dressed board with small printed name cards.",
    "50% 70%",
  ),
  motilalBoards: img(
    "4-corporate-office-dining/motilal-oswal/motilal-oswal-01.jpg",
    1800,
    2400,
    "Canapés on tiered wooden boards at a window table, the city behind.",
    "50% 60%",
  ),
  sbiLine: img(
    "4-corporate-office-dining/sbi/sbi-02.jpg",
    1800,
    2400,
    "A long banquet line of polished chafing dishes under brass table lamps.",
    "50% 60%",
  ),
  sbiTables: img(
    "4-corporate-office-dining/sbi/sbi-03.jpg",
    2400,
    1800,
    "Round banquet tables laid with linen beside a long draped buffet.",
  ),
  netflixTeam: img(
    "4-corporate-office-dining/netflix/netflix-03.jpg",
    2400,
    1800,
    "Six servers in black standing in a line, each holding a prepared tray.",
  ),
  utiRoom: img(
    "4-corporate-office-dining/uti/uti-03.jpg",
    1600,
    900,
    "A buffet counter set into a wood-panelled banquet room.",
  ),
  bsmrMenu: img(
    "4-corporate-office-dining/bloomberg-bsmr/bloomberg-bsmr-04.jpg",
    1800,
    2400,
    "A printed menu board listing the hot pot, salad and main meal for the day.",
    "50% 60%",
  ),
  bsmrLawn: img(
    "4-corporate-office-dining/bloomberg-bsmr/bloomberg-bsmr-05.jpg",
    1800,
    2400,
    "Trestle tables and shade tents laid out on a lawn between office buildings.",
  ),
};

export const services: Service[] = [
  {
    slug: "weddings",
    href: "/services/weddings",
    name: "Weddings",
    linkLabel: "See weddings",
    blurb: "Multi-day weddings, live counters, and the family dishes that have to be there.",
    image: photos.bayviewPots,
  },
  {
    slug: "celebrations",
    href: "/services/celebrations",
    name: "Celebrations & private dining",
    linkLabel: "See celebrations",
    blurb: "Birthdays, children’s parties, family functions and sit-down dinners at home.",
    image: photos.glasshouseTable,
  },
  {
    slug: "brand-launches",
    href: "/services/brand-launches",
    name: "Brand launches & live events",
    linkLabel: "See launches and events",
    blurb: "Store and product launches, brand days, concerts and festivals. Food that suits the brand and keeps up with the crowd.",
    image: photos.cartierCarried,
  },
  {
    slug: "corporate-dining",
    href: "/services/corporate-dining",
    name: "Corporate & office dining",
    linkLabel: "See office dining",
    blurb: "Daily meals for offices and campuses, and the corporate functions in between.",
    image: photos.sbiLine,
  },
];

export function getService(slug: ServiceSlug): Service {
  return services.find((s) => s.slug === slug)!;
}

export const home = {
  hero: {
    headline: "Be a guest at your own event.",
    lead: "Catering and hospitality in Mumbai, for weddings, celebrations, brand launches and offices.",
    image: photos.randiveCrescent,
  },
  servicesHeading: "What we do",
  food: {
    heading: "Plated, passed, poured.",
    images: [
      photos.cartierFlowers,
      photos.bangaloreDesserts,
      photos.defenderBoard,
      photos.cartierCocktails,
      photos.rocaDesserts,
    ],
  },
  story: {
    // The founders' own line (04-previous-version/CONTENT-EXPORT.md s2.2, KEEP-ADAPT).
    quote: "We’re not just in the business of food. We’re in the business of food and experience.",
    quoteBy: "Amar Jog and Kushal Shetty, founders",
    body: "Foodbiz is a catering and hospitality company in Mumbai. We plan the food and the hosting around it, so you can leave the stress to us and be present.",
    image: photos.himeshTeam,
  },
  work: {
    heading: "Recent work",
    // One story per service.
    slugs: ["boutique-evening", "wedding-in-bengaluru", "garden-birthday", "bank-day-lunch"],
  },
  close: {
    heading: "Tell us the date. We’ll take it from there.",
    lead: "A rough guest count and the kind of event is enough to start.",
    image: photos.casioEvening,
  },
};
