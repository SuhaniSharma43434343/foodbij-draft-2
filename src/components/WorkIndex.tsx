"use client";

import { useState } from "react";
import { services, type ServiceSlug } from "@/content/site";
import type { Story } from "@/content/stories";
import { StoryCard } from "./StoryCard";

/** Our work: every story, with a quiet filter by service. */
export function WorkIndex({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<ServiceSlug | "all">("all");
  const shown = filter === "all" ? stories : stories.filter((s) => s.service === filter);
  const options: { value: ServiceSlug | "all"; label: string }[] = [
    { value: "all", label: "All" },
    ...services.map((s) => ({ value: s.slug, label: s.name })),
  ];

  return (
    <>
      <div className="wrap max-md:px-0">
        <div
          role="group"
          aria-label="Show stories for"
          className="flex gap-x-6 overflow-x-auto whitespace-nowrap [scrollbar-width:none] max-md:px-[var(--gutter)] md:flex-wrap"
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              aria-pressed={filter === o.value}
              onClick={() => setFilter(o.value)}
              className="nav-link flex-none text-[0.9375rem] text-[var(--ink-2)] aria-pressed:text-[var(--navy)]"
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} {shown.length === 1 ? "story" : "stories"}
        </p>
      </div>

      <ul className="wrap mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-6 lg:mt-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
        {shown.map((s, i) => (
          <li key={s.slug} className={i % 3 === 1 ? "lg:mt-20" : ""}>
            <StoryCard story={s} sizes="(min-width: 1024px) 30vw, 50vw" reveal={false} showService={filter === "all"} />
          </li>
        ))}
      </ul>
    </>
  );
}
