import Link from "next/link";
import type { CSSProperties } from "react";
import { Photo } from "@/components/Photo";
import { RevealText } from "@/components/RevealText";
import { StoryCard } from "@/components/StoryCard";
import { WorkStrip } from "@/components/WorkStrip";
import { servicePages } from "@/content/services";
import { home, PLAN_HREF, photos, services } from "@/content/site";
import { storiesBySlug } from "@/content/stories";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const [weddings, celebrations, launches, corporate] = services;

function More({ href, label, dark }: { href: string; label: string; dark?: boolean }) {
  return (
    <Link href={href} className={`tlink ${dark ? "text-white" : ""}`}>
      <span className="uline">{label}</span>
      <span className="arrow" aria-hidden="true" />
    </Link>
  );
}

export default function HomePage() {
  const { hero, story, work, close } = home;
  const recent = storiesBySlug(work.slugs);
  // Story cards skip any photo the homepage already shows.
  const shown = new Set<string>([
    hero.image.src,
    photos.cartierFlowers.src,
    photos.bangaloreBuffet.src,
    photos.bayviewPots.src,
    photos.glasshouseBoards.src,
    photos.ninjaOranges.src,
    photos.cartierCarried.src,
    photos.netflixTeam.src,
  ]);

  return (
    <>
      {/* ── 1. Opening: one cinematic photograph, oversized type, one action. */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <Photo img={hero.image} sizes="100vw" className="h-full w-full" preload />
        </div>
        <div className="hero-content">
          <div className="wrap">
            <RevealText
              as="h1"
              id="hero-title"
              text={hero.headline}
              trigger="load"
              delay={350}
              className="t-mega max-w-[11ch]"
            />
            <div className="mt-7 lg:mt-10">
              <p className="t-lead hero-in max-w-[34ch] text-[var(--on-dark-2)]" style={d(900)}>
                {hero.lead}
              </p>
              <div className="hero-in mt-7" style={d(1050)}>
                <Link href={PLAN_HREF} className="btn btn--light">
                  Plan your event <span className="arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Introduction: a typographic statement, one photograph rising out of the hero, the four services as an index. */}
      <section aria-labelledby="intro-title" className="relative pb-[var(--section)]">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 -mt-8 w-[46%] justify-self-end lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:-mt-48 lg:w-full">
            <Photo img={photos.cartierFlowers} ratio="4 / 5" sizes="(min-width: 1024px) 30vw, 52vw" className="inset-frame hero-inset" reveal={false} eager />
          </div>
          <div className="lg:col-span-7 lg:row-start-1 lg:pt-28">
            <span className="copper-rule" aria-hidden="true" />
            <RevealText id="intro-title" text="Food, and the hosting around it." className="t-big mt-8 max-w-[12ch]" />
            <p className="t-lead muted mt-8 max-w-[44ch]" data-reveal="up" style={d(200)}>
              Foodbiz is a catering and hospitality company in Mumbai. We plan the menu, run the counters and look after the
              floor, so the people hosting can be guests.
            </p>
          </div>
        </div>

        <nav aria-label="Services" className="wrap mt-16 lg:mt-24">
          <ul>
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={s.href} className="svc-row" data-reveal="up" style={d(i * 70)}>
                  <span className="grid gap-1 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                    <span className="svc-name t-h2 lg:col-span-6">{s.name}</span>
                    <span className="muted max-w-[42ch] text-[0.9375rem] lg:col-span-5 lg:col-start-7 lg:text-base">{s.blurb}</span>
                  </span>
                  <span className="arrow" aria-hidden="true" />
                  <span className="svc-thumb hidden lg:block" aria-hidden="true">
                    <Photo img={s.image} ratio="4 / 3" sizes="132px" reveal={false} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ── 3a. Weddings: warm and rich. A full-height gold photograph, the name set large on navy. */}
      <section className="on-dark relative overflow-hidden" aria-labelledby="ch-weddings">
        <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Photo img={photos.bangaloreBuffet} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] lg:aspect-auto lg:h-full" drift />
          </div>
          <div className="wrap relative flex flex-col justify-center py-16 lg:col-span-6 lg:py-32 lg:pl-16">
            <RevealText id="ch-weddings" text={weddings.name} className="t-mega" />
            <p className="t-lead mt-8 max-w-[30ch] text-[var(--on-dark-2)]" data-reveal="up" style={d(150)}>
              {weddings.blurb}
            </p>
            <div className="mt-8" data-reveal="up" style={d(250)}>
              <More href={weddings.href} label={weddings.linkLabel} dark />
            </div>
            <div className="mt-14 hidden w-[46%] self-end lg:block">
              <Photo img={photos.bayviewPots} ratio="3 / 4" sizes="22vw" delay={200} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3b. Celebrations: intimate. Linen ground, a tall photograph with a second one set into its corner. */}
      <section className="bg-[var(--linen)] py-[var(--section)]" style={{ "--inset-bg": "var(--linen)" } as CSSProperties} aria-labelledby="ch-celebrations">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <Photo img={photos.glasshouseBoards} ratio="4 / 5" sizes="(min-width: 1024px) 46vw, 88vw" drift className="mr-[12%] lg:mr-0" />
            <div className="absolute -bottom-10 right-0 w-[44%] lg:-bottom-16 lg:-left-[18%] lg:right-auto lg:w-[42%]">
              <Photo img={photos.ninjaOranges} ratio="3 / 4" sizes="(min-width: 1024px) 20vw, 40vw" className="inset-frame" delay={250} />
            </div>
          </div>
          <div className="pt-6 lg:col-span-5 lg:row-start-1 lg:pt-0">
            <RevealText id="ch-celebrations" text={celebrations.name} className="t-big lg:max-w-[10ch]" />
            <p className="t-lead muted mt-8 max-w-[32ch]" data-reveal="up" style={d(150)}>
              {celebrations.blurb}
            </p>
            <div className="mt-8" data-reveal="up" style={d(250)}>
              <More href={celebrations.href} label={celebrations.linkLabel} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3c. Brand launches: energy and scale. Navy, the name across the page, three photographs at three sizes. */}
      <section className="on-dark overflow-hidden py-[var(--section)]" aria-labelledby="ch-launches">
        <div className="wrap">
          <RevealText id="ch-launches" text={launches.name} className="t-mega max-w-[12ch]" />
        </div>
        <ul className="strip mt-12 lg:hidden" aria-label="Brand launch photographs">
          {[photos.cartierCarried, photos.mercViolet, photos.kaytranadaCounter].map((im) => (
            <li key={im.src} className="w-[78vw]">
              <Photo img={im} ratio={im.height > im.width ? "4 / 5" : "4 / 3"} sizes="78vw" reveal={false} />
            </li>
          ))}
        </ul>
        <div className="wrap mt-16 hidden grid-cols-12 items-end gap-8 lg:grid">
          <Photo img={photos.cartierCarried} ratio="4 / 3" sizes="50vw" className="col-span-6" drift />
          <Photo img={photos.mercViolet} ratio="3 / 4" sizes="22vw" className="col-span-3 -mb-20" delay={150} />
          <Photo img={photos.kaytranadaCounter} ratio="1 / 1" sizes="22vw" className="col-span-3 mb-28" delay={300} />
        </div>
        <div className="wrap mt-12 grid gap-6 lg:mt-28 lg:grid-cols-12 lg:items-end">
          <p className="t-lead max-w-[40ch] text-[var(--on-dark-2)] lg:col-span-6" data-reveal="up">
            {launches.blurb}
          </p>
          <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end" data-reveal="up" style={d(120)}>
            <More href={launches.href} label={launches.linkLabel} dark />
          </div>
        </div>
      </section>

      {/* ── 3d. Corporate: polished and exact. White, a ruled grid of what the service covers. */}
      <section className="py-[var(--section)]" aria-labelledby="ch-corporate">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealText id="ch-corporate" text={corporate.name} className="t-big max-w-[11ch]" />
            <p className="t-lead muted mt-8 max-w-[34ch]" data-reveal="up" style={d(150)}>
              {corporate.blurb}
            </p>
            <div className="mt-8" data-reveal="up" style={d(250)}>
              <More href={corporate.href} label={corporate.linkLabel} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Photo img={photos.netflixTeam} ratio="3 / 2" sizes="(min-width: 1024px) 56vw, 100vw" drift />
          </div>
        </div>
        <ul className="wrap mt-14 grid sm:grid-cols-2 sm:gap-x-8 lg:mt-20 lg:grid-cols-4">
          {servicePages["corporate-dining"].cover.formats.map((f, i) => (
            <li key={f.title} className="border-t border-[var(--navy)] py-6" data-reveal="up" style={d(i * 80)}>
              <h3 className="serif text-[1.375rem] leading-tight">{f.title}</h3>
              <p className="muted mt-2 text-[0.9375rem]">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 4. Brand statement: the founders' own line, set as large as the page allows. */}
      <section className="on-dark relative overflow-hidden py-[var(--section)]" aria-labelledby="story-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h2 id="story-title" className="sr-only">
              Our story
            </h2>
            <span className="copper-rule" aria-hidden="true" />
            <blockquote className="mt-10">
              <RevealText as="p" text={`“${story.quote}”`} className="t-statement" />
              <footer className="t-meta mt-8 text-[var(--copper-soft)]">{story.quoteBy}</footer>
            </blockquote>
            <div className="mt-10" data-reveal="up">
              <More href="/our-story" label="Our story" dark />
            </div>
          </div>
          <div className="lg:col-span-3 lg:self-end">
            <Photo img={story.image} ratio="3 / 4" sizes="(min-width: 1024px) 22vw, 60vw" drift className="w-[60%] lg:w-full" />
          </div>
        </div>
      </section>

      {/* ── 5. Food and hospitality: an asymmetric spread, photographs overlapping at different sizes. */}
      <section className="overflow-hidden bg-[var(--linen)] py-[var(--section)]" style={{ "--inset-bg": "var(--linen)" } as CSSProperties} aria-labelledby="food-title">
        <div className="wrap">
          <RevealText id="food-title" text={home.food.heading} className="t-big max-w-[12ch]" />
        </div>
        <div className="wrap mt-12 grid grid-cols-6 items-start gap-3 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          <Photo img={photos.livePlating} ratio="4 / 3" sizes="(min-width: 1024px) 58vw, 100vw" className="col-span-6 lg:col-span-7" drift />
          <Photo img={photos.rocaDesserts} ratio="3 / 4" sizes="(min-width: 1024px) 28vw, 48vw" className="col-span-3 mt-3 lg:col-span-4 lg:col-start-9 lg:mt-40" delay={120} />
          <Photo img={photos.aurangabadThali} ratio="1 / 1" sizes="(min-width: 1024px) 30vw, 48vw" className="col-span-3 mt-16 lg:col-span-4 lg:col-start-2 lg:-mt-10" delay={200} />
          <Photo img={photos.cartierCocktails} ratio="16 / 10" sizes="(min-width: 1024px) 48vw, 100vw" className="col-span-6 mt-3 lg:col-span-6 lg:col-start-7 lg:mt-28" drift />
          <Photo img={photos.defenderBoard} ratio="3 / 4" sizes="(min-width: 1024px) 22vw, 48vw" className="col-span-3 mt-3 lg:col-span-3 lg:col-start-1 lg:-mt-16" delay={150} />
          <Photo img={photos.bayviewChai} ratio="3 / 2" sizes="(min-width: 1024px) 44vw, 48vw" className="col-span-3 mt-24 lg:col-span-6 lg:col-start-5 lg:mt-24" delay={250} />
        </div>
      </section>

      {/* ── 6. Recent work: a horizontal sequence, swiped on phones, stepped with buttons on desktop. */}
      <section className="py-[var(--section)]" aria-labelledby="work-title">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <RevealText id="work-title" text={work.heading} className="t-big" />
          <More href="/our-work" label="See all work" />
        </div>
        <WorkStrip label="Recent work">
          {recent.map((s) => {
            const card = s.images.find((im) => !shown.has(im.src)) ?? s.images[0];
            return (
              <li key={s.slug} className="w-[74vw] max-w-[360px] lg:w-[30vw] lg:max-w-[460px]">
                <StoryCard story={s} image={card} sizes="(min-width: 1024px) 30vw, 74vw" reveal={false} />
              </li>
            );
          })}
        </WorkStrip>
      </section>

      {/* ── 7. Closing: the evening photograph, the invitation set large. */}
      <section className="on-dark relative isolate flex min-h-[92svh] items-end overflow-hidden pb-16 pt-40 lg:pb-24" data-cta-zone aria-labelledby="close-title">
        <div className="absolute inset-0 -z-10">
          <Photo img={close.image} sizes="100vw" className="h-full w-full" drift reveal={false} />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,28,45,0.94)_0%,rgba(11,28,45,0.55)_50%,rgba(11,28,45,0.2)_100%)]" />
        </div>
        <div className="wrap">
          <RevealText id="close-title" text="Tell us the date." className="t-mega" />
          <p className="t-big mt-2 text-[var(--on-dark-2)]" data-reveal="up" style={d(200)}>
            We’ll take it from there.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <p className="t-lead max-w-[34ch] text-[var(--on-dark-2)] lg:col-span-5" data-reveal="up" style={d(300)}>
              {close.lead}
            </p>
            <div className="lg:col-span-4" data-reveal="up" style={d(380)}>
              <Link href={PLAN_HREF} className="btn btn--light">
                Plan your event <span className="arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
