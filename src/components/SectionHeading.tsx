import type { ReactNode } from "react";

type SectionHeadingProps = {
  heading: ReactNode;
  /** Heading element (default "h2"). */
  as?: "h1" | "h2" | "h3";
  /** Type size: "m" = t-display-m (default, section titles), "l" = t-display-l, "xl" = t-display-xl. */
  size?: "m" | "l" | "xl";
  /** "light" = on white/mist (navy heading); "dark" = on navy (white heading). */
  tone?: "light" | "dark";
  /** id for the heading, to use with aria-labelledby on the section. */
  id?: string;
  className?: string;
  /** Extra classes for the heading itself (e.g. a max-width like "max-w-[22ch]"). */
  headingClassName?: string;
  /** Scroll reveal: the heading fades up (data-reveal-stagger). */
  reveal?: boolean;
};

const sizes = { m: "t-display-m", l: "t-display-l", xl: "t-display-xl" } as const;

/** The display heading used at the top of every section. */
export function SectionHeading({
  heading,
  as: Tag = "h2",
  size = "m",
  tone = "light",
  id,
  className = "",
  headingClassName = "",
  reveal = false,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={className || undefined} data-reveal-stagger={reveal ? "" : undefined}>
      <Tag
        id={id}
        className={`${sizes[size]} ${dark ? "text-white" : "text-navy"} ${headingClassName}`.trim()}
      >
        {heading}
      </Tag>
    </div>
  );
}
