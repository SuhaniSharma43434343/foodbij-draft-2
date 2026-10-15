import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Photo } from "@/components/Photo";
import { Txt } from "@/components/Txt";
import { planPage as p } from "@/content/pages";
import { photos, site } from "@/content/site";

export const metadata: Metadata = p.meta;

export default function PlanPage() {
  const c = site.contact;
  return (
    <section className="pb-[var(--section)] pt-[calc(var(--header-h)+48px)] lg:pt-[calc(var(--header-h)+88px)]">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1 className="t-h1 hero-in">{p.heading}</h1>
          <p className="t-lead muted hero-in mt-5 max-w-[40ch]" style={{ "--d": "150ms" } as React.CSSProperties}>
            {p.lead}
          </p>
          <div className="mt-12">
            <Suspense fallback={null}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="contact-title">
          <Photo img={photos.cartierPink} ratio="4 / 5" sizes="(min-width: 1024px) 30vw, 100vw" className="hidden lg:block" />
          <h2 id="contact-title" className="t-h3 lg:mt-10">
            Or talk to us
          </h2>
          <dl className="mt-6 space-y-4">
            {[
              ["Phone", c.phone],
              ["WhatsApp", c.whatsapp],
              ["Email", c.email],
              ["Address", c.address],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-meta muted">{k}</dt>
                <dd className="mt-1">
                  <Txt>{v}</Txt>
                </dd>
              </div>
            ))}
            <div>
              <dt className="t-meta muted">Instagram</dt>
              <dd className="mt-1">
                <a href={c.instagram.url} className="tlink">
                  <span className="uline">{c.instagram.handle}</span>
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
