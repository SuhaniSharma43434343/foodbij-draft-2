/**
 * Fine film grain over a navy "evening" band (W9.4), so warm night photos glow. Decorative, static.
 * Put it as a child of a positioned section/stage: <section className="relative ..."><Grain />...</section>.
 * It fills the parent, ignores the pointer and is painted with one tiny SVG noise tile (CSS `.grain` in the
 * shared block of globals.css): no canvas, no per-frame work, no animation (so nothing to switch off under
 * reduced motion). Pass `className` to tune it, e.g. "z-[1]" to sit above photos.
 */
export function Grain({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`grain ${className}`.trim()} />;
}
