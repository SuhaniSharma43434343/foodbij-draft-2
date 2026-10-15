import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Close } from "@/components/Close";
import { Photo } from "@/components/Photo";
import { Txt } from "@/components/Txt";
import { getService } from "@/content/site";
import { getStory, stories } from "@/content/stories";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const story = getStory((await params).slug);
  return story ? { title: story.title, description: story.summary } : {};
}

/** One event story: the brief first, then what we made, then the photographs. */
export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const service = getService(story.service);
  const [lead, ...rest] = story.images;
  const siblings = stories.filter((s) => s.service === story.service);
  const next = siblings[(siblings.findIndex((s) => s.slug === story.slug) + 1) % siblings.length];

  return (
    <>
      <article>
        <header className="pt-[calc(var(--header-h)+40px)] lg:pt-[calc(var(--header-h)+72px)]">
          <div className="wrap">
            <Link href={service.href} className="t-meta muted inline-flex min-h-[44px] items-center gap-2">
              {service.name} <span className="text-[var(--copper)]" aria-hidden="true">/</span>
            </Link>
            <h1 className="t-h1 hero-in mt-1 max-w-[18ch]">{story.title}</h1>
          </div>
          <div className="mt-10 lg:mx-auto lg:mt-14 lg:max-w-[var(--max)] lg:px-[var(--gutter)]">
            <Photo img={lead} ratio="3 / 2" sizes="(min-width: 1440px) 1328px, (min-width: 1024px) 92vw, 100vw" preload />
          </div>
        </header>

        <div className="wrap section grid gap-12 lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-5" aria-labelledby="brief">
            <h2 id="brief" className="t-meta text-[var(--copper-ink)]">
              The brief
            </h2>
            <p className="t-h3 mt-4">
              <Txt>{story.brief}</Txt>
            </p>
          </section>
          <section className="lg:col-span-5 lg:col-start-8" aria-labelledby="made">
            <h2 id="made" className="t-meta text-[var(--copper-ink)]">
              What we made
            </h2>
            <p className="mt-4">{story.whatWeMade}</p>
            {story.liveCounter && <p className="muted mt-4">{story.liveCounter}</p>}
          </section>
        </div>

        {rest.length > 0 && (
          <div className="wrap grid gap-3 pb-[var(--section)] md:grid-cols-2 md:gap-8">
            {rest.map((im, i) => (
              <Photo
                key={im.src}
                img={im}
                ratio={im.height > im.width ? "4 / 5" : "4 / 3"}
                sizes="(min-width: 768px) 46vw, 100vw"
                className={rest.length === 1 ? "md:col-span-2 md:mx-auto md:w-2/3" : i % 2 === 1 ? "md:mt-24" : ""}
                delay={i * 120}
              />
            ))}
          </div>
        )}
      </article>

      {next && next.slug !== story.slug && (
        <nav aria-label="Next story" className="border-t border-[var(--line)]">
          <Link href={`/our-work/${next.slug}`} className="wrap group flex min-h-[120px] items-center justify-between gap-6 py-10">
            <span>
              <span className="t-meta muted block">Next story</span>
              <span className="t-h3 mt-1 block">
                <span className="uline [background-size:0_1px] group-hover:[background-size:100%_1px]">{next.title}</span>
              </span>
            </span>
            <span className="arrow" aria-hidden="true" />
          </Link>
        </nav>
      )}

      <Close heading="Brief us on something similar." lead="A date, a rough guest count and the kind of event is enough to start." service={story.service} />
    </>
  );
}
