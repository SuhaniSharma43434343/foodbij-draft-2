import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanBand } from "@/components/PlanBand";
import { HeroLines } from "@/components/motion/HeroLines";
import { PageSlash } from "@/components/work/PageSlash";
import { work } from "@/content/stories";
import { WorkGrid, WorkGridView } from "./WorkGrid";
import "@/components/work/pages-motion.css";

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
          {/* Opening (pure CSS on first paint): the slash draws in, the title rises through its mask, the lead follows. */}
          <p className="t-label flex items-center gap-3 text-copper-deep">
            <PageSlash />
            {work.label}
          </p>
          <h1 id="work-title" className="t-display-l mt-4 max-w-[18ch] text-balance text-navy">
            <HeroLines lines={[work.heading]} />
          </h1>
          <p className="hero-fade t-lead mt-5 max-w-[44ch] text-navy/72 [--d:300ms]">{work.intro}</p>
          <Suspense fallback={<WorkGridView />}>
            <WorkGrid />
          </Suspense>
        </div>
      </section>
      <PlanBand heading={work.plan.heading} lead={work.plan.lead} cta={work.plan.cta} phoneLine={work.plan.phoneLine} />
    </>
  );
}
