import Image from "next/image";
import Link from "@/components/Link";
import { PLAN_HREF, services, site } from "@/content/site";

function Needs({ children }: { children: string }) {
  return children.startsWith("[NEEDS CLIENT") ? <span className="needs-client">{children}</span> : <>{children}</>;
}

export function Footer() {
  const c = site.contact;
  return (
    <footer className="on-dark" data-cta-zone>
      <div className="wrap pb-10 pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Foodbiz, home" className="relative flex h-[44px] w-[132px] items-center lg:w-[166px]">
              <Image src="/logos/foodbiz-2026-white-400w.webp" alt="" width={400} height={91} className="h-full w-full object-contain object-left" />
            </Link>
            <p className="muted mt-6 max-w-[30ch]">Catering and hospitality, Mumbai.</p>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="t-meta text-[var(--copper-soft)]">Services</h2>
            <ul className="mt-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="tlink">
                    <span className="uline [background-size:0_1px] hover:[background-size:100%_1px]">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="t-meta text-[var(--copper-soft)]">Foodbiz</h2>
            <ul className="mt-3">
              {[
                { label: "Our work", href: "/our-work" },
                { label: "Our story", href: "/our-story" },
                { label: "Plan your event", href: PLAN_HREF },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="tlink">
                    <span className="uline [background-size:0_1px] hover:[background-size:100%_1px]">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-meta text-[var(--copper-soft)]">Contact</h2>
            <ul className="mt-3 space-y-3">
              <li><Needs>{c.phone}</Needs></li>
              <li><Needs>{c.email}</Needs></li>
              <li><Needs>{c.address}</Needs></li>
              <li>
                <a href={c.instagram.url} className="tlink">
                  <span className="uline">Instagram {c.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--line-dark)] pt-6 text-[0.875rem] text-[var(--on-dark-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="tlink">Privacy</Link></li>
            <li><Link href="/terms" className="tlink">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
