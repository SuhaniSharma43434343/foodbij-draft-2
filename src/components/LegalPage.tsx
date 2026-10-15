import type { LegalPage as Data } from "@/content/pages";
import { Txt } from "./Txt";

export function LegalPage({ data }: { data: Data }) {
  return (
    <article className="pb-[var(--section)] pt-[calc(var(--header-h)+48px)] lg:pt-[calc(var(--header-h)+88px)]">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
        <header className="lg:col-span-4">
          <h1 className="t-h1">{data.heading}</h1>
          <p className="muted mt-4 text-[0.9375rem]">
            Updated: <Txt>{data.updated}</Txt>
          </p>
          <p className="muted mt-2 text-[0.9375rem]">{data.draft}</p>
        </header>
        <div className="max-w-[40rem] lg:col-span-7 lg:col-start-6">
          {data.sections.map((s) => (
            <section key={s.heading} className="border-t border-[var(--line)] py-8 first:border-t-0 first:pt-0">
              <h2 className="t-h3">{s.heading}</h2>
              {s.paragraphs.map((t, i) => (
                <p key={i} className="mt-4">
                  <Txt>{t}</Txt>
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
