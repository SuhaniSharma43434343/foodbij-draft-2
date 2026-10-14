import { StoryTrigger } from "@/components/stories/StoryViewer";
import { services } from "@/content/site";
import type { EventStoryFull } from "@/content/stories";
import { StoryPhoto } from "./StoryPhoto";

type StoryCardProps = {
  story: EventStoryFull;
  headingLevel?: "h2" | "h3";
  /** Load the photo first (the card at the top of a page is its largest paint). */
  preload?: boolean;
};

/**
 * An event card in the homepage style: 4:5 photo, service label, title, the summary line.
 * The card is a StoryTrigger: a real link to /our-work/<slug> (no JS, modifier or middle click), and inside a
 * <StoryViewerProvider> a plain click opens the story viewer instead (W9.3).
 */
export function StoryCard({ story, headingLevel: H = "h2", preload }: StoryCardProps) {
  const service = services.find((s) => s.slug === story.service);
  return (
    <StoryTrigger slug={story.slug} className="tap-scale group block">
      {/* The thin copper story ring sits on an outer frame, because the inner frame's wipe (clip-path) would clip
          an outline. Photo: wipes in on first scroll-in (data-pm-wipe, run by the Our work grid; see
          pages-motion.css), zooms on hover/focus (.media-zoom), and the desktop cursor grows into "View". */}
      <div className="story-ring">
        <div data-pm-wipe="" data-cursor="view" className="relative aspect-[4/5] overflow-hidden bg-mist">
          <StoryPhoto
            img={story.images[0]}
            preload={preload}
            sizes="(min-width: 1320px) 392px, (min-width: 1024px) 30vw, (min-width: 768px) 46vw, calc(100vw - 40px)"
            className="media-zoom"
          />
        </div>
      </div>
      {service ? <p className="t-label mt-5 text-copper-deep">{service.name}</p> : null}
      <H className="mt-2 font-display text-[1.5rem] leading-[1.2] font-medium text-navy group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {story.title}
      </H>
      <p className="t-body mt-2 text-navy/72">{story.summary}</p>
    </StoryTrigger>
  );
}
