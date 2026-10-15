// Site copy for the Home page and the Weddings service page (W2.3).
// Starting point: the approved homepage design (docs/design/), checked against
// docs/brief/VOICE.md and docs/brief/CONTENT-EXPORT.md. Photos: docs/design/photo-picks.md and
// docs/brief/IMAGE-INDEX.csv.
//
// [NEEDS CLIENT] items used in this file (collect into NOTES.md):
//   1. [NEEDS CLIENT: phone]          - site.contact, home.plan, weddings.plan, enquiryForm status
//   2. [NEEDS CLIENT: whatsapp]       - site.contact
//   3. [NEEDS CLIENT: email]          - site.contact, enquiryForm status
//   4. [NEEDS CLIENT: address]        - site.contact
//   5. [NEEDS CLIENT: reply time]     - enquiryForm "sent" message (no reply time is confirmed)
//   6. [NEEDS CLIENT: the brief for the Bengaluru wedding]      - weddings.stories[0]
//   7. [NEEDS CLIENT: the brief for the Bayview Lawns wedding]  - weddings.stories[1]
// Also flagged in code comments below (not visible on the page):
//   - name rights for event names taken from photo folders (Bengaluru, Bayview Lawns)
//   - [NEEDS CLIENT: are tastings offered?] (no tasting step on the Weddings page until confirmed)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Img = {
  /** Path under public/, starting with /images/ */
  src: string;
  alt: string;
  /** Art-direction note for the builder (not shown on the page). */
  note?: string;
};

export type NavItem = { label: string; href: string };

export type ServiceSlug = "weddings" | "celebrations" | "brand-launches" | "corporate-dining";

export type Service = {
  slug: ServiceSlug;
  href: string;
  name: string;
  shortName: string;
  /** One line, used under the name on service links and in the hero. */
  promise: string;
  /** Two sentences for the homepage card. */
  blurb: string;
  linkLabel: string;
  heroImage: Img;
  /** Value preset in the enquiry form's "type of event" field. */
  enquiryValue: ServiceSlug;
};

export type Site = {
  name: string;
  nav: NavItem[];
  headerCta: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    instagram: { handle: string; url: string };
  };
  footer: { copyright: string; legal: NavItem[] };
};

export type Home = {
  opening: { headline: string; lead: string; cta: string; image: Img };
  servicesIntro: { heading: string };
  food: { heading: string; images: Img[] };
  /** Full-screen scroll-lit statement after the opening (the founders' own line). */
  statement: { quote: string; quoteBy: string };
  storyShort: {
    quote: string;
    quoteBy: string;
    body: string;
    linkLabel: string;
    image: Img;
  };
  stories: { heading: string; linkLabel: string; items: StoryCard[] };
  plan: { heading: string; lead: string; cta: string };
};

/** A homepage event card: photo, title and the brief in one line. */
export type StoryCard = {
  title: string;
  line: string;
  image: Img;
  href: string;
};

export type Format = { title: string; text: string };
export type Step = { title: string; text: string };

export type EventStory = {
  /** Photo folder name under the service's image folder, e.g. public/images/1-weddings/<folder>/ */
  folder: string;
  title: string;
  brief: string;
  whatWeMade: string;
  image: Img;
};

export type ServicePage = {
  /** cta: the hero button label; falls back to plan.cta. */
  hero: { headline: string; line: string; image: Img; cta?: string };
  whatWeDo: { heading: string; formats: Format[] };
  howItWorks: { heading: string; steps: Step[] };
  stories: { heading: string; items: EventStory[]; linkLabel: string };
  gallery: { heading: string; images: Img[] };
  /** The heading over the links to the other three services. */
  otherServices: { label: string };
  plan: { heading: string; lead: string; cta: string; presetService: ServiceSlug };
};

export type Option = { value: string; label: string };

export type Field = {
  label: string;
  hint?: string;
  required?: boolean;
};

export type EnquiryForm = {
  heading: string;
  lead: string;
  fields: {
    name: Field;
    phone: Field;
    email: Field;
    eventType: Field & { options: Option[] };
    date: Field;
    guests: Field & { options: Option[] };
    city: Field;
    brief: Field;
  };
  submit: string;
  status: { sent: string; cannotSend: string };
};

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

const IMG = "/images";
const PHONE = "[NEEDS CLIENT: phone]";
const EMAIL = "[NEEDS CLIENT: email]";

/** Where every "Plan your event" link goes unless the page has its own #plan band. */
export const PLAN_HREF = "/plan-your-event";

/** "What we made" line for the outdoor (Bayview Lawns) wedding: used on Home and Weddings. */
const BAYVIEW_LINE =
  "Chai and ice cream outdoors, earthen pots along a wooden counter, and a live wok counter cooking to order.";

export const site: Site = {
  name: "Foodbiz",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Our work", href: "/our-work" },
    { label: "Our story", href: "/our-story" },
    { label: "Plan your event", href: PLAN_HREF },
  ],
  headerCta: "Plan your event",
  contact: {
    phone: PHONE,
    whatsapp: "[NEEDS CLIENT: whatsapp]",
    email: EMAIL,
    address: "[NEEDS CLIENT: address]",
    instagram: { handle: "@foodbizcatering", url: "https://www.instagram.com/foodbizcatering" },
  },
  footer: {
    copyright: "© Foodies Hospitality. All rights reserved.",
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};

// ---------------------------------------------------------------------------
// The four services, in the order fixed by the brief
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    slug: "weddings",
    href: "/services/weddings",
    name: "Weddings",
    shortName: "Weddings",
    promise: "Your family gets to be guests at its own wedding.",
    blurb:
      "Sangeet, wedding day, reception. Live counters, the family dishes that must be there, and a team that runs the evening so your family gets to be guests.",
    linkLabel: "See weddings",
    // Was randive-wedding-01 (chef's toques in the background, which the brief avoids; no crop removes
    // them in every place this image is shown, e.g. the full-height homepage service card).
    heroImage: {
      src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-04.jpg`,
      alt: "A tiered gold buffet structure lit by a row of brass lamps.",
    },
    enquiryValue: "weddings",
  },
  {
    slug: "celebrations",
    href: "/services/celebrations",
    name: "Celebrations & private dining",
    shortName: "Celebrations",
    promise: "Birthdays, family functions and dinners at home, without the fuss.",
    blurb:
      "Birthdays, children’s parties, family functions and sit-down dinners at home. Food that guests of every age actually finish, served without fuss.",
    linkLabel: "See celebrations",
    heroImage: {
      src: `${IMG}/2-celebrations-private-dining/glasshouse-dessert-table/glasshouse-dessert-table-01.jpg`,
      alt: "A dessert table in a glasshouse: brownies, cookies, cupcakes under glass domes and macarons, dressed with purple statice and red blossom.",
    },
    enquiryValue: "celebrations",
  },
  {
    slug: "brand-launches",
    href: "/services/brand-launches",
    name: "Brand launches & live events",
    shortName: "Brand launches",
    promise: "Food that suits the brand and keeps pace with the crowd.",
    blurb:
      "Store openings, product reveals, brand days and concerts. Food that suits the brand, holds up under stage light and keeps pace with the crowd.",
    linkLabel: "See brand launches",
    heroImage: {
      src: `${IMG}/3-brand-launches-live-events/cartier/cartier-03.jpg`,
      alt: "Cocktails being built at a bar, coupes and shakers on the pass.",
    },
    enquiryValue: "brand-launches",
  },
  {
    slug: "corporate-dining",
    href: "/services/corporate-dining",
    name: "Corporate & office dining",
    shortName: "Corporate dining",
    promise: "Lunch, every day, well.",
    blurb:
      "Daily meals for offices and campuses, and the functions in between. Minimal, clean and on time.",
    linkLabel: "See corporate dining",
    heroImage: {
      src: `${IMG}/4-corporate-office-dining/motilal-oswal/motilal-oswal-01.jpg`,
      alt: "Canapés arranged on tiered wooden boards at a window table with the city behind.",
    },
    enquiryValue: "corporate-dining",
  },
];

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export const home: Home = {
  opening: {
    headline: "We cook. We host. You enjoy your own event.",
    lead: "Catering and hospitality in Mumbai.",
    cta: "Plan your event",
    image: {
      src: `${IMG}/3-brand-launches-live-events/cartier/cartier-07.jpg`,
      alt: "Tartlets dressed with edible flowers on a slate board.",
      note: "Still until a plating loop exists. Crops to portrait on phone; tray sits centre-left.",
    },
  },
  servicesIntro: {
    heading: "Four ways we feed a room.",
  },
  food: {
    heading: "Food, service, presentation.",
    images: [
      {
        src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-01.jpg`,
        alt: "Domed yellow desserts set into a bed of dried beans on a service tray.",
      },
      {
        src: `${IMG}/3-brand-launches-live-events/raymond-chairmans-lounge/raymond-chairmans-lounge-03.jpg`,
        alt: "Tiered white and black canapé trays dressed with white flowers.",
        note: "Small file: grid tile only, never full-bleed.",
      },
      {
        src: `${IMG}/1-weddings/aurangabad-wedding/aurangabad-wedding-04.jpg`,
        alt: "Brass thalis laid out on a red cloth with printed menu scrolls beside each setting.",
      },
      {
        src: `${IMG}/3-brand-launches-live-events/cartier/cartier-09.jpg`,
        alt: "A slate tray of canapés finished with fresh flowers.",
      },
      {
        // ninja-03 swapped out: an old sub-brand counter card is in frame.
        src: `${IMG}/3-brand-launches-live-events/casio/casio-02.jpg`,
        alt: "An evening buffet set under table lamps with a garden behind.",
      },
      {
        src: `${IMG}/3-brand-launches-live-events/cartier/cartier-08.jpg`,
        alt: "A gloved server presenting a slate of canapés.",
      },
    ],
  },
  statement: {
    quote: "We’re not just in the business of food. We’re in the business of food and experience.",
    quoteBy: "Amar Jog and Kushal Shetty, founders",
  },
  storyShort: {
    // The founders' line now opens the page (Statement band), so this block leads with their other promise.
    quote: "Leave the stress to us. Be present at your own event.",
    quoteBy: "",
    body: "Foodbiz is a catering and hospitality company in Mumbai, founded by Amar Jog and Kushal Shetty. We plan the food and the hosting around it, so you get to be a guest.",
    linkLabel: "Read our story",
    image: {
      src: `${IMG}/3-brand-launches-live-events/essentia/essentia-01.jpg`,
      alt: "Two servers in black holding wooden trays of small bites, in a dark panelled room.",
    },
  },
  stories: {
    heading: "Every event starts with a brief.",
    linkLabel: "See the work",
    // NEEDS CLIENT: name rights + briefs for these events (event names come from the photo folders;
    // titles stay generic and no client logo shows until the client confirms).
    items: [
      {
        // Homepage stories open the Instagram-style viewer, so these are the stories with the most
        // cleared photos (5, 3 and 3), one per service type. NEEDS CLIENT: name rights + briefs.
        title: "An evening at a jewellery boutique",
        line: "Canapés off slate, drinks built to order, and a floor team that kept moving all evening.",
        image: {
          src: `${IMG}/3-brand-launches-live-events/cartier/cartier-04.jpg`,
          alt: "A deep pink cocktail held up in a stemmed glass.",
        },
        href: "/our-work/boutique-evening",
      },
      {
        title: "A wedding in Bengaluru",
        line: "A gold buffet built up in tiers, a chef finishing plates by hand, and dessert that arrived looking like it was grown.",
        image: {
          src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-02.jpg`,
          alt: "A pearl necklace displayed on a stand beside a grazing board, warm lights out of focus behind.",
        },
        href: "/our-work/wedding-in-bengaluru",
      },
      {
        title: "Counters for a children's party",
        line: "A counter small people want to walk up to, with food they finish.",
        image: {
          src: `${IMG}/2-celebrations-private-dining/playseum-set-ups/playseum-set-ups-03.jpg`,
          alt: "A pastel children's counter dressed with paper fans and painted signage.",
        },
        href: "/our-work/childrens-counters",
      },
    ],
  },
  plan: {
    heading: "Tell us about your event.",
    lead: "A date, a rough guest count and the kind of event is enough to start.",
    cta: "Plan your event",
  },
};

// ---------------------------------------------------------------------------
// Weddings service page (01-BRIEF.md section 6, "Service page")
// ---------------------------------------------------------------------------

export const weddings: ServicePage = {
  hero: {
    headline: "Weddings",
    cta: "Tell us about your wedding",
    line: "We plan the food around your family, then run every counter, so you can be a guest at your own wedding.",
    image: services[0].heroImage,
  },
  whatWeDo: {
    heading: "Weddings are the hardest catering there is.",
    formats: [
      {
        title: "Sangeet and mehendi",
        text: "Small plates that work in one hand, and counters that stay open as long as the dancing.",
      },
      {
        title: "Wedding day",
        text: "The family dishes that have to be there go on the menu first; we build the rest around them.",
      },
      {
        title: "Reception",
        text: "Plated, a buffet or a thali service, with a floor team that keeps the evening moving.",
      },
      {
        title: "Live counters",
        text: "A live dosa counter, a wok cooking to order, chai poured fresh.",
      },
    ],
  },
  howItWorks: {
    heading: "How a wedding runs with us.",
    steps: [
      {
        title: "We meet",
        text: "You tell us the shape of it: the days, the ceremonies, the families, and the dishes that aren’t negotiable.",
      },
      {
        title: "We write the menus",
        text: "Each ceremony gets its own menu, built around your family’s dishes and the dietary needs on both sides.",
      },
      {
        title: "We plan the days",
        text: "Timings, counters and the team for each event, agreed with you, and with your planner if you have one.",
      },
      {
        title: "You’re a guest",
        text: "Our team runs the food and the floor. Someone else is watching the counters.",
      },
    ],
  },
  stories: {
    heading: "Weddings we’ve catered.",
    linkLabel: "See the work",
    items: [
      {
        // NEEDS CLIENT: name rights (event name and city taken from the photo folder "bangalore-wedding")
        folder: "bangalore-wedding",
        title: "A wedding in Bengaluru",
        brief: "[NEEDS CLIENT: the brief for the Bengaluru wedding]",
        whatWeMade:
          "A gold buffet built up in tiers, a chef finishing plates by hand, and dessert that arrived looking like it was grown.",
        // bangalore-wedding-04 is now the Weddings hero, so the story card uses the dessert frame.
        image: {
          src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-01.jpg`,
          alt: "Domed yellow desserts set into a bed of dried beans on a service tray.",
        },
      },
      {
        // NEEDS CLIENT: name rights (venue name taken from the photo folder "bayview-lawns-wedding";
        // the title avoids the venue until the client confirms it can be named)
        folder: "bayview-lawns-wedding",
        title: "An outdoor wedding",
        brief: "[NEEDS CLIENT: the brief for the Bayview Lawns wedding]",
        whatWeMade: BAYVIEW_LINE,
        image: {
          src: `${IMG}/1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-01.jpg`,
          alt: "An outdoor chai and ice-cream station in white and pale wood, framed by foliage.",
        },
      },
    ],
  },
  gallery: {
    heading: "At the counter and on the plate.",
    images: [
      {
        src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-01.jpg`,
        alt: "Domed yellow desserts set into a bed of dried beans on a service tray.",
      },
      {
        src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-03.jpg`,
        alt: "A chef finishing a plate with tweezers at a live counter.",
        note: "Crop from the shoulders down to hands, plate and garnish; keep the head out of frame.",
      },
      {
        src: `${IMG}/1-weddings/aurangabad-wedding/aurangabad-wedding-04.jpg`,
        alt: "Brass thalis laid out on a red cloth with printed menu scrolls beside each setting.",
      },
      {
        src: `${IMG}/1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-02.jpg`,
        alt: "Earthen pots and copper vessels arranged along a wooden counter with printed cards.",
      },
      {
        src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-02.jpg`,
        alt: "Necklaces on dark display busts, set among tartlets, crisps and grapes on a buffet.",
      },
    ],
  },
  otherServices: {
    label: "Other things we do",
  },
  plan: {
    heading: "Tell us about your wedding.",
    lead: "Even if it’s a year out and nothing is fixed yet.",
    cta: "Plan your event",
    presetService: "weddings",
  },
};

// ---------------------------------------------------------------------------
// Enquiry form (Plan your event). It must never claim to have sent when it cannot.
// ---------------------------------------------------------------------------

export const enquiryForm: EnquiryForm = {
  heading: "Plan your event",
  lead: "Send a brief, or just call.",
  fields: {
    name: { label: "Your name", required: true },
    phone: { label: "Phone", hint: "A phone number or an email is enough.", required: true },
    email: { label: "Email" },
    eventType: {
      label: "Type of event",
      required: true,
      options: services.map((s) => ({ value: s.enquiryValue, label: s.name })),
    },
    date: { label: "Date", hint: "A month or rough date is fine." },
    guests: {
      label: "Guests",
      options: [
        { value: "under-50", label: "Under 50" },
        { value: "50-150", label: "50-150" },
        { value: "150-300", label: "150-300" },
        { value: "300-600", label: "300-600" },
        { value: "600-plus", label: "600+" },
      ],
    },
    city: { label: "City" },
    brief: { label: "Anything we should know up front?" },
  },
  submit: "Send the brief",
  status: {
    sent: "Thank you. Your brief has reached us, and we’ll be in touch [NEEDS CLIENT: reply time].",
    cannotSend: `This preview cannot send yet. Please call ${PHONE} or email ${EMAIL}.`,
  },
};
