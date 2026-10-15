// Our story, Plan your event, Privacy and Terms.
// Our story uses only what the pack confirms: the company, the founders' names, their own lines
// ("food and experience", "leave the stress to us, be present", honest and transparent) and how they take a brief.
// Legal pages adapt the KEEP-ADAPT drafts in CONTENT-EXPORT.md s8 to what this preview actually does.

import { photos, services, site } from "./site";

const { email, address } = site.contact;

export const ourStory = {
  meta: {
    title: "Our story",
    description: "Foodbiz is a catering and hospitality company in Mumbai, founded by Amar Jog and Kushal Shetty.",
  },
  heading: "Food, and the evening around it.",
  intro: [
    "Foodbiz is a catering and hospitality company in Mumbai, founded by Amar Jog and Kushal Shetty. The company behind it is Foodies Hospitality.",
    "We cook for weddings, for celebrations at home, for brand launches and live events, and for offices. The menus cover regional Indian and traditional cooking, global and contemporary food, and live counters where the event wants them.",
  ],
  image: photos.cartierBar,
  quote: "We’re not just in the business of food. We’re in the business of food and experience.",
  quoteBy: "Amar Jog and Kushal Shetty, founders",
  beliefs: {
    heading: "What we hold to",
    items: [
      { title: "The host gets to enjoy it.", text: "Leave the stress to us, and be present at your own event." },
      { title: "Food and experience.", text: "How it is served, when, by whom, and how it feels to be a guest in the room." },
      { title: "Honest about cost.", text: "You should know what you are paying for and why." },
      { title: "Say what the food is.", text: "Name the dish and the region. The plate does the rest." },
    ],
  },
  founders: {
    heading: "Founders",
    people: ["Amar Jog", "Kushal Shetty"],
    note: "[NEEDS CLIENT: a line on each founder, and photographs if they want them]",
  },
  brief: {
    heading: "How we take a brief",
    steps: [
      { title: "You tell us the occasion", text: "What it’s for, who’s coming, and roughly when and where." },
      { title: "We ask about the people", text: "What your guests eat, the dishes that have to be there, and the dietary needs in the room." },
      { title: "We write the food and the service", text: "A menu, the counters and the team, built for this brief and agreed with you." },
      { title: "We run it", text: "On the day our team looks after the food and the floor, so you can be a guest." },
    ],
  },
  close: { heading: "Tell us what you are planning.", lead: "A date, a rough guest count and the kind of event is enough to start." },
};

export const eventTypeOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "not-sure", label: "Not sure yet" },
];

export const guestOptions = ["Under 50", "50 to 150", "150 to 300", "300 to 600", "More than 600", "Not sure yet"];

export const planPage = {
  meta: {
    title: "Plan your event",
    description: "Tell Foodbiz about your event: what kind, roughly when, and roughly how many guests.",
  },
  heading: "Plan your event",
  lead: "Tell us what you have in mind. A rough date and guest count is enough to start.",
  // The form has no backend yet (no sending domain or inbox confirmed), so it never pretends to send.
  notSent: {
    heading: "Your brief is ready, but this preview cannot send it yet.",
    body: `Nothing has been sent. Copy your brief and send it to us at ${email}, or call ${site.contact.phone}.`,
  },
};

const UPDATED = "[NEEDS CLIENT: date of legal review]";
const DRAFT = "Draft for review by Foodbiz’s counsel before launch. Not legal advice.";

export type LegalPage = {
  meta: { title: string; description: string };
  heading: string;
  updated: string;
  draft: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const privacy: LegalPage = {
  meta: { title: "Privacy", description: "What the Foodbiz website collects, and what we do with it." },
  heading: "Privacy",
  updated: UPDATED,
  draft: DRAFT,
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "The enquiry form on this preview does not send or store anything. What you type stays in your browser and is gone when you leave the page.",
        "When the form does send, we will collect only what you type into it: your name, phone number, email address, the kind of event, the date, a rough guest count, the city and your notes.",
      ],
    },
    {
      heading: "What we will do with it",
      paragraphs: ["We will use it to reply to you, and to quote for and plan your event. We will not sell it or pass it to anyone outside Foodbiz."],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "For as long as we are talking to you about your event, and for our own records afterwards. [NEEDS CLIENT: retention period]. Ask us to delete your enquiry and we will.",
      ],
    },
    {
      heading: "Cookies and tracking",
      paragraphs: [
        "This site sets no cookies and runs no advertising or analytics scripts. The company that hosts it keeps standard server logs, which include IP addresses, for security and reliability.",
      ],
    },
    {
      heading: "Photographs",
      paragraphs: [`The photographs on this site are from events we have catered. If you appear in one and would rather not, write to us at ${email} and we will take it down.`],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about any of this, or a request to see or delete what we hold: ${email}.`],
    },
  ],
};

export const terms: LegalPage = {
  meta: { title: "Terms", description: "The terms for using the Foodbiz website." },
  heading: "Terms",
  updated: UPDATED,
  draft: DRAFT,
  sections: [
    { heading: "About this site", paragraphs: [`This site is published by Foodies Hospitality, trading as Foodbiz, of ${address}.`] },
    {
      heading: "What is on it",
      paragraphs: [
        "The pages describe the kind of work we do. They are not a quote or an offer. Menus, prices and availability are agreed in writing for each event.",
      ],
    },
    {
      heading: "Sending a brief",
      paragraphs: [
        "The enquiry form on this preview cannot send yet. Once it can, sending a brief starts a conversation. It does not create a booking or hold a date. A booking exists once we have both confirmed it in writing.",
      ],
    },
    {
      heading: "Photographs and names",
      paragraphs: [
        "The photographs, text and marks on this site belong to Foodies Hospitality or to the clients concerned. Third-party names and marks remain the property of their owners.",
      ],
    },
    { heading: "Governing law", paragraphs: ["[NEEDS CLIENT: governing law and jurisdiction, to be confirmed by counsel]"] },
  ],
};
