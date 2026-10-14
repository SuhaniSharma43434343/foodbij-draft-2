// Site copy for the Home page and the Weddings service page (W2.3).
// Starting point: the approved homepage sketch (src/app/sketch/page.tsx), checked against
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
  strapline: string;
  nav: NavItem[];
  headerCta: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    instagram: { handle: string; url: string };
  };
  footer: { closer: string; copyright: string; legal: NavItem[] };
};

export type Home = {
  opening: { headline: string; lead: string; cta: string; image: Img };
  servicesIntro: { label: string; heading: string };
  food: { label: string; heading: string; images: Img[] };
  storyShort: {
    label: string;
    quote: string;
    quoteBy: string;
    body: string;
    linkLabel: string;
    image: Img;
  };
  stories: { label: string; heading: string; linkLabel: string; items: StoryCard[] };
  plan: { heading: string; lead: string; cta: string; phoneLine: string };
};

/** A homepage event card: photo, service label, title and the brief in one line. */
export type StoryCard = {
  /** Service label shown above the title (one of the four service names). */
  service: string;
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
  whatWeDo: { label: string; heading: string; formats: Format[] };
  howItWorks: { label: string; heading: string; steps: Step[] };
  stories: { label: string; heading: string; items: EventStory[]; linkLabel: string };
  gallery: { label: string; heading: string; images: Img[] };
  otherServices: { label: string };
  plan: { heading: string; lead: string; cta: string; phoneLine: string; presetService: ServiceSlug };
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
  strapline: "Catering & hospitality | Mumbai",
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
    closer: "Made for hosts who’d rather be present.",
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
    heroImage: {
      src: `${IMG}/1-weddings/randive-wedding/randive-wedding-01.jpg`,
      alt: "A crescent-shaped gold canapé stand carried at shoulder height.",
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
    lead: "Catering and hospitality for weddings, celebrations, brand launches and offices in Mumbai.",
    cta: "Plan your event",
    image: {
      src: `${IMG}/3-brand-launches-live-events/cartier/cartier-07.jpg`,
      alt: "Tartlets dressed with edible flowers on a slate board.",
      note: "Still until a plating loop exists. Crops to portrait on phone; tray sits centre-left.",
    },
  },
  servicesIntro: {
    label: "What we do",
    heading: "Four ways we feed a room.",
  },
  food: {
    label: "The food",
    heading: "Food, service, presentation. In that order, every time.",
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
  storyShort: {
    label: "Our story",
    quote: "We’re not just in the business of food. We’re in the business of food and experience.",
    quoteBy: "Amar Jog and Kushal Shetty, founders",
    body: "Foodbiz is a catering and hospitality company in Mumbai. Our promise is simple: leave the stress to us, and be present at your own event.",
    linkLabel: "Read our story",
    image: {
      src: `${IMG}/3-brand-launches-live-events/essentia/essentia-01.jpg`,
      alt: "Two servers in black holding wooden trays of small bites, in a dark panelled room.",
    },
  },
  stories: {
    label: "Our work",
    heading: "Every event starts with a brief.",
    linkLabel: "See the work",
    // NEEDS CLIENT: name rights + briefs for these events (event names come from the photo folders;
    // titles stay generic and no client logo shows until the client confirms).
    items: [
      {
        service: "Brand launches & live events",
        title: "A music festival",
        line: "Service that had to run to the set times, not the other way round.",
        image: {
          src: `${IMG}/3-brand-launches-live-events/rolling-loud/rolling-loud-02.jpg`,
          alt: "A long buffet counter lit by lamps against a black backdrop.",
        },
        href: "/our-work/music-festival",
      },
      {
        service: "Weddings",
        title: "An outdoor wedding",
        line: BAYVIEW_LINE,
        image: {
          src: `${IMG}/1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-01.jpg`,
          alt: "An outdoor chai and ice-cream station in white and pale wood, framed by foliage.",
        },
        href: "/our-work/outdoor-wedding",
      },
      {
        service: "Brand launches & live events",
        title: "An anime launch party",
        line: "A ramen counter cooking to order, with a queue in front of it all night.",
        image: {
          src: `${IMG}/3-brand-launches-live-events/crunchyroll/crunchyroll-02.jpg`,
          alt: "A ramen counter with the kitchen team working behind it.",
        },
        href: "/our-work/anime-launch-party",
      },
    ],
  },
  plan: {
    heading: "Tell us about your event.",
    lead: "A date, a rough guest count and the kind of event is enough to start.",
    cta: "Plan your event",
    phoneLine: `Or call ${PHONE}`,
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
    label: "What we do",
    heading:
      "Weddings are the hardest catering there is. Not because of the food, but because of everyone the food has to mean something to.",
    formats: [
      {
        title: "Sangeet and mehendi",
        text: "Long evenings and people eating on their feet. Small plates that work in one hand, and counters that stay open as long as the dancing.",
      },
      {
        title: "Wedding day",
        text: "The ceremony sets the clock, and the food follows it. The family dishes that have to be there go on the menu first; we build the rest around them.",
      },
      {
        title: "Reception",
        text: "A different crowd and a different mood. Plated, a buffet or a thali service, with a floor team that keeps the evening moving.",
      },
      {
        title: "Live counters",
        text: "A live dosa counter, a wok cooking to order, chai poured fresh. Something happening at the counter gives guests a reason to walk over.",
      },
    ],
  },
  howItWorks: {
    label: "How it works",
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
    label: "Our work",
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
        image: {
          src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-04.jpg`,
          alt: "A tiered gold buffet structure lit by a row of brass lamps.",
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
    label: "The food",
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
    phoneLine: `Or call ${PHONE}`,
    presetService: "weddings",
  },
};

// ---------------------------------------------------------------------------
// Enquiry form (Plan your event). It must never claim to have sent when it cannot.
// ---------------------------------------------------------------------------

export const enquiryForm: EnquiryForm = {
  heading: "Plan your event",
  lead: "Send a brief, or just call. Both work.",
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
      hint: "A range works.",
      options: [
        { value: "under-50", label: "Under 50" },
        { value: "50-150", label: "50-150" },
        { value: "150-300", label: "150-300" },
        { value: "300-600", label: "300-600" },
        { value: "600-plus", label: "600+" },
      ],
    },
    city: { label: "City", hint: "Where the event is." },
    brief: {
      label: "Anything we should know up front?",
      hint: "Optional. The occasion, the dishes that have to be there, any dietary needs.",
    },
  },
  submit: "Send the brief",
  status: {
    sent: "Thank you. Your brief has reached us, and we’ll be in touch [NEEDS CLIENT: reply time].",
    cannotSend: `This preview cannot send yet. Please call ${PHONE} or email ${EMAIL}.`,
  },
};
