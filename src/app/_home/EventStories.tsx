import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { SectionHeading } from "@/components/SectionHeading";
import { StoryTrigger, StoryViewerProvider } from "@/components/stories/StoryViewer";
import { home, type StoryCard } from "@/content/site";
import { getStory, type EventStoryFull } from "@/content/stories";

/**
 * Per-photo framing for the 4:5 cards, keyed by file. The anime launch frame carries the client's
 * banner above the counter, so it is zoomed in from the bottom until the banner leaves the frame.
 */
const framing: Record<string, { img?: string; zoom?: string }> = {
  "/images/3-brand-launches-live-events/crunchyroll/crunchyroll-02.jpg": {
    img: "object-bottom",
    zoom: "scale-[1.45] origin-[30%_100%]",
  },
};

/** The story slug behind a card link (/our-work/<slug>), if that story exists. */
function storyFor(item: StoryCard): EventStoryFull | undefined {
  const m = /^\/our-work\/([^/?#]+)$/.exec(item.href);
  return m ? getStory(m[1]) : undefined;
}

function CardBody({ item, ring }: { item: StoryCard; ring?: boolean }) {
  const f = framing[item.image.src] ?? {};
  return (
    <>
      <div className={`relative aspect-[4/5] overflow-hidden ${ring ? "story-ring" : ""}`}>
        <div className={`absolute inset-0 ${f.zoom ?? ""}`}>
          <Image
            src={item.image.src}
            style={photoStyle(item.image.src)}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1320px) 392px, (min-width: 1024px) 30vw, calc(100vw - 40px)"
            className={`media-zoom object-cover ${f.img ?? ""}`}
          />
        </div>
      </div>
      <p className="t-label mt-5 text-copper-deep">{item.service}</p>
      <h3 className="mt-2 font-display text-[1.5rem] leading-[1.2] font-medium">{item.title}</h3>
      <p className="t-body mt-2 text-navy/72">{item.line}</p>
    </>
  );
}

/**
 * Three event cards on the mist band: photo, service label, title, the brief in one line.
 * Each card is a real link to its story page; with JS a plain click opens the story viewer
 * (src/components/stories/StoryViewer.tsx) over the page, stepping through these three stories.
 */
export function EventStories() {
  const { label, heading, linkLabel, items } = home.stories;
  const cards = items.map((item) => ({ item, story: storyFor(item) }));
  const set = cards.flatMap((c) => (c.story ? [c.story] : []));
  return (
    <section aria-labelledby="work-title" className="section-y bg-mist">
      <div className="site-container">
        <SectionHeading reveal id="work-title" label={label} heading={heading} />
        <StoryViewerProvider stories={set}>
          <ul data-reveal-stagger className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-3 lg:gap-12">
            {cards.map(({ item, story }) => (
              <li key={item.title}>
                {story ? (
                  <StoryTrigger slug={story.slug} href={item.href} className="tap-scale group block">
                    <CardBody item={item} ring />
                  </StoryTrigger>
                ) : item.href && item.href !== "#" ? (
                  <Link href={item.href} className="tap-scale group block">
                    <CardBody item={item} />
                  </Link>
                ) : (
                  <div className="group">
                    <CardBody item={item} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </StoryViewerProvider>
        <div data-reveal className="mt-10 lg:mt-14">
          <ArrowLink href="/our-work">{linkLabel}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
