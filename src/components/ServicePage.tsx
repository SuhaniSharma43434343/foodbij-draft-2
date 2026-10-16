import Link from "@/components/Link";
import type { CSSProperties, ReactNode } from "react";
import type { ServicePageData, Variant } from "@/content/services";
import { getService, PLAN_HREF, services } from "@/content/site";
import { storiesBySlug } from "@/content/stories";
import { Gallery } from "./Gallery";
import { PageTransition } from "./PageTransition";
import { Photo } from "./Photo";
import { RevealText } from "./RevealText";
import { Txt } from "./Txt";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Where each section sits in each mood: dark (navy), linen or white. */
const THEME: Record<Variant, { cover: string; steps: string }> = {
  cinematic: { cover: "on-dark", steps: "bg-[var(--linen)]" },
  intimate: { cover: "bg-[var(--linen)]", steps: "on-dark" },
  stage: { cover: "on-dark", steps: "" },
  precise: { cover: "", steps: "on-dark" },
};

/**
 * The service page. One order on all four (hero, what we cover, how it works, stories, photographs,
 * other services, plan), but each has its own hero composition and light/dark rhythm.
 */
export function ServicePage({ data }: { data: ServicePageData }) {
  const service = getService(data.slug);
  const theme = THEME[data.variant];
  const planHref = `${PLAN_HREF}?type=${data.slug}`;

  // One page never shows the same photograph twice.
  const used = new Set([data.hero.image.src, data.cover.image.src, ...(data.hero.extra ?? []).map((i) => i.src)]);
  const stories = storiesBySlug(data.stories)
    .slice(0, 3)
    .map((s) => {
      const card = s.images.find((im) => !used.has(im.src)) ?? s.images[0];
      used.add(card.src);
      return { ...s, card };
    });
  const pool = data.gallery.filter((im) => !used.has(im.src));
  // The closing invitation takes the last unused photograph when there are enough to spare.
  const closeImg = pool.length > 3 ? pool[pool.length - 1] : null;
  const gallery = closeImg ? pool.slice(0, -1) : pool;
  const others = services.filter((s) => s.slug !== data.slug);

  const cta = (light: boolean) => (
    <Link href={planHref} className={`btn ${light ? "btn--light" : ""}`}>
      {data.hero.cta} <span className="arrow" aria-hidden="true" />
    </Link>
  );
  const crumb = (dark: boolean) => (
    <Link href="/#services" className={`t-meta hero-in inline-flex min-h-[44px] items-center gap-2 ${dark ? "text-[var(--on-dark-2)]" : "muted"}`} style={d(150)}>
      Services <span className={dark ? "text-[var(--copper-soft)]" : "text-[var(--copper)]"} aria-hidden="true">/</span>
    </Link>
  );
  // Each mood has its own tempo: slow and warm for weddings, quick and punchy for launches.
  const stagger = { cinematic: 75, intimate: 55, stage: 32, precise: 40 }[data.variant];
  const title = (cls: string) => (
    <RevealText as="h1" id="svc-title" text={service.name} trigger="load" delay={250} stagger={stagger} className={cls} />
  );

  let hero: ReactNode;
  if (data.variant === "cinematic") {
    // Full-bleed, dark and warm: the photograph is the page.
    hero = (
      <section data-variant={data.variant} className="hero" aria-labelledby="svc-title">
        <div className="hero-media">
          <Photo img={data.hero.image} sizes="100vw" className="h-full w-full" preload />
        </div>
        <div className="hero-content">
          <div className="wrap">
            {crumb(true)}
            {title("t-mega")}
            <div className="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end">
              <p className="t-lead hero-in max-w-[36ch] text-[var(--on-dark-2)] lg:col-span-5" style={d(700)}>
                {data.hero.promise}
              </p>
              <div className="hero-in lg:col-span-4" style={d(850)}>
                {cta(true)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (data.variant === "intimate") {
    // Linen and close: a tall photograph with a second one set into its corner.
    const [small] = data.hero.extra ?? [];
    hero = (
      <section data-variant={data.variant} className="bg-[var(--linen)] pb-24 pt-[var(--header-h)] lg:pb-32" style={{ "--inset-bg": "var(--linen)" } as CSSProperties} aria-labelledby="svc-title">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <Photo img={data.hero.image} sizes="(min-width: 1024px) 50vw, 100vw" preload className="sv-wipe-l aspect-[4/5] lg:aspect-auto lg:h-[calc(100svh-var(--header-h))]" drift />
            {small && (
              <div className="hero-inset absolute -bottom-16 left-[var(--gutter)] w-[40%] lg:-bottom-20 lg:-left-[16%] lg:w-[36%]">
                <Photo img={small} ratio="3 / 4" sizes="(min-width: 1024px) 18vw, 40vw" className="inset-frame" reveal={false} eager />
              </div>
            )}
          </div>
          <div className="wrap flex flex-col justify-center pt-24 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-0 lg:pt-0">
            {crumb(false)}
            {title("t-big lg:max-w-[10ch]")}
            <p className="t-lead muted hero-in mt-6 max-w-[34ch]" style={d(600)}>
              {data.hero.promise}
            </p>
            <div className="hero-in mt-8" style={d(750)}>
              {cta(false)}
            </div>
          </div>
        </div>
      </section>
    );
  } else if (data.variant === "stage") {
    // Navy and big: the name across the page, then a row of photographs at different scales.
    const [a, b] = data.hero.extra ?? [];
    hero = (
      <section data-variant={data.variant} className="on-dark overflow-hidden pb-20 pt-[calc(var(--header-h)+40px)] lg:pb-28 lg:pt-[calc(var(--header-h)+72px)]" aria-labelledby="svc-title">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {crumb(true)}
            {title("t-mega max-w-[12ch]")}
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="t-lead hero-in max-w-[34ch] text-[var(--on-dark-2)]" style={d(600)}>
              {data.hero.promise}
            </p>
            <div className="hero-in mt-7" style={d(750)}>
              {cta(true)}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-12 items-end gap-3 px-[var(--gutter)] lg:mt-16 lg:gap-6">
          <Photo img={data.hero.image} ratio="3 / 4" sizes="(min-width: 1024px) 30vw, 46vw" preload className="sv-rise col-span-5 lg:col-span-4" delay={250} />
          {a && <Photo img={a} ratio="4 / 3" sizes="(min-width: 1024px) 40vw, 54vw" className="sv-rise col-span-7 lg:col-span-5" preload delay={400} />}
          {b && <Photo img={b} ratio="1 / 1" sizes="22vw" className="sv-rise hidden lg:col-span-3 lg:mb-24 lg:block" preload delay={550} />}
        </div>
      </section>
    );
  } else {
    // White and exact: the name, a ruled line of facts, one wide photograph.
    hero = (
      <section data-variant={data.variant} className="pt-[calc(var(--header-h)+40px)] lg:pt-[calc(var(--header-h)+72px)]" aria-labelledby="svc-title">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {crumb(false)}
            {title("t-big max-w-[11ch]")}
            <span className="copper-rule sv-rule mt-8 w-24" aria-hidden="true" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="t-lead muted hero-in max-w-[34ch]" style={d(600)}>
              {data.hero.promise}
            </p>
            <div className="hero-in mt-7" style={d(750)}>
              {cta(false)}
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <Photo img={data.hero.image} sizes="100vw" preload className="sv-wipe-r aspect-[4/3] md:aspect-[21/9]" drift />
        </div>
      </section>
    );
  }

  return (
    <PageTransition>
      {hero}

      {/* What we cover. */}
      <section className={`${theme.cover} ${theme.cover === "on-dark" ? "tone-in" : ""} py-[var(--section)]`} aria-labelledby="cover-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className={`lg:col-span-6 lg:row-start-1 ${data.variant === "intimate" || data.variant === "precise" ? "lg:col-start-7" : "lg:col-start-1"}`}>
            <RevealText id="cover-title" text={data.cover.heading} className="t-h1 max-w-[16ch]" />
            <ul className={`mt-10 border-t ${theme.cover === "on-dark" ? "border-[var(--line-dark)]" : "border-[var(--line)]"}`}>
              {data.cover.formats.map((f, i) => (
                <li
                  key={f.title}
                  className={`grid gap-1 border-b py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8 ${theme.cover === "on-dark" ? "border-[var(--line-dark)]" : "border-[var(--line)]"}`}
                  data-reveal="up"
                  style={d(i * 70)}
                >
                  <h3 className="serif text-[1.5rem] leading-tight lg:text-[1.75rem]">{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`lg:col-span-5 lg:row-start-1 lg:self-center ${data.variant === "intimate" || data.variant === "precise" ? "lg:col-start-1" : "lg:col-start-8"}`}>
            <Photo img={data.cover.image} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 100vw" drift />
          </div>
        </div>
      </section>

      {/* How it works: the heading stays in place while the steps scroll past it (desktop), and a copper
          rule fills as you read. Native sticky positioning: the page scrolls normally. */}
      <section
        className={`steps-scope ${theme.steps} ${theme.steps === "on-dark" ? "tone-in" : ""} py-[var(--section)]`}
        aria-labelledby="steps-title"
      >
        <div className="wrap lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)]">
              <RevealText id="steps-title" text={data.steps.heading} className="t-h1 max-w-[14ch]" />
              <span className="steps-progress mt-10 hidden lg:block" aria-hidden="true">
                <span />
              </span>
            </div>
          </div>
          <ol className="steps-list mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {data.steps.items.map((s, i) => (
              <li
                key={s.title}
                className={`grid grid-cols-[3.25rem_1fr] gap-x-5 border-t py-8 lg:grid-cols-[6rem_1fr] lg:py-14 ${theme.steps === "on-dark" ? "border-[var(--line-dark)]" : "border-[var(--line)]"}`}
                data-reveal="up"
              >
                <span className={`serif text-[3rem] leading-[0.9] lg:text-[4.5rem] ${theme.steps === "on-dark" ? "text-[var(--copper-soft)]" : "text-[var(--copper-ink)]"}`} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="serif text-[1.625rem] leading-tight lg:text-[2.125rem]">{s.title}</h3>
                  <p className="muted mt-3 max-w-[40ch]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Event stories from this service: alternating, the first one larger. */}
      {stories.length > 0 && (
        <section className="py-[var(--section)]" aria-labelledby="stories-title">
          <div className="wrap">
            <RevealText id="stories-title" text="From our work" className="t-big" />
            <ul className="mt-12 space-y-20 lg:mt-20 lg:space-y-28">
              {stories.map((s, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={s.slug} className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <Link
                      href={`/our-work/${s.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`lift block lg:row-start-1 ${i === 0 ? "lg:col-span-8" : "lg:col-span-6"} ${right ? "lg:col-start-7" : "lg:col-start-1"}`}
                    >
                      <Photo img={s.card} ratio={i === 0 ? "16 / 10" : "4 / 3"} sizes="(min-width: 1024px) 60vw, 100vw" />
                    </Link>
                    <div className={`lg:row-start-1 lg:col-span-4 ${right ? "lg:col-start-1" : i === 0 ? "lg:col-start-9" : "lg:col-start-8"}`}>
                      <h3 className="t-h2" data-reveal="up">
                        {s.title}
                      </h3>
                      <p className="muted mt-4 max-w-[40ch]" data-reveal="up" style={d(90)}>
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

      {/* Photographs: a film strip at one height. */}
      {gallery.length > 0 && (
        <section className={`${data.variant === "stage" ? "on-dark tone-in py-[var(--section)]" : "pb-[var(--section)]"}`} aria-label="Photographs">
          <Gallery images={gallery} label={`${service.name}: photographs`} dark={data.variant === "stage"} />
          {data.galleryNote && (
            <p className="wrap mt-6">
              <Txt>{data.galleryNote}</Txt>
            </p>
          )}
        </section>
      )}

      {/* The other services. */}
      <section className="border-t border-[var(--line)] py-16 lg:py-24" aria-labelledby="others-title">
        <div className="wrap">
          <h2 id="others-title" className="t-h2">
            Other occasions
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-8">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="lift group grid grid-cols-[104px_1fr] items-center gap-5 md:block">
                  <Photo img={s.image} ratio="4 / 3" sizes="(min-width: 768px) 30vw, 104px" />
                  <span className="serif flex items-center justify-between gap-4 text-[1.375rem] leading-tight md:mt-5 lg:text-[1.75rem]">
                    <span className="uline [background-size:0_1px] group-hover:[background-size:100%_1px]">{s.name}</span>
                    <span className="arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plan your event, preset to this service: the hero photograph returns to close the page. */}
      <section
        className={`on-dark tone-in relative isolate overflow-hidden ${closeImg ? "flex min-h-[80svh] items-end pb-16 pt-40 lg:pb-24" : "py-[var(--section)]"}`}
        data-cta-zone
        aria-labelledby="close-title"
      >
        {closeImg && (
          <div className="absolute inset-0 -z-10">
            <Photo img={closeImg} sizes="100vw" className="h-full w-full" drift reveal={false} />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,28,45,0.95)_0%,rgba(11,28,45,0.6)_50%,rgba(11,28,45,0.3)_100%)]" />
          </div>
        )}
        <div className="wrap">
          <RevealText id="close-title" text={data.close.heading} className="t-big max-w-[14ch]" />
          <p className="t-lead mt-6 max-w-[36ch] text-[var(--on-dark-2)]" data-reveal="up" style={d(150)}>
            {data.close.lead}
          </p>
          <div className="mt-9" data-reveal="up" style={d(250)}>
            <Link href={planHref} className="btn btn--light">
              Plan your event <span className="arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
