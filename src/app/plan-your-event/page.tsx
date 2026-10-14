import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/plan/EnquiryForm";
import { PresetEnquiryForm } from "@/components/plan/PresetEnquiryForm";
import { planPage } from "@/content/pages";

export const metadata: Metadata = {
  title: planPage.meta.title,
  description: planPage.meta.description,
};

/** Plan your event: a short intro with contact lines, and the enquiry form (solid header). */
export default function PlanYourEventPage() {
  const { label, heading, lead, body, contact } = planPage;
  return (
    <section aria-labelledby="plan-page-title" className="pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="t-label text-copper-deep">{label}</p>
          <h1 id="plan-page-title" className="t-display-l mt-4 max-w-[14ch] text-navy">
            {heading}
          </h1>
          <p className="t-lead mt-5 max-w-[34ch] text-navy">{lead}</p>
          <p className="t-body mt-4 text-navy/80">{body}</p>

          <div className="mt-10 border-t border-navy/12 pt-8 lg:mt-14">
            <h2 className="t-label text-copper-deep">{contact.label}</h2>
            <dl className="mt-4">
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
