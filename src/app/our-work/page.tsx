import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanBand } from "@/components/PlanBand";
import { SectionHeading } from "@/components/SectionHeading";
import { work } from "@/content/stories";
import { WorkGrid, WorkGridView } from "./WorkGrid";

export const metadata: Metadata = {
  title: "Our work",
  description: "Event stories from Foodbiz: weddings, celebrations, brand launches and corporate dining.",
};

/** Our work: every event story, filterable by service (?service=<slug>). Solid header page. */
export default function OurWorkPage() {
  return (
    <>
      <section aria-labelledby="work-title" className="pt-12 pb-[72px] lg:pt-20 lg:pb-32">
        <div className="site-container">
          <SectionHeading
            as="h1"
            size="l"
            id="work-title"
            label={work.label}
            heading={work.heading}
            headingClassName="max-w-[18ch] text-balance"
          />
          <p className="t-lead mt-5 max-w-[44ch] text-navy/72">{work.intro}</p>
          <Suspense fallback={<WorkGridView />}>
            <WorkGrid />
          </Suspense>
        </div>
      </section>
      <PlanBand heading={work.plan.heading} lead={work.plan.lead} cta={work.plan.cta} phoneLine={work.plan.phoneLine} />
    </>
  );
}
