import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanBand } from "@/components/PlanBand";
import { HeroLines } from "@/components/motion/HeroLines";
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
          {/* Opening (pure CSS on first paint): the title rises through its mask. */}
          <h1 id="work-title" className="t-display-l max-w-[18ch] text-balance text-navy">
            <HeroLines lines={[work.heading]} />
          </h1>
          <Suspense fallback={<WorkGridView />}>
            <WorkGrid />
          </Suspense>
        </div>
      </section>
      <PlanBand heading={work.plan.heading} lead={work.plan.lead} cta={work.plan.cta} />
    </>
  );
}
