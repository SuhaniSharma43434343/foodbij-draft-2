import type { CSSProperties, ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** "scroll": rises when scrolled into view. "load": rises on page load (first screen only). */
  trigger?: "scroll" | "load";
  /** Start delay in ms. */
  delay?: number;
  /** Force a line break after these words (1-based word index), for set display lines. */
  breakAfter?: number[];
};

/**
 * Display type that rises word by word out of a mask. The words are real text in the HTML, so
 * screen readers, search and no-JS visitors get the plain heading; only the motion is extra.
 */
export function RevealText({ text, as: Tag = "h2", className = "", id, trigger = "scroll", delay = 0, breakAfter = [] }: Props) {
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      className={`rt ${trigger === "load" ? "rt-load" : ""} ${className}`}
      data-reveal={trigger === "scroll" ? "text" : undefined}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="rw">
            <span className="rw-i" style={{ "--i": i } as CSSProperties}>
              {w}
            </span>
          </span>
          {breakAfter.includes(i + 1) ? <br /> : i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
