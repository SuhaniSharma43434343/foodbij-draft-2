import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { PlanBand } from "@/components/PlanBand";
import { StoryPhoto } from "@/components/work/StoryPhoto";
import { PLAN_HREF, services } from "@/content/site";
import { getStory, stories, work } from "@/content/stories";

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

/** Desktop columns for the photo set, by photo count (full class names so Tailwind sees them). */
const photoCols: Record<number, string> = { 1: "lg:grid-cols-2", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

const HERO_SIZES = "(min-width: 1320px) 1224px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 40px)";

function Label({ children }: { children: string }) {
  return <h2 className="t-label text-copper-deep">{children}</h2>;
}

/** One event story (01-BRIEF.md section 6): title, the brief, what we made, photos, live counter, plan. */
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
          <Link href={service.href} className="t-label inline-flex min-h-11 items-center text-copper-deep hover:underline">
            {service.name}
          </Link>
          <h1 id="story-title" className="t-display-l mt-2 max-w-[20ch] text-balance text-navy">
            {story.title}
          </h1>
          <p className="t-lead mt-5 max-w-[46ch] text-navy/72">{story.summary}</p>
        </header>

        <div className="site-container mt-10 lg:mt-14">
          <div className="relative aspect-[4/5] overflow-hidden bg-mist md:aspect-[3/2]">
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

        <div className="site-container section-y grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-5">
            <Label>{work.story.briefLabel}</Label>
            <p className={`t-body mt-3 ${pending ? "text-navy/60 italic" : "text-navy/80"}`}>{story.brief}</p>
          </section>
          <section className="lg:col-span-6 lg:col-start-7">
            <Label>{work.story.madeLabel}</Label>
            <p className="t-body mt-3 text-navy/80">{story.whatWeMade}</p>
            {story.liveStation ? (
              <div className="mt-8 border-l-2 border-copper pl-5">
                <p className="t-label text-copper-deep">{work.story.liveLabel}</p>
                <p className="mt-2 font-display text-[1.375rem] leading-[1.25] font-medium text-navy lg:text-[1.625rem]">
                  {story.liveStation}
                </p>
              </div>
            ) : null}
          </section>
        </div>

        {rest.length > 0 ? (
          <section aria-label={work.story.photosLabel} className="pb-[72px] lg:pb-32">
            <ul className={`flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 after:block after:w-2 after:shrink-0 after:content-[''] lg:mx-auto lg:grid lg:max-w-[1320px] lg:snap-none ${photoCols[rest.length] ?? "lg:grid-cols-3"} lg:gap-12 lg:overflow-visible lg:px-12 lg:after:hidden`}>
              {rest.map((img) => (
                <li key={img.src} className="relative aspect-[4/5] w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden bg-mist lg:w-auto lg:max-w-none">
                  <StoryPhoto img={img} sizes={rest.length <= 2 ? "(min-width: 1320px) 600px, (min-width: 1024px) 46vw, 78vw" : "(min-width: 1320px) 392px, (min-width: 1024px) 30vw, 78vw"} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="site-container flex flex-col gap-3 pb-[72px] sm:flex-row lg:pb-32">
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
