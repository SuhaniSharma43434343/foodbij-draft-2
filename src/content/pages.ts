// Copy for Our story, Plan your event, Privacy and Terms (W4.3).
// Sources: docs/brief/01-BRIEF.md s6, docs/brief/ABOUT-FOODBIZ.md, docs/brief/CONTENT-EXPORT.md
// s5 (About, KEEP-ADAPT), s7 (Contact and brief form, KEEP-ADAPT) and s8 (legal drafts,
// KEEP-ADAPT + NEEDS-CLIENT). Checked against docs/brief/VOICE.md.
//
// [NEEDS CLIENT] items used in this file (collect into NOTES.md):
//   1. [NEEDS CLIENT: phone], [NEEDS CLIENT: whatsapp], [NEEDS CLIENT: email],
//      [NEEDS CLIENT: address]          - from site.contact (plan page, legal pages)
//   2. [NEEDS CLIENT: founder bios]     - ourStory.founders (who does what is not confirmed)
//   3. [NEEDS CLIENT: date of legal review] - privacy/terms "Updated" line
//   4. Legal drafts must be read by Foodbiz's counsel before launch (shown on both pages).
// Left out on purpose (CONTENT-EXPORT s5, s6, s7, s9): "most clients come from recommendations",
// the brand count, the front/back-of-house split between the founders, "Amar picks up", any reply
// time, years, numbers and client names.

import { enquiryForm, site, type Img, type Option, type Step } from "./site";

const IMG = "/images";
const { phone, whatsapp, email, address } = site.contact;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PageMeta = { title: string; description: string };

export type PlanBandCopy = { heading: string; lead: string; cta: string; phoneLine: string };

/** A photo with its crop: `position` is the CSS object-position, `zoom` enlarges it in its frame. */
export type CroppedImg = Img & { position?: string; zoom?: number };

export type OurStory = {
  meta: PageMeta;
  intro: { label: string; heading: string; paragraphs: string[] };
  image: CroppedImg;
  quote: { text: string; by: string };
  beliefs: { label: string; heading: string; items: { title: string; text: string }[] };
  founders: {
    label: string;
    heading: string;
    people: { name: string; role: string }[];
    /** Shown in place of bios until the founders confirm them. */
    bioNote: string;
  };
  brief: { label: string; heading: string; steps: Step[]; image: CroppedImg };
  plan: PlanBandCopy;
};

export type ContactLine = { label: string; value: string; href?: string };

export type PlanPage = {
  meta: PageMeta;
  label: string;
  heading: string;
  lead: string;
  body: string;
  contact: { label: string; lines: ContactLine[] };
  form: {
    /** Visually hidden heading for the form region. */
    heading: string;
    requiredWord: string;
    contactGroup: { legend: string; marker: string; hint: string };
    eventTypeOptions: Option[];
    guestsPlaceholder: string;
    eventTypePlaceholder: string;
    errors: {
      name: string;
      contact: string;
      email: string;
      phone: string;
      eventType: string;
      summary: string;
    };
    status: { heading: string; message: string; kept: string };
  };
};

export type LegalSection = { heading: string; paragraphs: string[] };

export type LegalPage = {
  meta: PageMeta;
  heading: string;
  updated: string;
  draftNote: string;
  sections: LegalSection[];
};

// ---------------------------------------------------------------------------
// Our story (01-BRIEF.md s6 "Our story"; CONTENT-EXPORT s5)
// ---------------------------------------------------------------------------

export const ourStory: OurStory = {
  meta: {
    title: "Our story",
    description:
      "Foodbiz is a catering and hospitality company in Mumbai, founded by Amar Jog and Kushal Shetty. Leave the stress to us, and be present at your own event.",
  },
  intro: {
    label: "Our story",
    heading: "Food, and the evening around it.",
    paragraphs: [
      "Foodbiz is a catering and hospitality company in Mumbai, founded by Amar Jog and Kushal Shetty. The company behind it is Foodies Hospitality.",
      "We cook for weddings, for celebrations at home, for brand launches and live events, and for offices. Each asks for a different kind of attention.",
      "What doesn’t change is the promise underneath: leave the stress to us, and be present at your own event.",
    ],
  },
  image: {
    src: `${IMG}/3-brand-launches-live-events/essentia/essentia-01.jpg`,
    alt: "Two servers in black holding wooden trays of small bites.",
    note: "Cropped to the two servers on the left so the lettering on the wall stays out of frame.",
    position: "0% 40%",
    zoom: 1.5,
  },
  quote: {
    text: "We’re not just in the business of food. We’re in the business of food and experience.",
    by: "Amar Jog and Kushal Shetty, founders",
  },
  beliefs: {
    label: "What we hold to",
    heading: "Four things we don’t bend on.",
    items: [
      {
        title: "Food and experience, not food alone.",
        text: "How it’s served, when, by whom, and how it feels to be a guest in the room matter as much as what’s on the plate.",
      },
      {
        title: "Be clear about what things cost.",
        text: "You should know what you’re paying for and why. No line items that only make sense to us.",
      },
      {
        title: "The host should get to enjoy it.",
        text: "If you spend your own event managing your own event, we haven’t done our job.",
      },
      {
        title: "Say what the food is.",
        text: "Name the dish, the region, the cook. Heritage comes through on the plate, not in the adjectives around it.",
      },
    ],
  },
  founders: {
    label: "The founders",
    heading: "The people behind it.",
    people: [
      { name: "Amar Jog", role: "Co-founder" },
      { name: "Kushal “Kush” Shetty", role: "Co-founder" },
    ],
    bioNote: "[NEEDS CLIENT: founder bios]",
  },
  brief: {
    label: "How we take a brief",
    heading: "It starts with what the event is for.",
    steps: [
      {
        title: "You tell us the occasion",
        text: "What it’s for, who’s coming, and roughly when and where. A rough idea is enough to start.",
      },
      {
        title: "We ask about the people",
        text: "What your guests eat, the dishes that have to be there, and the dietary needs in the room.",
      },
      {
        title: "We write the food and the service",
        text: "A menu, the counters and the team, built for this brief and agreed with you in writing.",
      },
      {
        title: "We run it, you’re present",
        text: "On the day our team looks after the food and the floor, so you can be a guest.",
      },
    ],
    image: {
      src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-03.jpg`,
      alt: "A chef lifting noodles onto a plate at a live counter.",
      note: "Cropped from below the chef's chin: hands, plate and counter only, no toque.",
      position: "50% 100%",
    },
  },
  plan: {
    heading: "Tell us about your event.",
    lead: "A date, a rough guest count and the kind of event is enough to start.",
    cta: "Plan your event",
    phoneLine: `Or call ${phone}`,
  },
};

// ---------------------------------------------------------------------------
// Plan your event (01-BRIEF.md s6; CONTENT-EXPORT s7). Field labels come from `enquiryForm`.
// ---------------------------------------------------------------------------

export const planPage: PlanPage = {
  meta: {
    title: "Plan your event",
    description: "Tell Foodbiz about your event: the kind of event, roughly when, and roughly how many guests.",
  },
  label: enquiryForm.heading,
  heading: "Tell us about your event.",
  lead: enquiryForm.lead,
  body: "The kind of event, roughly when and roughly how many is enough to start. Nothing needs to be fixed yet.",
  contact: {
    label: "Or get in touch",
    lines: [
      { label: "Phone", value: phone },
      { label: "WhatsApp", value: whatsapp },
      { label: "Email", value: email },
      { label: "Instagram", value: site.contact.instagram.handle, href: site.contact.instagram.url },
    ],
  },
  form: {
    heading: "Your brief",
    requiredWord: "Required",
    contactGroup: {
      legend: "How we reply",
      marker: "One of the two",
      hint: enquiryForm.fields.phone.hint ?? "A phone number or an email is enough.",
    },
    eventTypeOptions: [
      ...enquiryForm.fields.eventType.options,
      { value: "not-sure", label: "Not sure yet" },
    ],
    eventTypePlaceholder: "Choose one",
    guestsPlaceholder: "Choose a range",
    errors: {
      name: "Please add your name.",
      contact: "Please add a phone number or an email, so we can reply.",
      email: "That email address looks incomplete.",
      phone: "That phone number looks too short.",
      eventType: "Please choose a type of event, or “Not sure yet”.",
      summary: "A few things need a look before this can go.",
    },
    status: {
      heading: "Not sent",
      message: enquiryForm.status.cannotSend,
      kept: "Everything you typed is still in the form.",
    },
  },
};

// ---------------------------------------------------------------------------
// Legal drafts (CONTENT-EXPORT s8, adapted to what this preview actually does)
// ---------------------------------------------------------------------------

const UPDATED = "Updated: [NEEDS CLIENT: date of legal review]";
const DRAFT_NOTE = "Draft - to be reviewed by Foodbiz’s counsel before launch.";

export const privacy: LegalPage = {
  meta: {
    title: "Privacy",
    description: "What the Foodbiz website collects, and what we do with it.",
  },
  heading: "Privacy",
  updated: UPDATED,
  draftNote: DRAFT_NOTE,
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "The enquiry form on this preview does not send or store anything yet. What you type stays in your browser and is gone when you leave the page.",
        "When the form does send, this is what we will collect: only what you type into it. That is the kind of event, when and where it is, a rough guest count, your name, a phone number or email address, and any notes you add. There is no account to create and no profile behind the scenes.",
      ],
    },
    {
      heading: "What we will do with it",
      paragraphs: [
        "We will use it to reply to you, and to quote for and plan your event. We won’t sell it, rent it, or pass it to anyone outside Foodbiz.",
      ],
    },
    {
      heading: "How long we will keep it",
      paragraphs: [
        "For as long as we’re talking to you about your event, and for our own records afterwards. Ask us to delete your enquiry and we will.",
      ],
    },
    {
      heading: "Cookies and tracking",
      paragraphs: [
        "This site sets no cookies and runs no advertising or tracking scripts. The company that hosts it keeps standard server logs, which include IP addresses, for security and reliability.",
      ],
    },
    {
      heading: "Photographs",
      paragraphs: [
        `The photographs on this site are from events we’ve catered. If you appear in one and would rather not, write to us at ${email} and we’ll take it down.`,
      ],
    },
    {
      heading: "Getting in touch",
      paragraphs: [`Questions about any of this, or a request to see or delete what we hold: ${email}.`],
    },
  ],
};

export const terms: LegalPage = {
  meta: {
    title: "Terms",
    description: "The terms for using the Foodbiz website.",
  },
  heading: "Terms",
  updated: UPDATED,
  draftNote: DRAFT_NOTE,
  sections: [
    {
      heading: "About this site",
      paragraphs: [`This site is published by Foodies Hospitality, trading as Foodbiz, of ${address}.`],
    },
    {
      heading: "What’s on it",
      paragraphs: [
        "The pages describe the kind of work we do. They aren’t a quote or an offer. Menus, prices, availability and what we can deliver are agreed in writing for each event.",
      ],
    },
    {
      heading: "Sending a brief",
      paragraphs: [
        "The enquiry form on this preview cannot send yet. Once it can, sending a brief starts a conversation. It doesn’t create a booking, and it doesn’t hold a date. A booking exists once we’ve both confirmed it in writing.",
      ],
    },
    {
      heading: "Photographs and marks",
      paragraphs: [
        "The photographs, text and brand marks on this site belong to Foodies Hospitality or to the clients concerned. Third-party names and marks appear to identify work we’ve catered and remain the property of their owners.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: ["These terms are governed by the laws of India, and the courts at Mumbai have jurisdiction."],
    },
  ],
};
