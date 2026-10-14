import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small uppercase label above the heading, e.g. "What we do". Optional. */
  label?: string;
  heading: ReactNode;
  /** Heading element (default "h2"). */
  as?: "h1" | "h2" | "h3";
  /** Type size: "m" = t-display-m (default, section titles), "l" = t-display-l, "xl" = t-display-xl. */
  size?: "m" | "l" | "xl";
  /** "light" = on white/mist (copper-deep label, navy heading); "dark" = on navy (copper label, white heading). */
  tone?: "light" | "dark";
  /** id for the heading, to use with aria-labelledby on the section. */
  id?: string;
  className?: string;
  /** Extra classes for the heading itself (e.g. a max-width like "max-w-[22ch]"). */
  headingClassName?: string;
};

const sizes = { m: "t-display-m", l: "t-display-l", xl: "t-display-xl" } as const;

/** Label + display heading pair used at the top of every section. */
export function SectionHeading({
  label,
  heading,
  as: Tag = "h2",
  size = "m",
  tone = "light",
  id,
  className = "",
  headingClassName = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={className || undefined}>
      {label ? <p className={`t-label ${dark ? "text-copper" : "text-copper-deep"}`}>{label}</p> : null}
      <Tag
        id={id}
        className={`${sizes[size]} ${label ? "mt-4" : ""} ${dark ? "text-white" : "text-navy"} ${headingClassName}`.trim()}
      >
        {heading}
      </Tag>
    </div>
  );
}
