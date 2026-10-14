/**
 * Opening headline split into lines that rise into place on first paint (pure CSS, no JS gate).
 * Each line is an overflow-hidden wrapper (`.hero-line`) whose inner span starts 0.35em low and rises,
 * 700ms, 80ms apart. Opacity stays 1 throughout, so the headline counts for LCP at once.
 *
 * Pass `lines` explicitly, or a `text` that is split at sentence ends: every sentence but the last on line
 * one, the last sentence on line two (each line still wraps naturally at 360px).
 * Use inside any heading: <h1 className="t-display-xl"><HeroLines text={headline} /></h1>
 */
export function HeroLines({ text, lines }: { text?: string; lines?: string[] }) {
  const parts = lines ?? splitHeadline(text ?? "");
  return (
    <>
      {parts.map((line, i) => (
        <span key={i} className="hero-line" style={{ "--line": i } as React.CSSProperties}>
          <span className="hero-line-inner">{line}</span>
          {i < parts.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function splitHeadline(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length < 2) return [text];
  return [sentences.slice(0, -1).join(" "), sentences[sentences.length - 1]];
}
