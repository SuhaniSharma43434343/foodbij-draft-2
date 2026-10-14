import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PLAN_HREF, type Img, type Service, type ServicePage as ServicePageContent } from "@/content/site";
import { ArrowLink } from "./ArrowLink";
import { ButtonLink } from "./Button";
import { PlanBand } from "./PlanBand";
import { SectionHeading } from "./SectionHeading";

/**
 * Art direction for one gallery photo, keyed by its `src` (see the `note` on the image in
 * src/content/site.ts). `zoom` > 1 enlarges the photo inside its frame; `position` is the CSS
 * object-position applied to the enlarged photo, e.g. "50% 100%" keeps the bottom of the frame
 * (use it to crop a head or a chef's toque out of the top).
 */
export type GalleryCrop = { zoom?: number; position?: string };

export type ServicePageProps = {
  /** The service this page is for (one entry of `services`). */
  service: Service;
  /** The page copy (e.g. `weddings`). */
  page: ServicePageContent;
  /** The other three services, in brief order (linked near the end of the page). */
  others: Service[];
  /** Optional per-photo crops for the gallery, keyed by image src. */
  galleryCrops?: Record<string, GalleryCrop>;
};

/** Container widths used in `sizes`: 1320px max, 20px gutter on phone, 48px from 1024px. */
const FULL_COL = "calc(100vw - 40px)";

/** Desktop placement for the asymmetric gallery grid (12 columns), used in order and repeated. */
const galleryPlaces = [
  { place: "lg:col-start-1 lg:col-span-7 lg:aspect-[4/3]", sizes: "(min-width: 1024px) 56vw, 78vw" },
  { place: "lg:col-start-9 lg:col-span-4 lg:aspect-[3/4] lg:mt-32", sizes: "(min-width: 1024px) 31vw, 78vw" },
  { place: "lg:col-start-2 lg:col-span-6 lg:aspect-[3/2]", sizes: "(min-width: 1024px) 48vw, 78vw" },
  { place: "lg:col-start-9 lg:col-span-4 lg:aspect-[4/5] lg:mt-24", sizes: "(min-width: 1024px) 31vw, 78vw" },
  { place: "lg:col-start-4 lg:col-span-9 lg:aspect-[16/9]", sizes: "(min-width: 1024px) 70vw, 78vw" },
  { place: "lg:col-start-1 lg:col-span-5 lg:aspect-[4/5]", sizes: "(min-width: 1024px) 40vw, 78vw" },
];

/** Splits "First sentence. The rest." so a long section heading stays short on phone. */
function splitHeading(text: string): [string, string] {
  const i = text.indexOf(". ");
  if (i === -1) return [text, ""];
  return [text.slice(0, i + 1), text.slice(i + 2)];
}

/** Two-digit step numeral in copper Cormorant, like the homepage service numerals. */
function Numeral({ n }: { n: number }) {
  return (
    <p aria-hidden="true" className="font-display text-[1.75rem] leading-none font-medium text-copper">
      {String(n).padStart(2, "0")}
    </p>
  );
}

function SmallTitle({ as: Tag = "h3", children, className = "" }: { as?: "h3" | "p"; children: ReactNode; className?: string }) {
  return (
    <Tag className={`font-display text-[1.625rem] leading-[1.15] font-medium lg:text-[1.75rem] ${className}`.trim()}>
      {children}
    </Tag>
  );
}

function GalleryPhoto({ img, crop, sizes }: { img: Img; crop?: GalleryCrop; sizes: string }) {
  const zoom = crop?.zoom ?? 1;
  return (
    <div className="absolute inset-x-0 bottom-0" style={{ height: `${zoom * 100}%` }}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={crop?.position ? { objectPosition: crop.position } : undefined}
      />
    </div>
  );
}

/**
 * One template for the four service pages (01-BRIEF.md section 6): hero, what we do, how it
 * works, event stories, food photos, the other services, and the plan band preset to this service.
 */
export function ServicePage({ service, page, others, galleryCrops = {} }: ServicePageProps) {
  const { hero, whatWeDo, howItWorks, stories, gallery, otherServices, plan } = page;
  const [whatHeading, whatLead] = splitHeading(whatWeDo.heading);
  const id = service.slug;

  return (
    <>
      {/* 1. Hero. Phone: photo in the top of the screen fading into navy, text on navy.
          Desktop: the photo fills the right of the band and fades left into navy behind the text. */}
      <section
        data-hide-sticky
        aria-labelledby={`${id}-title`}
        className="relative h-[100svh] min-h-[600px] overflow-hidden bg-navy text-white lg:min-h-[680px]"
      >
        <div className="absolute inset-x-0 top-0 bottom-[30%] lg:bottom-0 lg:left-[30%]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[50%_60%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,28,45,0.55)_0%,rgba(11,28,45,0)_18%,rgba(11,28,45,0)_34%,rgba(11,28,45,0.85)_56%,#0B1C2D_70%)] lg:bg-[linear-gradient(to_bottom,rgba(11,28,45,0.55)_0%,rgba(11,28,45,0)_20%),linear-gradient(to_right,#0B1C2D_30%,rgba(11,28,45,0.6)_45%,rgba(11,28,45,0)_62%)]"
        />
        <div className="site-container absolute inset-x-0 bottom-0 pb-12 lg:pb-24">
          <h1 id={`${id}-title`} className="t-display-l max-w-[14ch]">
            {hero.headline}
          </h1>
          <p className="t-lead mt-4 max-w-[34ch] text-white/88 lg:mt-5 lg:max-w-[30ch]">{hero.line}</p>
          <ButtonLink href="#plan" className="mt-7 lg:mt-8">
            {hero.cta ?? plan.cta}
          </ButtonLink>
        </div>
      </section>

      {/* 2. What we do */}
      <section aria-labelledby={`${id}-what`} className="section-y">
        <div className="site-container">
          <SectionHeading
            id={`${id}-what`}
            label={whatWeDo.label}
            heading={whatHeading}
            headingClassName="max-w-[22ch] text-balance"
          />
          {whatLead ? <p className="t-lead mt-5 max-w-[44ch] text-navy/72">{whatLead}</p> : null}
          <ul className="mt-12 border-t border-navy/12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-x-16">
            {whatWeDo.formats.map((f) => (
              <li key={f.title} className="border-b border-navy/12 py-8 lg:py-10">
                <SmallTitle>{f.title}</SmallTitle>
                <p className="t-body mt-3 text-navy/80">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How it works */}
      <section aria-labelledby={`${id}-how`} className="section-y bg-mist">
        <div className="site-container">
          <SectionHeading id={`${id}-how`} label={howItWorks.label} heading={howItWorks.heading} headingClassName="max-w-[22ch] text-balance" />
          <ol
            className={`mt-12 grid grid-cols-1 lg:mt-16 lg:gap-10 ${
              howItWorks.steps.length >= 5 ? "lg:grid-cols-5" : howItWorks.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {howItWorks.steps.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[3rem_1fr] border-t border-navy/12 py-7 lg:block lg:border-t-copper lg:pt-8 lg:pb-0"
              >
                <Numeral n={i + 1} />
                <div className="lg:mt-5">
                  <SmallTitle className="lg:text-[1.5rem]">{s.title}</SmallTitle>
                  <p className="t-body mt-2 text-navy/80 lg:mt-3">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Event stories from this service */}
      <section aria-labelledby={`${id}-stories`} className="section-y">
        <div className="site-container">
          <SectionHeading id={`${id}-stories`} label={stories.label} heading={stories.heading} />
          <ul className="mt-12 grid grid-cols-1 gap-16 lg:mt-16 lg:grid-cols-2 lg:gap-12">
            {stories.items.map((s) => {
              const pending = s.brief.startsWith("[NEEDS CLIENT");
              return (
                <li key={s.folder}>
                  <article>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes={`(min-width: 1320px) 600px, (min-width: 1024px) 46vw, ${FULL_COL}`}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="t-display-m mt-6 text-[1.75rem] lg:text-[2.25rem]">{s.title}</h3>
                    <p className="t-label mt-6 text-copper-deep">The brief</p>
                    <p className={`t-body mt-2 ${pending ? "text-navy/60 italic" : "text-navy/80"}`}>{s.brief}</p>
                    <p className="t-label mt-6 text-copper-deep">What we made</p>
                    <p className="t-body mt-2 text-navy/80">{s.whatWeMade}</p>
                  </article>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 lg:mt-14">
            <ArrowLink href="/our-work">{stories.linkLabel}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 5. Food and presentation photos */}
      <section aria-labelledby={`${id}-food`} className="section-y bg-navy text-white">
        <div className="site-container">
          <SectionHeading
            id={`${id}-food`}
            tone="dark"
            label={gallery.label}
            heading={gallery.heading}
            headingClassName="max-w-[22ch] text-balance"
          />
        </div>
        <div className="mt-10 lg:mx-auto lg:mt-20 lg:max-w-[1320px] lg:px-12">
          <ul
            aria-label="Food photographs"
            className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 after:block after:w-2 after:shrink-0 after:content-[''] lg:grid lg:snap-none lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-16 lg:overflow-visible lg:px-0 lg:after:hidden"
          >
            {gallery.images.map((img, i) => {
              const p = galleryPlaces[i % galleryPlaces.length];
              return (
                <li key={img.src} className={`relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden lg:w-auto ${p.place}`}>
                  <GalleryPhoto img={img} crop={galleryCrops[img.src]} sizes={p.sizes} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. Other services */}
      <section aria-labelledby={`${id}-others`} className="section-y">
        <div className="site-container">
          <SectionHeading id={`${id}-others`} heading={otherServices.label} />
          <ul className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-12">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} tabIndex={-1} aria-hidden="true" className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={s.heroImage.src}
                      alt=""
                      fill
                      sizes={`(min-width: 1320px) 400px, (min-width: 1024px) 30vw, ${FULL_COL}`}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
                <SmallTitle className="mt-5">{s.name}</SmallTitle>
                <p className="t-body mt-2 text-navy/72">{s.promise}</p>
                <ArrowLink href={s.href} className="mt-2">
                  {s.linkLabel}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
