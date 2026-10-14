// Homepage sketch (W1.4): a static, phone-first mockup for the owner's approval.
// Spec: docs/design/taste-spec.md; photos: docs/design/photo-picks.md; copy from the task brief.
import type { Metadata } from "next";
import Image from "next/image";
import { cormorant, jost } from "./_components/fonts";
import { SketchChrome } from "./_components/sketch-chrome";
import { NAVY, body, container, copperButton, sectionY, type } from "./_components/tokens";

export const metadata: Metadata = {
  title: "Home sketch | Foodbiz",
  robots: { index: false, follow: false },
};

const IMG = "/images";

const services = [
  {
    n: "01",
    name: "Weddings",
    text: "Sangeet, wedding day, reception. Live counters, the family dishes that must be there, and a team that runs the evening so your family gets to be guests.",
    link: "See weddings",
    src: `${IMG}/1-weddings/randive-wedding/randive-wedding-01.jpg`,
    w: 1602,
    h: 2400,
    alt: "A crescent-shaped gold canapé stand carried at shoulder height.",
  },
  {
    n: "02",
    name: "Celebrations & private dining",
    text: "Birthdays, children's parties, family functions and sit-down dinners at home. Food people of every age finish, served without fuss.",
    link: "See celebrations",
    src: `${IMG}/2-celebrations-private-dining/the-gummy-gourmet/the-gummy-gourmet-01.jpg`,
    w: 2400,
    h: 1800,
    alt: "A grazing board of breads and cured meats dressed with purple blooms.",
  },
  {
    n: "03",
    name: "Brand launches & live events",
    text: "Store openings, product reveals, brand days and concerts. Food that suits the brand, holds up under stage light and keeps pace with the crowd.",
    link: "See brand launches",
    src: `${IMG}/3-brand-launches-live-events/cartier/cartier-03.jpg`,
    w: 2400,
    h: 1600,
    alt: "Cocktails being built at a bar, coupes and shakers on the pass.",
  },
  {
    n: "04",
    name: "Corporate & office dining",
    text: "Daily meals for offices and campuses, and the functions in between. Minimal, clean and on time.",
    link: "See corporate dining",
    src: `${IMG}/4-corporate-office-dining/motilal-oswal/motilal-oswal-01.jpg`,
    w: 1800,
    h: 2400,
    alt: "Canapés arranged on tiered wooden boards at a window table with the city behind.",
  },
];

// Desktop placement for the asymmetric gallery grid (12 columns); phone is a swipe row.
const gallery = [
  {
    src: `${IMG}/1-weddings/bangalore-wedding/bangalore-wedding-01.jpg`,
    alt: "Domed yellow desserts set into a bed of dried beans on a service tray.",
    place: "lg:col-start-1 lg:col-span-7 lg:aspect-[4/3]",
    sizes: "(min-width: 1024px) 56vw, 78vw",
  },
  {
    src: `${IMG}/3-brand-launches-live-events/raymond-chairmans-lounge/raymond-chairmans-lounge-03.jpg`,
    alt: "Tiered white and black canapé trays dressed with white flowers.",
    place: "lg:col-start-9 lg:col-span-4 lg:aspect-[3/4] lg:mt-32",
    sizes: "(min-width: 1024px) 31vw, 78vw",
  },
  {
    src: `${IMG}/1-weddings/aurangabad-wedding/aurangabad-wedding-04.jpg`,
    alt: "Brass thalis laid out on a red cloth with printed menu scrolls beside each setting.",
    place: "lg:col-start-2 lg:col-span-5 lg:aspect-[3/2]",
    sizes: "(min-width: 1024px) 40vw, 78vw",
  },
  {
    src: `${IMG}/3-brand-launches-live-events/cartier/cartier-09.jpg`,
    alt: "A slate tray of canapés finished with fresh flowers.",
    place: "lg:col-start-8 lg:col-span-5 lg:aspect-[4/3] lg:mt-24",
    sizes: "(min-width: 1024px) 40vw, 78vw",
  },
  {
    src: `${IMG}/2-celebrations-private-dining/ninja/ninja-03.jpg`,
    alt: "Small pizzas decorated with olive and mozzarella faces on a wooden board.",
    place: "lg:col-start-1 lg:col-span-4 lg:aspect-[4/5]",
    sizes: "(min-width: 1024px) 31vw, 78vw",
  },
  {
    src: `${IMG}/3-brand-launches-live-events/cartier/cartier-08.jpg`,
    alt: "A gloved server presenting a slate of canapés.",
    place: "lg:col-start-6 lg:col-span-7 lg:aspect-[3/2] lg:mt-40",
    sizes: "(min-width: 1024px) 56vw, 78vw",
  },
];

const stories = [
  {
    service: "Brand launches & live events",
    title: "A supercar launch",
    line: "Red on red. The car was the centrepiece; we plated to it.",
    src: `${IMG}/3-brand-launches-live-events/ferrari/ferrari-02.jpg`,
    alt: "Canapés on a round board against a bright red wall.",
    // Sit low in the frame: the food matters, the brand mark on the wall does not.
    pos: "object-bottom",
  },
  {
    service: "Weddings",
    title: "An outdoor wedding",
    line: "Chai and ice cream outdoors, earthen pots along a wooden counter, and a live counter running late.",
    src: `${IMG}/1-weddings/bayview-lawns-wedding/bayview-lawns-wedding-01.jpg`,
    alt: "An outdoor chai and ice-cream station in white and pale wood, framed by foliage.",
  },
  {
    service: "Brand launches & live events",
    title: "An anime launch party",
    line: "A ramen counter cooking to order, with a queue in front of it all night.",
    src: `${IMG}/3-brand-launches-live-events/crunchyroll/crunchyroll-02.jpg`,
    alt: "A ramen counter with the kitchen team working behind it.",
  },
];

const footerCols = [
  {
    title: "Services",
    items: ["Weddings", "Celebrations & private dining", "Brand launches & live events", "Corporate & office dining"],
  },
  { title: "Foodbiz", items: ["Our work", "Our story", "Plan your event"] },
];

function Arrow() {
  return (
    <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M0 5h26M22 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function TextLink({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href="#"
      className={`group inline-flex min-h-11 items-center gap-3 ${dark ? "text-white" : "text-[#8F5523]"}`}
      style={type.button}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
        <Arrow />
      </span>
    </a>
  );
}

function Label({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={onDark ? "text-[#B87333]" : "text-[#8F5523]"} style={type.label}>
      {children}
    </p>
  );
}

export default function HomeSketch() {
  return (
    <div
      className={`${cormorant.variable} ${jost.variable} relative overflow-x-clip bg-white`}
      style={{ color: NAVY, fontFamily: "var(--font-sk-text)" }}
    >
      <SketchChrome />

      <main>
        {/* 2. Opening */}
        <section
          id="opening"
          aria-label="Opening"
          className="relative h-[100svh] min-h-[560px] bg-[#0B1C2D] text-white"
        >
          {/* Phone: the photo fills the top of the screen and fades into navy, so the text never sits on
              the busy tray. Desktop: full-bleed, with a soft left shade behind the text. */}
          <div className="absolute inset-x-0 top-0 bottom-[26%] lg:bottom-0">
            <Image
              src={`${IMG}/3-brand-launches-live-events/cartier/cartier-07.jpg`}
              alt="Tartlets dressed with edible flowers on a slate board."
              fill
              preload
              sizes="(orientation: portrait) 115vh, 100vw"
              className="object-cover object-[40%_50%] lg:object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,28,45,0.5)_0%,rgba(11,28,45,0)_20%,rgba(11,28,45,0)_36%,rgba(11,28,45,0.85)_58%,#0B1C2D_72%)] lg:bg-[linear-gradient(to_bottom,rgba(11,28,45,0.5)_0%,rgba(11,28,45,0)_22%,rgba(11,28,45,0)_40%,rgba(11,28,45,0.85)_100%),linear-gradient(to_right,rgba(11,28,45,0.7)_0%,rgba(11,28,45,0)_55%)]"
          />
          <div className={`${container} absolute inset-x-0 bottom-0 pb-14 lg:pb-24`}>
            <h1 className="max-w-[13ch]" style={type.displayXl}>
              We cook. We host. You enjoy your own event.
            </h1>
            <p className="mt-5 max-w-[34ch] lg:max-w-[44ch]" style={type.lead}>
              Catering and hospitality for weddings, celebrations, brand launches and offices in Mumbai.
            </p>
            <a href="#plan" className={`${copperButton} mt-8`} style={type.button}>
              Plan your event
            </a>
          </div>
        </section>

        {/* 3. Services */}
        <section aria-labelledby="services-title" className={sectionY}>
          <div className={container}>
            <Label>What we do</Label>
            <h2 id="services-title" className="mt-4" style={type.displayM}>
              Four ways we feed a room.
            </h2>

            <ol className="mt-12 flex flex-col gap-16 lg:mt-20 lg:gap-32">
              {services.map((s, i) => (
                <li key={s.n} className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-[6/5] ${
                      i % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1320px) 740px, (min-width: 1024px) 56vw, calc(100vw - 40px)"
                      className="object-cover"
                    />
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""}`}>
                    <p
                      className="text-[#B87333]"
                      style={{ fontFamily: "var(--font-sk-display)", fontWeight: 500, fontSize: "1.75rem", lineHeight: 1 }}
                    >
                      {s.n}
                    </p>
                    <h3 className="mt-3" style={type.displayM}>
                      {s.name}
                    </h3>
                    <p className={`${body} mt-4 text-[#0B1C2D]/72`}>{s.text}</p>
                    <div className="mt-4">
                      <TextLink>{s.link}</TextLink>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Food gallery */}
        <section aria-labelledby="food-title" className={`${sectionY} bg-[#0B1C2D] text-white`}>
          <div className={container}>
            <Label onDark>The food</Label>
            <h2 id="food-title" className="mt-4 max-w-[22ch]" style={type.displayM}>
              Food, service, presentation. In that order, every time.
            </h2>
          </div>
          <div className="mt-10 lg:mx-auto lg:mt-20 lg:max-w-[1320px] lg:px-12">
            <ul
              aria-label="Food photographs"
              className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 after:block after:w-2 after:shrink-0 after:content-[''] lg:grid lg:snap-none lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-16 lg:overflow-visible lg:px-0 lg:after:hidden"
            >
              {gallery.map((g) => (
                <li key={g.src} className={`relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden lg:w-auto ${g.place}`}>
                  <Image src={g.src} alt={g.alt} fill sizes={g.sizes} className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Our story, short */}
        <section aria-labelledby="story-title" className={sectionY}>
          <div className={`${container} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-12`}>
            <div className="lg:col-span-5">
              <Label>Our story</Label>
              <h2 id="story-title" className="mt-4" style={{ ...type.displayM, fontStyle: "italic" }}>
                We&rsquo;re not just in the business of food. We&rsquo;re in the business of food and experience.
              </h2>
              <p className="mt-4 text-[14px] leading-[1.5] text-[#0B1C2D]/72">Amar Jog and Kushal Shetty, founders</p>
              <p className={`${body} mt-8`}>
                Foodbiz is a catering and hospitality company in Mumbai. Our promise is simple: leave the stress to us,
                and be present at your own event.
              </p>
              <div className="mt-4">
                <TextLink>Read our story</TextLink>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Image
                src={`${IMG}/3-brand-launches-live-events/essentia/essentia-01.jpg`}
                alt="Four servers standing with trays before a store opening."
                width={1554}
                height={1012}
                sizes="(min-width: 1320px) 630px, (min-width: 1024px) 48vw, calc(100vw - 40px)"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* 6. Event stories */}
        <section aria-labelledby="work-title" className={`${sectionY} bg-[#F4F1EC]`}>
          <div className={container}>
            <Label>Our work</Label>
            <h2 id="work-title" className="mt-4" style={type.displayM}>
              Every event starts with a brief.
            </h2>
            <ul className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-3 lg:gap-12">
              {stories.map((s) => (
                <li key={s.title}>
                  <a href="#" className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 1320px) 400px, (min-width: 1024px) 30vw, calc(100vw - 40px)"
                        className={`object-cover ${"pos" in s ? s.pos : ""} transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                      />
                    </div>
                    <div className="mt-5">
                      <Label>{s.service}</Label>
                    </div>
                    <h3 className="mt-2" style={{ ...type.displayM, fontSize: "1.5rem", lineHeight: 1.2 }}>
                      {s.title}
                    </h3>
                    <p className={`${body} mt-2 text-[#0B1C2D]/72`}>{s.line}</p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 lg:mt-14">
              <TextLink>See all our work</TextLink>
            </div>
          </div>
        </section>

        {/* 7. Closing band */}
        <section id="plan" aria-labelledby="plan-title" className={`${sectionY} scroll-mt-0 bg-[#0B1C2D] text-white`}>
          <div className={container}>
            <h2 id="plan-title" className="max-w-[16ch] lg:max-w-none" style={type.displayL}>
              Tell us about your event.
            </h2>
            <p className="mt-5 max-w-[40ch] text-white/80" style={type.lead}>
              A date, a rough guest count and the kind of event is enough to start.
            </p>
            <a href="#" className={`${copperButton} mt-8`} style={type.button}>
              Plan your event
            </a>
            <p className="mt-5 text-[14px] leading-[1.5] text-white/72">Or call [NEEDS CLIENT: phone]</p>
          </div>
        </section>
      </main>

      {/* 8. Footer (extra bottom padding below 1024px so the sticky bar never covers it) */}
      <footer className="border-t border-white/12 bg-[#0B1C2D] pb-[84px] text-white lg:pb-10">
        <div className={`${container} pt-16 lg:pt-24`}>
          <Image
            src="/logos/foodbiz-2026-white-1200w.png"
            alt="Foodbiz"
            width={1200}
            height={274}
            sizes="(min-width: 1024px) 170px, 132px"
            className="h-auto w-[132px] lg:w-[170px]"
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {footerCols.map((col) => (
              <div key={col.title} className="lg:col-span-4">
                <Label onDark>{col.title}</Label>
                <ul className="mt-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href={item === "Plan your event" ? "#plan" : "#"}
                        className="inline-flex min-h-11 items-center text-[16px] text-white/80 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-4">
              <Label onDark>Contact</Label>
              <ul className="mt-3 text-[16px] leading-[1.6] text-white/80">
                <li className="py-[10px]">[NEEDS CLIENT: address]</li>
                <li className="py-[10px]">[NEEDS CLIENT: email]</li>
                <li>
                  <a href="#" className="inline-flex min-h-11 items-center hover:text-white">
                    Instagram @foodbizcatering
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p
            className="mt-16 text-white/90"
            style={{ fontFamily: "var(--font-sk-display)", fontWeight: 500, fontStyle: "italic", fontSize: "1.5rem", lineHeight: 1.2 }}
          >
            Made for hosts who&rsquo;d rather be present.
          </p>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/12 pt-6 text-[14px] text-white/72 lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; Foodies Hospitality. All rights reserved.</p>
            <ul className="flex gap-6">
              <li>
                <a href="#" className="inline-flex min-h-11 items-center hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex min-h-11 items-center hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
