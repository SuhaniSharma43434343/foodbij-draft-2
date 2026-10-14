import Link from "next/link";
import { services } from "@/content/site";
import type { EventStoryFull } from "@/content/stories";
import { StoryPhoto } from "./StoryPhoto";

type StoryCardProps = {
  story: EventStoryFull;
  headingLevel?: "h2" | "h3";
  /** Load the photo first (the card at the top of a page is its largest paint). */
  preload?: boolean;
};

/** An event card in the homepage style: 4:5 photo, service label, title, the summary line. */
export function StoryCard({ story, headingLevel: H = "h2", preload }: StoryCardProps) {
  const service = services.find((s) => s.slug === story.service);
  return (
    <Link href={`/our-work/${story.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <StoryPhoto
          img={story.images[0]}
          preload={preload}
          sizes="(min-width: 1320px) 392px, (min-width: 1024px) 30vw, (min-width: 768px) 46vw, calc(100vw - 40px)"
          className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      {service ? <p className="t-label mt-5 text-copper-deep">{service.name}</p> : null}
      <H className="mt-2 font-display text-[1.5rem] leading-[1.2] font-medium text-navy group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {story.title}
      </H>
      <p className="t-body mt-2 text-navy/72">{story.summary}</p>
    </Link>
  );
}
