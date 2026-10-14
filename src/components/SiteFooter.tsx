import Image from "next/image";
import Link from "next/link";
import { PLAN_HREF, services, site } from "@/content/site";
import { HideOnSketch } from "./HideOnSketch";

const foodbizLinks = [
  { label: "Our work", href: "/our-work" },
  { label: "Our story", href: "/our-story" },
  { label: site.headerCta, href: PLAN_HREF },
];

const linkClass = "inline-flex min-h-11 items-center text-[16px] text-white/80 transition-colors hover:text-white";

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return <p className="t-label text-copper">{children}</p>;
}

/** Site footer (navy), all copy from src/content/site.ts. Hidden on /sketch. */
export function SiteFooter() {
  const { contact, footer } = site;
  return (
    <HideOnSketch>
      <footer className="border-t border-white/12 bg-navy text-white">
        <div className="site-container pt-16 pb-10 lg:pt-24">
          <Link href="/" aria-label="Foodbiz, home" className="inline-block">
            <Image
              src="/logos/foodbiz-2026-white-1200w.png"
              alt="Foodbiz"
              width={1200}
              height={274}
              sizes="(min-width: 1024px) 170px, 132px"
              className="h-auto w-[132px] lg:w-[170px]"
            />
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <nav aria-label="Services" className="lg:col-span-4">
              <ColumnLabel>Services</ColumnLabel>
              <ul className="mt-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className={linkClass}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Foodbiz" className="lg:col-span-4">
              <ColumnLabel>{site.name}</ColumnLabel>
              <ul className="mt-3">
                {foodbizLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-4">
              <ColumnLabel>Contact</ColumnLabel>
              <ul className="mt-3 text-[16px] leading-[1.6] text-white/80">
                <li className="py-[10px]">{contact.phone}</li>
                <li className="py-[10px]">{contact.email}</li>
                <li className="py-[10px]">{contact.address}</li>
                <li>
                  <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram {contact.instagram.handle}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-16 font-display text-[1.5rem] leading-[1.2] font-medium text-white/90 italic">
            {footer.closer}
          </p>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/12 pt-6 text-[14px] text-white/72 lg:flex-row lg:items-center lg:justify-between">
            <p>{footer.copyright}</p>
            <ul className="flex gap-6">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </HideOnSketch>
  );
}
