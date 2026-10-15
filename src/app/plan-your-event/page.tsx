import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/plan/EnquiryForm";
import { PresetEnquiryForm } from "@/components/plan/PresetEnquiryForm";
import { HeroLines } from "@/components/motion/HeroLines";
import { planPage } from "@/content/pages";
import "@/components/work/pages-motion.css";

export const metadata: Metadata = {
  title: planPage.meta.title,
  description: planPage.meta.description,
};

/**
 * Plan your event: a short intro with contact lines, and the enquiry form (solid header).
 * Motion stays calm here (W8.3): the title rises through its mask, the intro and contact
 * block fade up (pure CSS on first paint), the form's fields rise in a short cascade on first view
 * (EnquiryForm; never hidden for long, never blocks typing), and the "Not sent" panel slides in.
 */
export default function PlanYourEventPage() {
  const { heading, lead, contact } = planPage;
  return (
    <section aria-labelledby="plan-page-title" className="pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h1 id="plan-page-title" className="t-display-l max-w-[14ch] text-navy">
            <HeroLines lines={[heading]} />
          </h1>
          <p className="hero-fade t-lead mt-5 max-w-[34ch] text-navy [--d:260ms]">{lead}</p>

          <div className="hero-fade relative mt-10 pt-8 lg:mt-14 [--d:420ms]">
            {/* The divider draws in from the left as the contact block arrives (instant if already on screen). */}
            <span aria-hidden="true" data-reveal="rule" className="absolute inset-x-0 top-0 h-px bg-navy/12" />
            <h2 className="sr-only">{contact.label}</h2>
            <dl>
              {contact.lines.map((line) => (
                <div key={line.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 py-2">
                  <dt className="text-[14px] text-navy/68">{line.label}</dt>
                  <dd className="text-[16px] leading-[1.5] break-words text-navy">
                    {line.href ? (
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-copper-deep underline decoration-copper/40 underline-offset-4 hover:decoration-copper"
                      >
                        {line.value}
                      </a>
                    ) : (
                      line.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Suspense fallback={<EnquiryForm />}>
            <PresetEnquiryForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
