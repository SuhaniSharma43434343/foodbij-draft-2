import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { ArrowLink } from "@/components/ArrowLink";
import { Grain } from "@/components/motion/Grain";
import { ScrollFocus } from "@/components/motion/ScrollFocus";
import { home } from "@/content/site";
import "./home-motion-a.css";

/**
 * Our story, short: the founders' line, one paragraph and a link, beside the team photo.
 * Phone (W9.4): a navy "evening" band with grain; the photo comes first, edge to edge (4:5), fading into
 * the navy, and is a ScrollFocus target (zooms in a little and lifts, copper rule draws along its foot).
 * Desktop keeps the white split layout.
 */
export function StoryShort() {
  const { quote, quoteBy, body, linkLabel, image } = home.storyShort;
  return (
    <section
      aria-labelledby="story-title"
      className="relative bg-navy pb-[72px] text-white lg:bg-paper lg:py-[128px] lg:text-navy"
    >
      <Grain className="lg:hidden" />
      <div className="site-container relative z-[2] grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5" data-reveal-stagger>
          <h2 id="story-title" className="t-display-m italic max-lg:text-[2.375rem] max-lg:leading-[1.06]">
            {quote}
          </h2>
          {quoteBy ? <p className="mt-4 text-[14px] leading-[1.5] text-white/72 lg:text-navy/72">{quoteBy}</p> : null}
          <span aria-hidden="true" data-reveal="rule" className="copper-rule mt-8" />
          <p className="t-body mt-8 text-white/85 lg:text-navy">{body}</p>
          <div className="mt-4">
            <ArrowLink href="/our-story" className="press max-lg:text-white max-lg:[--press-color:var(--color-copper)]">
              {linkLabel}
            </ArrowLink>
          </div>
        </div>
        {/* The wall behind the team carries the client's name (centre to right of the frame), so the
            photo is cropped to the two servers on the left, with their trays. The wipe's settle (1.12 -> 1) and
            the scroll-focus zoom (1 -> 1.05) both run on wrappers anchored at the same left-bottom origin and only
            ever zoom further in, so the name never shows. No parallax here for the same reason.
            Phone: first in the band, edge to edge (negative gutter), fading into the navy at its foot. */}
        <div data-focus-scroll="" className="relative -mx-5 max-lg:order-first lg:col-span-6 lg:col-start-7 lg:mx-0">
          <div data-reveal="wipe" className="story-photo relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
            <div className="absolute inset-0 origin-[0%_76%]">
              <div className="focus-zoom absolute inset-0 origin-[0%_76%]">
                <div className="absolute inset-0 origin-[0%_76%] scale-[1.49]">
                  <Image
                    src={image.src}
                    style={photoStyle(image.src)}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1320px) 910px, (min-width: 1024px) 72vw, 150vw"
                    className="object-cover object-left"
                  />
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_top,#0B1C2D,rgba(11,28,45,0))] lg:hidden"
            />
          </div>
        </div>
      </div>
      <ScrollFocus />
    </section>
  );
}
