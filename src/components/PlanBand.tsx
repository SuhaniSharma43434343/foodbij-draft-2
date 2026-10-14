import { PLAN_HREF } from "@/content/site";
import { ButtonLink } from "./Button";

type PlanBandProps = {
  heading: string;
  lead: string;
  /** Button label, e.g. "Plan your event". */
  cta: string;
  /** Small line under the button, e.g. "Or call ...". */
  phoneLine: string;
  /** Button target (default "/plan-your-event"; a service page may add a preset query). */
  href?: string;
};

/**
 * The navy closing band. Carries id="plan" (the sticky bar and header links jump here) and
 * data-hide-sticky (the sticky phone bar hides while it is on screen). Use once per page.
 * Motion: heading, lead, button and phone line cascade in on scroll (data-reveal-stagger).
 */
export function PlanBand({ heading, lead, cta, phoneLine, href = PLAN_HREF }: PlanBandProps) {
  return (
    <section id="plan" data-hide-sticky aria-labelledby="plan-title" className="section-y bg-navy text-white">
      <div className="site-container" data-reveal-stagger>
        <h2 id="plan-title" className="t-display-l max-w-[16ch] lg:max-w-none">
          {heading}
        </h2>
        <p className="t-lead mt-5 max-w-[40ch] text-white/80">{lead}</p>
        <div className="mt-8">
          <ButtonLink href={href}>{cta}</ButtonLink>
        </div>
        <p className="mt-5 text-[14px] leading-[1.5] text-white/72">{phoneLine}</p>
      </div>
    </section>
  );
}
