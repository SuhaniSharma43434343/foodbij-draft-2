import Image from "next/image";
import { ArrowLink } from "@/components/ArrowLink";
import { SectionHeading } from "@/components/SectionHeading";
import { home, services } from "@/content/site";

/** The four services. Phone: stacked cards (4:5 image). Desktop: alternating split rows, image 7 cols, text 5. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="site-container">
        <SectionHeading id="services-title" label={home.servicesIntro.label} heading={home.servicesIntro.heading} />

        <ol className="mt-12 flex flex-col gap-16 lg:mt-20 lg:gap-32">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.slug} className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div
                  className={`relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-[6/5] ${
                    flip ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  <Image
                    src={s.heroImage.src}
                    alt={s.heroImage.alt}
                    fill
                    sizes="(min-width: 1320px) 714px, (min-width: 1024px) 56vw, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <p className="font-display text-[1.75rem] leading-none font-medium text-copper" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="t-display-m mt-3">{s.name}</h3>
                  <p className="t-body mt-4 text-navy/72">{s.blurb}</p>
                  <ArrowLink href={s.href} className="mt-4">
                    {s.linkLabel}
                  </ArrowLink>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
