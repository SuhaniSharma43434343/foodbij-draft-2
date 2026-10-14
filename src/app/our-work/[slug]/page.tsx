import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { PlanBand } from "@/components/PlanBand";
import { HeroLines } from "@/components/motion/HeroLines";
import { PageSlash } from "@/components/work/PageSlash";
import { ScrollLit } from "@/components/work/ScrollLit";
import { StoryPhoto } from "@/components/work/StoryPhoto";
import { StoryPhotoSet } from "@/components/work/StoryPhotoSet";
import { PLAN_HREF, services } from "@/content/site";
import { getStory, stories, work } from "@/content/stories";
import "@/components/work/pages-motion.css";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return { title: story.title, description: story.summary };
}

const HERO_SIZES = "(min-width: 1320px) 1224px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 40px)";

function Label({ children }: { children: string }) {
  return <h2 className="t-label text-copper-deep">{children}</h2>;
}

/**
 * One event story (01-BRIEF.md section 6): title, the brief, what we made, photos, live counter, plan.
 *
 * Motion (W8.3, CSS in components/work/pages-motion.css + the shared API in globals.css):
 * - Opening, pure CSS on first paint: copper slash draws in beside the service label, the title rises through
 *   its mask, the summary fades up; the hero photo settles from 1.08 (2.4s). As the hero scrolls away it is
 *   framed in (clip-path inset) and leans in (scale up only, so crops hold) - CSS scroll-driven where supported.
 * - "The brief" and "What we made" fade up in a short cascade; the live-counter line lights word by word.
 * - Photo set: phone swipe carousel with an active photo; desktop staggered grid, wipe-in + parallax.
 */
export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const service = services.find((s) => s.slug === story.service)!;
  const [hero, ...rest] = story.images;
  const pending = story.brief.startsWith("[NEEDS CLIENT");
  const planHref = `${PLAN_HREF}?service=${story.service}`;

  return (
    <>
      <article aria-labelledby="story-title">
        <header className="site-container pt-12 lg:pt-20">
          <p className="flex items-center gap-3">
            <PageSlash />
            <Link href={service.href} className="t-label inline-flex min-h-11 items-center text-copper-deep hover:underline">
              {service.name}
            </Link>
          </p>
          <h1 id="story-title" className="t-display-l mt-2 max-w-[20ch] text-balance text-navy">
            <HeroLines lines={[story.title]} />
          </h1>
          <p className="hero-fade t-lead mt-5 max-w-[46ch] text-navy/72 [--d:300ms]">{story.summary}</p>
        </header>

        <div className="site-container mt-10 lg:mt-14">
          <div data-cursor="view" className="pm-hero relative aspect-[4/5] overflow-hidden bg-mist md:aspect-[3/2]">
            <div className="pm-hero-lean">
              <div className="hero-zoom">
                {hero.wideCrop ? (
                  <>
                    <div className="md:hidden">
                      <StoryPhoto img={hero} preload sizes="calc(100vw - 40px)" />
                    </div>
                    <div className="hidden md:block">
                      <StoryPhoto img={{ ...hero, crop: hero.wideCrop }} sizes={HERO_SIZES} />
                    </div>
                  </>
                ) : (
                  <StoryPhoto img={hero} preload sizes={HERO_SIZES} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="site-container section-y grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <section data-reveal-stagger="" className="lg:col-span-5">
            <Label>{work.story.briefLabel}</Label>
            <p className={`t-body mt-3 ${pending ? "text-navy/60 italic" : "text-navy/80"}`}>{story.brief}</p>
          </section>
          <section data-reveal-stagger="" className="lg:col-span-6 lg:col-start-7">
            <Label>{work.story.madeLabel}</Label>
            <p className="t-body mt-3 text-navy/80">{story.whatWeMade}</p>
            {story.liveStation ? (
              <div className="mt-8 border-l-2 border-copper pl-5">
                <p className="t-label text-copper-deep">{work.story.liveLabel}</p>
                <ScrollLit
                  text={story.liveStation}
                  className="mt-2 font-display text-[1.375rem] leading-[1.25] font-medium text-navy lg:text-[1.625rem]"
                />
              </div>
            ) : null}
          </section>
        </div>

        {rest.length > 0 ? (
          <section aria-label={work.story.photosLabel} className="pb-[72px] lg:pb-32">
            <StoryPhotoSet images={rest} />
          </section>
        ) : null}

        <div data-reveal="" className="site-container flex flex-col gap-3 pb-[72px] sm:flex-row lg:pb-32">
          <ButtonLink href={service.href} variant="outline">
            {`See ${service.shortName.toLowerCase()}`}
          </ButtonLink>
          <ButtonLink href={planHref}>{work.plan.cta}</ButtonLink>
        </div>
      </article>

      <PlanBand
        heading={work.plan.heading}
        lead={work.plan.lead}
        cta={work.plan.cta}
        phoneLine={work.plan.phoneLine}
        href={planHref}
      />
    </>
  );
}
