import Link from "next/link";
import type { CSSProperties } from "react";
import type { ServicePageData } from "@/content/services";
import { getService, PLAN_HREF, services } from "@/content/site";
import { storiesBySlug } from "@/content/stories";
import { Close } from "./Close";
import { Gallery } from "./Gallery";
import { Photo } from "./Photo";
import { Txt } from "./Txt";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** The shared service page: same order on all four, varied by photography and which side things sit. */
export function ServicePage({ data, flip = false }: { data: ServicePageData; flip?: boolean }) {
  const service = getService(data.slug);
  const stories = storiesBySlug(data.stories).slice(0, 3);
  const others = services.filter((s) => s.slug !== data.slug);
  const planHref = `${PLAN_HREF}?type=${data.slug}`;

  return (
    <>
      {/* 1-3. Hero: the photograph, the service name, one promise, the enquiry action. */}
      <section className="pt-[var(--header-h)] lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8" aria-labelledby="svc-title">
        <div className={`lg:col-span-7 lg:row-start-1 ${flip ? "lg:col-start-1" : "lg:col-start-6"}`}>
          <Photo img={data.hero.image} sizes="(min-width: 1024px) 58vw, 100vw" preload className="aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full" />
        </div>
        <div
          className={`wrap flex flex-col justify-end pb-14 pt-8 lg:row-start-1 lg:pb-[clamp(48px,8vh,96px)] lg:pt-0 ${
            flip ? "lg:col-span-4 lg:col-start-9 lg:pl-0" : "lg:col-span-4 lg:col-start-1 lg:pr-0"
          }`}
        >
          <Link href="/#services" className="t-meta muted hero-in inline-flex min-h-[44px] items-center gap-2 self-start" style={d(200)}>
            Services <span className="text-[var(--copper)]" aria-hidden="true">/</span>
          </Link>
          <h1 id="svc-title" className="t-h1 hero-in mt-1" style={d(300)}>
            {service.name}
          </h1>
          <p className="t-lead muted hero-in mt-5 max-w-[36ch]" style={d(420)}>
            {data.hero.promise}
          </p>
          <div className="hero-in mt-8" style={d(540)}>
            <Link href={planHref} className="btn">
              {data.hero.cta} <span className="arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. What we cover. */}
      <section className="section" aria-labelledby="cover-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className={`lg:col-span-6 lg:row-start-1 ${flip ? "lg:col-start-7" : "lg:col-start-1"}`}>
            <h2 id="cover-title" className="t-h2 max-w-[16ch]" data-reveal="up">
              {data.cover.heading}
            </h2>
            <ul className="mt-10 border-t border-[var(--line)]">
              {data.cover.formats.map((f, i) => (
                <li key={f.title} className="grid gap-1 border-b border-[var(--line)] py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8" data-reveal="up" style={d(i * 70)}>
                  <h3 className="serif text-[1.375rem] leading-tight lg:text-[1.5rem]">{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`lg:col-span-5 lg:row-start-1 lg:self-start ${flip ? "lg:col-start-1" : "lg:col-start-8"}`}>
            <Photo img={data.cover.image} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 100vw" drift className={flip ? "max-lg:mr-[14%]" : "max-lg:ml-[14%]"} />
          </div>
        </div>
      </section>

      {/* 5. How it works: numbered, because the order is the point. */}
      <section className="on-dark section" aria-labelledby="steps-title">
        <div className="wrap">
          <h2 id="steps-title" className="t-h2 max-w-[18ch]" data-reveal="up">
            {data.steps.heading}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {data.steps.items.map((s, i) => (
              <li key={s.title} className="border-t border-[var(--line-dark)] pt-6" data-reveal="up" style={d(i * 90)}>
                <span className="serif text-[1.25rem] text-[var(--copper-soft)]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-3 text-[1.625rem] leading-tight">{s.title}</h3>
                <p className="muted mt-3 max-w-[32ch]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Event stories from this service. */}
      {stories.length > 0 && (
        <section className="section" aria-labelledby="stories-title">
          <div className="wrap">
            <h2 id="stories-title" className="t-h2" data-reveal="up">
              From our work
            </h2>
            <ul className="mt-12 space-y-20 lg:mt-16 lg:space-y-28">
              {stories.map((s, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={s.slug} className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <Link
                      href={`/our-work/${s.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`lift block lg:row-start-1 ${i === 0 ? "lg:col-span-7" : "lg:col-span-6"} ${right ? (i === 0 ? "lg:col-start-6" : "lg:col-start-7") : "lg:col-start-1"}`}
                    >
                      <Photo img={s.images[0]} ratio={i === 0 ? "3 / 2" : "4 / 3"} sizes="(min-width: 1024px) 55vw, 100vw" />
                    </Link>
                    <div className={`lg:row-start-1 lg:col-span-4 ${right ? "lg:col-start-1" : "lg:col-start-9"}`}>
                      <h3 className="t-h3" data-reveal="up">
                        {s.title}
                      </h3>
                      <p className="muted mt-3 max-w-[40ch]" data-reveal="up" style={d(90)}>
                        {s.summary}
                      </p>
                      <Link href={`/our-work/${s.slug}`} className="tlink mt-4" data-reveal="up" style={d(160)}>
                        <span className="uline">Read the story</span>
                        <span className="arrow" aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* 7. Photographs. */}
      <section className="pb-[var(--section)]" aria-label="Photographs">
        <Gallery images={data.gallery} label={`${service.name}: photographs`} />
        {data.galleryNote && (
          <p className="wrap mt-6">
            <Txt>{data.galleryNote}</Txt>
          </p>
        )}
      </section>

      {/* 8. The other services. */}
      <section className="border-t border-[var(--line)] py-16 lg:py-24" aria-labelledby="others-title">
        <div className="wrap">
          <h2 id="others-title" className="t-h3">
            Other occasions
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-8">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="lift group grid grid-cols-[96px_1fr] items-center gap-5 md:block">
                  <Photo img={s.image} ratio="4 / 3" sizes="(min-width: 768px) 30vw, 96px" reveal={false} />
                  <span className="serif flex items-center justify-between gap-4 text-[1.375rem] leading-tight md:mt-4 lg:text-[1.625rem]">
                    <span className="uline [background-size:0_1px] group-hover:[background-size:100%_1px]">{s.name}</span>
                    <span className="arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Plan your event, preset to this service. */}
      <Close heading={data.close.heading} lead={data.close.lead} service={data.slug} />
    </>
  );
}
