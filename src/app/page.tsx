// Placeholder homepage (W3.1): only here to check the shared chrome. The real homepage is built
// in a later task on top of src/components/ and src/content/site.ts.
import { ArrowLink } from "@/components/ArrowLink";
import { ButtonLink } from "@/components/Button";
import { PlanBand } from "@/components/PlanBand";
import { SectionHeading } from "@/components/SectionHeading";
import { PLAN_HREF, home, services } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Stand-in for the opening (no photo yet), so the overlay header has a dark ground. */}
      <section data-hide-sticky aria-label="Opening" className="flex min-h-[80svh] items-end bg-navy text-white">
        <div className="site-container pb-14 lg:pb-24">
          <h1 className="t-display-xl max-w-[13ch]">{home.opening.headline}</h1>
          <p className="t-lead mt-5 max-w-[34ch] lg:max-w-[44ch]">{home.opening.lead}</p>
          <ButtonLink href={PLAN_HREF} className="mt-8">
            {home.opening.cta}
          </ButtonLink>
        </div>
      </section>

      <section id="services" aria-labelledby="services-title" className="section-y">
        <div className="site-container">
          <SectionHeading id="services-title" label={home.servicesIntro.label} heading={home.servicesIntro.heading} />
          <ul className="mt-10 flex flex-col gap-8">
            {services.map((s) => (
              <li key={s.slug}>
                <h3 className="t-display-m">{s.name}</h3>
                <p className="t-body mt-3 text-navy/72">{s.blurb}</p>
                <ArrowLink href={s.href} className="mt-2">
                  {s.linkLabel}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PlanBand {...home.plan} />
    </>
  );
}
