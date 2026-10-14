import type { Metadata } from "next";
import { PlanBand } from "@/components/PlanBand";
import { SectionHeading } from "@/components/SectionHeading";
import { HeroLines } from "@/components/motion/HeroLines";
import { BeliefsSequence } from "@/components/story/BeliefsSequence";
import { CroppedPhoto } from "@/components/story/CroppedPhoto";
import { PageSlash } from "@/components/work/PageSlash";
import { ScrollLit } from "@/components/work/ScrollLit";
import { ourStory } from "@/content/pages";
import "@/components/work/pages-motion.css";

export const metadata: Metadata = {
  title: ourStory.meta.title,
  description: ourStory.meta.description,
};

const PHOTO_SIZES = "(min-width: 1320px) 520px, (min-width: 1024px) 38vw, calc(100vw - 40px)";

/**
 * Our story (01-BRIEF.md s6): who Foodbiz is, what it holds to, the founders, how a brief is taken.
 *
 * Motion (W8.3): opening in pure CSS (slash, title through its mask, paragraphs fade up); photos wipe in and
 * drift on desktop scroll; the founders' line lights word by word; the values run as a scroll sequence
 * (BeliefsSequence); the other sections fade up on arrival. Static without JS and under reduced motion.
 */
export default function OurStoryPage() {
  const { intro, image, quote, beliefs, founders, brief, plan } = ourStory;
  return (
    <>
      {/* 1. Who we are */}
      <section aria-labelledby="story-title" className="pt-12 pb-16 lg:pt-24 lg:pb-28">
        <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <p className="t-label flex items-center gap-3 text-copper-deep">
              <PageSlash />
              {intro.label}
            </p>
            <h1 id="story-title" className="t-display-l mt-4 max-w-[16ch] text-balance text-navy">
              <HeroLines lines={[intro.heading]} />
            </h1>
            <div className="mt-8 space-y-5">
              {intro.paragraphs.map((p, i) => (
                <p key={p} className="hero-fade t-body text-navy/85" style={{ "--d": `${300 + i * 90}ms` } as React.CSSProperties}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <CroppedPhoto
            img={image}
            className="aspect-[4/5] lg:col-span-5 lg:col-start-8"
            motion
            // The photo is zoomed in its frame, so ask for a wider file.
            sizes={`(min-width: 1320px) ${Math.round(520 * (image.zoom ?? 1))}px, (min-width: 1024px) ${Math.round(38 * (image.zoom ?? 1))}vw, calc((100vw - 40px) * ${image.zoom ?? 1})`}
          />
        </div>
      </section>

      {/* 2. The founders' line, as a pull quote */}
      <section aria-label="In the founders' words" className="pb-16 lg:pb-28">
        <div className="site-container">
          <figure className="relative pt-10 lg:max-w-[52rem] lg:pt-14">
            <span aria-hidden="true" data-reveal="rule" className="absolute inset-x-0 top-0 h-px bg-copper" />
            <blockquote>
              <ScrollLit
                text={`“${quote.text}”`}
                className="font-display text-[1.875rem] leading-[1.18] font-medium text-navy italic lg:text-[2.75rem] lg:leading-[1.12]"
              />
            </blockquote>
            <figcaption data-reveal="" className="mt-6 text-[14px] leading-[1.5] text-navy/72">
              {quote.by}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 3. What we hold to: a scroll sequence (pinned on desktop) */}
      <BeliefsSequence id="story-beliefs" label={beliefs.label} heading={beliefs.heading} items={beliefs.items} />

      {/* 4. The founders: names and roles only. No photos until real ones arrive, no bios until confirmed. */}
      <section aria-labelledby="story-founders" className="section-y">
        <div className="site-container">
          <SectionHeading id="story-founders" label={founders.label} heading={founders.heading} reveal />
          <ul data-reveal-stagger="" className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-12">
            {founders.people.map((p) => (
              <li key={p.name} className="border-t border-navy/12 pt-6">
                <p className="font-display text-[1.75rem] leading-[1.15] font-medium text-navy lg:text-[2rem]">{p.name}</p>
                <p className="t-label mt-3 text-copper-deep">{p.role}</p>
              </li>
            ))}
          </ul>
          <p data-reveal="" className="t-body mt-8 text-navy/60 italic">
            {founders.bioNote}
          </p>
        </div>
      </section>

      {/* 5. How we take a brief */}
      <section aria-labelledby="story-brief" className="section-y bg-mist">
        <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-brief" label={brief.label} heading={brief.heading} headingClassName="max-w-[18ch]" reveal />
            <CroppedPhoto img={brief.image} className="mt-10 aspect-[4/3] lg:mt-14" sizes={PHOTO_SIZES} motion />
          </div>
          <ol data-reveal-stagger="" className="lg:col-span-6 lg:col-start-7">
            {brief.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] border-t border-navy/12 py-7 lg:first:border-t-copper">
                <p aria-hidden="true" className="font-display text-[1.75rem] leading-none font-medium text-copper">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-[1.5rem] leading-[1.18] font-medium text-navy lg:text-[1.625rem]">{s.title}</h3>
                  <p className="t-body mt-2 text-navy/80">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PlanBand heading={plan.heading} lead={plan.lead} cta={plan.cta} phoneLine={plan.phoneLine} />
    </>
  );
}
