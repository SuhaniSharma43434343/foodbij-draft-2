import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { SectionHeading } from "@/components/SectionHeading";
import { home, type StoryCard } from "@/content/site";

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

function CardBody({ item }: { item: StoryCard }) {
  const f = framing[item.image.src] ?? {};
  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className={`absolute inset-0 ${f.zoom ?? ""}`}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1320px) 392px, (min-width: 1024px) 30vw, calc(100vw - 40px)"
            className={`object-cover ${f.img ?? ""} transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
          />
        </div>
      </div>
      <p className="t-label mt-5 text-copper-deep">{item.service}</p>
      <h3 className="mt-2 font-display text-[1.5rem] leading-[1.2] font-medium">{item.title}</h3>
      <p className="t-body mt-2 text-navy/72">{item.line}</p>
    </>
  );
}

/** Three event cards on the mist band: photo, service label, title, the brief in one line. */
export function EventStories() {
  const { label, heading, linkLabel, items } = home.stories;
  return (
    <section aria-labelledby="work-title" className="section-y bg-mist">
      <div className="site-container">
        <SectionHeading id="work-title" label={label} heading={heading} />
        <ul className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {items.map((item) => (
            <li key={item.title}>
              {item.href && item.href !== "#" ? (
                <Link href={item.href} className="group block">
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
        <ArrowLink href="/our-work" className="mt-10 lg:mt-14">
          {linkLabel}
        </ArrowLink>
      </div>
    </section>
  );
}
