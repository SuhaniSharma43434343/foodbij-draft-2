import Link from "next/link";
import type { CSSProperties } from "react";
import { Close } from "@/components/Close";
import { Photo } from "@/components/Photo";
import { StoryCard } from "@/components/StoryCard";
import { home, PLAN_HREF, services, type Service } from "@/content/site";
import { storiesBySlug } from "@/content/stories";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  const { hero, food, story, work, close } = home;
  const recent = storiesBySlug(work.slugs);

  return (
    <>
      {/* 1. Opening: one photograph, one line, one action. */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <Photo img={hero.image} sizes="100vw" className="h-full w-full" preload />
        </div>
        <div className="hero-content">
          <div className="wrap grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 id="hero-title" className="t-display hero-in max-w-[14ch] lg:col-span-7 lg:max-w-[15ch]" style={d(450)}>
              {hero.headline}
            </h1>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
              <p className="t-lead hero-in max-w-[34ch] text-[var(--on-dark-2)]" style={d(650)}>
                {hero.lead}
              </p>
              <div className="hero-in mt-7" style={d(800)}>
                <Link href={PLAN_HREF} className="btn btn--light">
                  Plan your event <span className="arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services: four spreads, each composed differently. */}
      <section id="services" aria-labelledby="services-title" className="pt-[var(--section)]">
        <div className="wrap">
          <h2 id="services-title" className="t-h2" data-reveal="up">
            {home.servicesHeading}
          </h2>
        </div>

        <ServiceSpread service={services[0]} layout="portrait-left" />
        <ServiceSpread service={services[1]} layout="wide-right" />
        <ServiceSpread service={services[2]} layout="dark-bleed" />
        <ServiceSpread service={services[3]} layout="narrow-centre" />
      </section>

      {/* 3. Food: the photographs carry this section; the linen ground gives them a table to sit on. */}
      <section className="section mt-[var(--section)] bg-[var(--linen)]" aria-labelledby="food-title">
        <div className="wrap">
          <h2 id="food-title" className="t-h2 max-w-[14ch]" data-reveal="up">
            {food.heading}
          </h2>
        </div>

        {/* Phone: one large photograph, then a swipeable row. */}
        <div className="mt-10 lg:hidden">
          <Photo img={food.images[0]} ratio="4 / 3" sizes="100vw" drift />
          <ul className="strip mt-3" aria-label="More food photographs">
            {food.images.slice(1).map((im) => (
              <li key={im.src} className="w-[68vw] max-w-[320px]">
                <Photo img={im} ratio="4 / 5" sizes="68vw" reveal={false} />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: an asymmetric spread with varied proportions. */}
        <div className="wrap mt-16 hidden grid-cols-12 gap-x-8 gap-y-8 lg:grid">
          <Photo img={food.images[0]} ratio="3 / 2" sizes="58vw" className="col-span-7" drift />
          <Photo img={food.images[1]} ratio="1 / 1" sizes="30vw" className="col-span-4 col-start-9 self-end" delay={150} />
          <Photo img={food.images[2]} ratio="3 / 4" sizes="22vw" className="col-span-3 col-start-1 mt-8" />
          <Photo img={food.images[3]} ratio="3 / 2" sizes="40vw" className="col-span-5 col-start-5 mt-32" drift delay={120} />
          <Photo img={food.images[4]} ratio="3 / 4" sizes="22vw" className="col-span-3 col-start-10 mt-16" delay={240} />
        </div>
      </section>

      {/* 4. Our story, short: navy, the founders' own line, one paragraph, one link. */}
      <section className="on-dark section" aria-labelledby="story-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <h2 id="story-title" className="sr-only">
              Our story
            </h2>
            <blockquote data-reveal="up">
              <p className="t-h2 italic">“{story.quote}”</p>
              <footer className="t-meta mt-6 text-[var(--copper-soft)]">{story.quoteBy}</footer>
            </blockquote>
            <p className="muted mt-10 max-w-[44ch]" data-reveal="up" style={d(120)}>
              {story.body}
            </p>
            <Link href="/our-story" className="tlink mt-6" data-reveal="up" style={d(200)}>
              <span className="uline">Our story</span>
              <span className="arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:row-start-1">
            <Photo img={story.image} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 100vw" drift className="max-lg:mr-[18%]" />
          </div>
        </div>
      </section>

      {/* 5. Recent work: one story per service. */}
      <section className="section" aria-labelledby="work-title">
        <div className="wrap flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-title" className="t-h2" data-reveal="up">
            {work.heading}
          </h2>
          <Link href="/our-work" className="tlink" data-reveal="up">
            <span className="uline">See all work</span>
            <span className="arrow" aria-hidden="true" />
          </Link>
        </div>
        <ul className="strip mt-10 lg:hidden">
          {recent.map((s) => (
            <li key={s.slug} className="w-[72vw] max-w-[340px]">
              <StoryCard story={s} sizes="72vw" reveal={false} />
            </li>
          ))}
        </ul>
        <ul className="wrap mt-14 hidden grid-cols-4 gap-8 lg:grid">
          {recent.map((s, i) => (
            <li key={s.slug} className={i % 2 ? "mt-24" : ""}>
              <StoryCard story={s} sizes="22vw" delay={i * 90} />
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Plan your event. */}
      <Close heading={close.heading} lead={close.lead} image={close.image} />
    </>
  );
}

type Layout = "portrait-left" | "wide-right" | "dark-bleed" | "narrow-centre";

/** One service on the homepage: one photograph, the name, two lines, one link. */
function ServiceSpread({ service, layout }: { service: Service; layout: Layout }) {
  const text = (
    <div>
      <h3 className="t-h2" data-reveal="up">
        {service.name}
      </h3>
      <p className="muted mt-4 max-w-[38ch]" data-reveal="up" style={d(100)}>
        {service.blurb}
      </p>
      <Link href={service.href} className="tlink mt-5" data-reveal="up" style={d(180)}>
        <span className="uline">{service.linkLabel}</span>
        <span className="arrow" aria-hidden="true" />
      </Link>
    </div>
  );
  const image = (ratio: string, sizes: string, className = "") => (
    <Link href={service.href} tabIndex={-1} aria-hidden="true" className={`lift block ${className}`}>
      <Photo img={service.image} ratio={ratio} sizes={sizes} drift />
    </Link>
  );

  if (layout === "dark-bleed") {
    return (
      <div className="on-dark mt-24 py-16 lg:mt-40 lg:py-0">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
          {image("4 / 3", "(min-width: 1024px) 58vw, 100vw", "lg:col-span-7 lg:col-start-6 lg:row-start-1")}
          <div className="wrap mt-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:pl-[var(--gutter)] lg:pr-0">
            {text}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "portrait-left") {
    return (
      <div className="wrap mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
        {image("4 / 5", "(min-width: 1024px) 46vw, 100vw", "lg:col-span-6")}
        <div className="lg:col-span-4 lg:col-start-8 lg:pb-6">{text}</div>
      </div>
    );
  }

  if (layout === "wide-right") {
    return (
      <div className="mt-24 grid gap-10 lg:mt-40 lg:grid-cols-12 lg:gap-8">
        {image("3 / 2", "(min-width: 1024px) 62vw, 100vw", "lg:col-span-8 lg:col-start-5 lg:row-start-1")}
        <div className="wrap lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:pl-[var(--gutter)] lg:pr-0 lg:pt-4">{text}</div>
      </div>
    );
  }

  return (
    <div className="wrap mt-24 grid gap-10 lg:mt-40 lg:grid-cols-12 lg:items-center lg:gap-8">
      {image("3 / 4", "(min-width: 1024px) 30vw, 82vw", "mr-[18%] lg:col-span-4 lg:col-start-3 lg:mr-0")}
      <div className="lg:col-span-4 lg:col-start-8">{text}</div>
    </div>
  );
}
