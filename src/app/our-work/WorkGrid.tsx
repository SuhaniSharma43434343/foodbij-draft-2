"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { StoryCard } from "@/components/work/StoryCard";
import { services, type ServiceSlug } from "@/content/site";
import { stories, work } from "@/content/stories";

type Filter = ServiceSlug | "all";

function isService(v: string | null): v is ServiceSlug {
  return services.some((s) => s.slug === v);
}

const gridClass = "mt-10 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8 lg:mt-14 lg:grid-cols-3 lg:gap-x-12";

function FilterButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`t-button inline-flex min-h-11 shrink-0 items-center border px-5 whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
        pressed ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-copper"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Service filter + story grid. The filter lives in the URL (`?service=<slug>`) so service pages
 * can link straight to a filtered view; changes use router.replace without scrolling.
 */
export function WorkGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("service");
  const active: Filter = isService(raw) ? raw : "all";

  const select = useCallback(
    (f: Filter) => {
      const next = new URLSearchParams(params.toString());
      if (f === "all") next.delete("service");
      else next.set("service", f);
      const q = next.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return <WorkGridView active={active} onSelect={select} />;
}

/**
 * The filter row and grid for a given filter. Without `onSelect` (the server render, used as the
 * Suspense fallback before the URL is read) it shows every story with "All" pressed.
 */
export function WorkGridView({ active = "all", onSelect }: { active?: Filter; onSelect?: (f: Filter) => void }) {
  const select = (f: Filter) => onSelect?.(f);
  const shown = active === "all" ? stories : stories.filter((s) => s.service === active);
  const row = useRef<HTMLDivElement>(null);

  // Phone: the filter row scrolls sideways, so bring the pressed button into view. (The row has 4px
  // of vertical padding, taken off its top margin, so the scroll box does not clip the focus ring.)
  useEffect(() => {
    const el = row.current;
    const btn = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !btn || el.scrollWidth <= el.clientWidth) return;
    const left = btn.offsetLeft - el.offsetLeft - 20;
    el.scrollTo({ left: Math.max(0, left) });
  }, [active]);

  return (
    <>
      <div
        ref={row}
        role="group"
        aria-label={work.filterLabel}
        className="-mx-5 mt-9 flex gap-2 overflow-x-auto px-5 py-1 [scrollbar-width:none] lg:mx-0 lg:mt-[52px] lg:flex-wrap lg:px-0"
      >
        <FilterButton pressed={active === "all"} onClick={() => select("all")}>
          {work.allLabel}
        </FilterButton>
        {services.map((s) => (
          <FilterButton key={s.slug} pressed={active === s.slug} onClick={() => select(s.slug)}>
            {s.shortName}
          </FilterButton>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length === 1 ? "1 story" : `${shown.length} stories`}
      </p>
      {shown.length === 0 ? (
        <p className="t-body mt-10 text-navy/72">{work.empty}</p>
      ) : (
        <ul className={gridClass}>
          {shown.map((s, i) => (
            <li key={s.slug}>
              <StoryCard story={s} preload={i === 0} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
