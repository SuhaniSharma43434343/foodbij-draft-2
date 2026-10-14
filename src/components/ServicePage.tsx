import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PLAN_HREF, type Service, type ServicePage as ServicePageContent } from "@/content/site";
import { ArrowLink } from "./ArrowLink";
import { PlanBand } from "./PlanBand";
import { SectionHeading } from "./SectionHeading";
import { ScrollFocus } from "./motion/ScrollFocus";
import { DriftWord } from "./service/DriftWord";
import { ServiceGallery, type GalleryCrop } from "./service/ServiceGallery";
import { ServiceHero } from "./service/ServiceHero";
import { StepsMotion } from "./service/StepsMotion";
import { stories as allStories } from "@/content/stories";
import "./service/service-motion.css";

export type { GalleryCrop };

/** The Our work page for a service-page story, matched by its photo folder. */
function storyHref(folder: string): string | undefined {
  const match = allStories.find((st) => st.images.some((img) => img.src.includes(`/${folder}/`)));
  return match ? `/our-work/${match.slug}` : undefined;
}

export type ServicePageProps = {
  /** The service this page is for (one entry of `services`). */
  service: Service;
  /** The page copy (e.g. `weddings`). */
  page: ServicePageContent;
  /** The other three services, in brief order (linked near the end of the page). */
  others: Service[];
  /**
   * Optional per-photo crops for the gallery, keyed by image src. `zoom` > 1 enlarges the photo inside
   * its frame, anchored to the bottom; `position` is its object-position, e.g. "50% 100%" keeps the bottom
   * of the frame (use it to crop a head or a chef's toque out of the top).
   */
  galleryCrops?: Record<string, GalleryCrop>;
};

/** Phone photos run edge to edge (W9.4), so they are as wide as the screen below 1024px. */
const FULL_COL = "100vw";

/** Splits "First sentence. The rest." so a long section heading stays short on phone. */
function splitHeading(text: string): [string, string] {
  const i = text.indexOf(". ");
  if (i === -1) return [text, ""];
  return [text.slice(0, i + 1), text.slice(i + 2)];
}

function SmallTitle({ as: Tag = "h3", children, className = "" }: { as?: "h3" | "p"; children: ReactNode; className?: string }) {
  return (
    <Tag className={`font-display text-[1.625rem] leading-[1.15] font-medium lg:text-[1.75rem] ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/**
 * One template for the four service pages (01-BRIEF.md section 6): hero, what we do, how it
 * works, event stories, food photos, the other services, and the plan band preset to this service.
 *
 * Motion (docs/design/motion-spec.md, "Expressive pass"; CSS in ./service/service-motion.css). The scroll
 * effects are driven by the shared useScrollProgress primitive (--p / data-step) inside the client parts:
 * - ServiceHero: cinematic opening (slash, masked name, fade-ups, photo settle) and a pinned scroll where
 *   the photo frames itself into a plate while the text drifts out (150svh phone / 170vh desktop).
 * - What we do: staggered reveals, copper rules drawing in, and on desktop the service's short name as an
 *   oversized outline word drifting behind the list (DriftWord, decorative); on phone the name is a huge
 *   italic word that drifts sideways in its own clipped band under the heading (DriftWord variant "band").
 * - StepsMotion: desktop pins and steps through "How it works"; phone reveals steps with a copper line.
 * - Stories and other services: wipe reveals, hover zoom, data-cursor="view" on linked photos.
 * - ServiceGallery: the homepage food band behaviour (phone carousel, desktop pinned row) with crops.
 * - W9.4 phone: story and other-service photos run edge to edge (4:5) and are ScrollFocus targets (zoom,
 *   lift and a copper rule while they cross the middle of the screen); links and photo cards press at 0.97.
 * Without JS or under reduced motion every section is the static layout, nothing pinned or hidden.
 */
export function ServicePage({ service, page, others, galleryCrops = {} }: ServicePageProps) {
  const { hero, whatWeDo, howItWorks, stories, gallery, otherServices, plan } = page;
  const [whatHeading, whatLead] = splitHeading(whatWeDo.heading);
  const id = service.slug;

  return (
    <>
      {/* 1. Hero */}
      <ServiceHero id={id} headline={hero.headline} line={hero.line} cta={hero.cta ?? plan.cta} href="#plan" image={hero.image} />

      {/* 2. What we do */}
      <section aria-labelledby={`${id}-what`} className="section-y relative overflow-hidden">
        <DriftWord word={service.shortName} />
        <div className="site-container relative">
          <SectionHeading
            reveal
            id={`${id}-what`}
            label={whatWeDo.label}
            heading={whatHeading}
            headingClassName="max-w-[22ch] text-balance"
          />
          {whatLead ? (
            <p data-reveal="" className="t-lead mt-5 max-w-[44ch] text-navy/72">
              {whatLead}
            </p>
          ) : null}
          <DriftWord word={service.shortName} variant="band" />
          <ul data-reveal-stagger="" className="mt-12 border-t border-navy/12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-x-16">
            {whatWeDo.formats.map((f) => (
              <li key={f.title} className="border-b border-navy/12 py-8 lg:py-10">
                <span aria-hidden="true" data-reveal="rule" className="copper-rule mb-5" />
                <SmallTitle>{f.title}</SmallTitle>
                <p className="t-body mt-3 text-navy/80">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How it works */}
      <StepsMotion id={id} label={howItWorks.label} heading={howItWorks.heading} steps={howItWorks.steps} />

      {/* 4. Event stories from this service */}
      <section aria-labelledby={`${id}-stories`} className="section-y">
        <div className="site-container">
          <SectionHeading reveal id={`${id}-stories`} label={stories.label} heading={stories.heading} />
          <ul className="mt-12 grid grid-cols-1 gap-16 lg:mt-16 lg:grid-cols-2 lg:gap-12">
            {stories.items.map((s) => {
              const pending = s.brief.startsWith("[NEEDS CLIENT");
              const href = storyHref(s.folder);
              const photo = (
                <div data-reveal="wipe" data-focus-scroll="" className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes={`(min-width: 1320px) 600px, (min-width: 1024px) 46vw, ${FULL_COL}`}
                      className="media-zoom object-cover"
                    />
                  </div>
                </div>
              );
              return (
                <li key={s.folder}>
                  <article className="group">
                    {href ? (
                      <Link href={href} tabIndex={-1} aria-hidden="true" data-cursor="view" className="sv-bleed press block">
                        {photo}
                      </Link>
                    ) : (
                      <div className="sv-bleed">{photo}</div>
                    )}
                    <div data-reveal="">
                      <h3 className="t-display-m mt-6 text-[1.75rem] lg:text-[2.25rem]">
                        {href ? (
                          <Link href={href} className="press underline-offset-4 hover:underline active:underline">
                            {s.title}
                          </Link>
                        ) : (
                          s.title
                        )}
                      </h3>
                      <p className="t-label mt-6 text-copper-deep">The brief</p>
                      <p className={`t-body mt-2 ${pending ? "text-navy/60 italic" : "text-navy/80"}`}>{s.brief}</p>
                      <p className="t-label mt-6 text-copper-deep">What we made</p>
                      <p className="t-body mt-2 text-navy/80">{s.whatWeMade}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 lg:mt-14">
            <ArrowLink href={`/our-work?service=${service.slug}`} className="press">
              {stories.linkLabel}
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 5. Food and presentation photos */}
      <ServiceGallery id={id} label={gallery.label} heading={gallery.heading} images={gallery.images} crops={galleryCrops} />

      {/* 6. Other services */}
      <section aria-labelledby={`${id}-others`} className="section-y">
        <div className="site-container">
          <SectionHeading reveal id={`${id}-others`} heading={otherServices.label} />
          <ul className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-12">
            {others.map((s) => (
              <li key={s.slug} className="group">
                <Link href={s.href} tabIndex={-1} aria-hidden="true" data-cursor="view" className="sv-bleed press block">
                  <div data-reveal="wipe" data-focus-scroll="" className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/2]">
                    <div className="absolute inset-0">
                      <Image
                        src={s.heroImage.src}
                        alt=""
                        fill
                        sizes={`(min-width: 1320px) 400px, (min-width: 1024px) 30vw, ${FULL_COL}`}
                        className="media-zoom object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <div data-reveal="">
                  <SmallTitle className="mt-5">{s.name}</SmallTitle>
                  <p className="t-body mt-2 text-navy/72">{s.promise}</p>
                  <ArrowLink href={s.href} className="press mt-2">
                    {s.linkLabel}
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ScrollFocus />

      {/* 7. Plan your event, preset to this service */}
      <PlanBand
        heading={plan.heading}
        lead={plan.lead}
        cta={plan.cta}
        phoneLine={plan.phoneLine}
        href={`${PLAN_HREF}?service=${plan.presetService}`}
      />
    </>
  );
}
