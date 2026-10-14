import type { LegalPage as LegalPageContent } from "@/content/pages";

/** Plain, readable legal page: H1, updated line, draft note, one H2 per section (~68ch wide). */
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <article aria-labelledby="legal-title" className="pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="site-container">
        <div className="max-w-[68ch]">
          <h1 id="legal-title" className="t-display-l text-navy">
            {page.heading}
          </h1>
          <p className="mt-5 text-[14px] leading-[1.5] text-navy/72">{page.updated}</p>
          <p className="mt-6 border-l-2 border-copper bg-mist px-5 py-4 text-[15px] leading-[1.5] font-medium text-navy">
            {page.draftNote}
          </p>
          {page.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="font-display text-[1.625rem] leading-[1.2] font-medium text-navy lg:text-[1.875rem]">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="t-body mt-4 max-w-none text-navy/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
