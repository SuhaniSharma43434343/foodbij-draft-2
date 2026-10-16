import Link from "@/components/Link";
import { PLAN_HREF, type Img, type ServiceSlug } from "@/content/site";
import { Photo } from "./Photo";

type Props = {
  heading: string;
  lead: string;
  /** With an image: a full-bleed photograph closes the page. Without: a quiet navy band. */
  image?: Img;
  /** Presets the enquiry form's type of event. */
  service?: ServiceSlug;
};

/** The closing invitation: one heading, one line, one action. */
export function Close({ heading, lead, image, service }: Props) {
  const href = service ? `${PLAN_HREF}?type=${service}` : PLAN_HREF;
  const body = (
    <div className="wrap relative">
      <div className="max-w-[36rem]">
        <h2 className="t-h1" data-reveal="up">
          {heading}
        </h2>
        <p className="t-lead mt-5 text-[var(--on-dark-2)]" data-reveal="up" style={{ "--d": "120ms" } as React.CSSProperties}>
          {lead}
        </p>
        <div className="mt-9" data-reveal="up" style={{ "--d": "220ms" } as React.CSSProperties}>
          <Link href={href} className="btn btn--light">
            Plan your event <span className="arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );

  if (!image) {
    return (
      <section className="on-dark section" data-cta-zone aria-label="Plan your event">
        {body}
      </section>
    );
  }
  return (
    <section className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden pb-16 pt-40 lg:min-h-[92vh] lg:pb-24" data-cta-zone aria-label="Plan your event">
      <div className="absolute inset-0 -z-10">
        <Photo img={image} sizes="100vw" className="h-full w-full" drift reveal={false} />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,28,45,0.92)_0%,rgba(11,28,45,0.55)_45%,rgba(11,28,45,0.25)_100%)]" />
      </div>
      {body}
    </section>
  );
}
