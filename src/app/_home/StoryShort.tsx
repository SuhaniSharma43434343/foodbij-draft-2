import Image from "next/image";
import { ArrowLink } from "@/components/ArrowLink";
import { home } from "@/content/site";

/** Our story, short: the founders' line, one paragraph and a link, beside the team photo. */
export function StoryShort() {
  const { label, quote, quoteBy, body, linkLabel, image } = home.storyShort;
  return (
    <section aria-labelledby="story-title" className="section-y">
      <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" data-reveal-stagger>
          <p className="t-label text-copper-deep">{label}</p>
          <h2 id="story-title" className="t-display-m mt-4 italic">
            {quote}
          </h2>
          {quoteBy ? <p className="mt-4 text-[14px] leading-[1.5] text-navy/72">{quoteBy}</p> : null}
          <span aria-hidden="true" data-reveal="rule" className="copper-rule mt-8" />
          <p className="t-body mt-8">{body}</p>
          <div className="mt-4">
            <ArrowLink href="/our-story">{linkLabel}</ArrowLink>
          </div>
        </div>
        {/* The wall behind the team carries the client's name (centre to right of the frame), so the
            photo is cropped to the two servers on the left, with their trays. The wipe's settle (1.12 -> 1) runs on
            an outer wrapper and only ever zooms further in, so the name never shows. No parallax here for the same reason. */}
        <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden lg:col-span-6 lg:col-start-7 lg:aspect-[5/6]">
          <div className="absolute inset-0 origin-[0%_76%]">
            <div className="absolute inset-0 origin-[0%_76%] scale-[1.49]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1320px) 910px, (min-width: 1024px) 72vw, 150vw"
                className="object-cover object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
