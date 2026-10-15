import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Close } from "@/components/Close";
import { Photo } from "@/components/Photo";
import { RevealText } from "@/components/RevealText";
import { Txt } from "@/components/Txt";
import { ourStory as p } from "@/content/pages";

export const metadata: Metadata = p.meta;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function OurStoryPage() {
  return (
    <>
      <section className="pt-[calc(var(--header-h)+56px)] lg:pt-[calc(var(--header-h)+96px)]">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <RevealText as="h1" text={p.heading} trigger="load" delay={150} className="t-big max-w-[12ch] lg:col-span-7" />
          <div className="space-y-5 lg:col-span-5 lg:col-start-8 lg:pt-6">
            {p.intro.map((t, i) => (
              <p key={i} className={`hero-in ${i ? "muted" : "t-lead"}`} style={d(250 + i * 120)}>
                {t}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14 lg:mt-24">
          <Photo img={p.image} ratio="21 / 9" sizes="100vw" drift className="max-md:aspect-[4/3]" />
        </div>
      </section>

      <section className="on-dark section" aria-label="The founders’ words">
        <figure className="wrap">
          <blockquote>
            <RevealText as="p" text={`“${p.quote}”`} className="t-statement" />
          </blockquote>
          <figcaption className="t-meta mt-8 text-[var(--copper-soft)]">{p.quoteBy}</figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="beliefs-title">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="beliefs-title" className="t-h2 lg:col-span-4" data-reveal="up">
            {p.beliefs.heading}
          </h2>
          <ul className="border-t border-[var(--line)] lg:col-span-7 lg:col-start-6">
            {p.beliefs.items.map((b, i) => (
              <li key={b.title} className="border-b border-[var(--line)] py-7" data-reveal="up" style={d(i * 70)}>
                <h3 className="t-h3">{b.title}</h3>
                <p className="muted mt-2 max-w-[48ch]">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--linen)] section" aria-labelledby="brief-title">
        <div className="wrap">
          <h2 id="brief-title" className="t-h2" data-reveal="up">
            {p.brief.heading}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {p.brief.steps.map((s, i) => (
              <li key={s.title} className="border-t border-[var(--line)] pt-6" data-reveal="up" style={d(i * 90)}>
                <span className="serif text-[1.25rem] text-[var(--copper-ink)]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-3 text-[1.5rem] leading-tight">{s.title}</h3>
                <p className="muted mt-3">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="founders-title">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-8">
          <h2 id="founders-title" className="t-h2 lg:col-span-4">
            {p.founders.heading}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid gap-6 sm:grid-cols-2">
              {p.founders.people.map((name) => (
                <li key={name}>
                  <p className="t-h3">{name}</p>
                  <p className="muted mt-1">Co-founder</p>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Txt>{p.founders.note}</Txt>
            </p>
          </div>
        </div>
      </section>

      <Close heading={p.close.heading} lead={p.close.lead} />
    </>
  );
}
