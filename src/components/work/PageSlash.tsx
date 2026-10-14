/**
 * The copper "/" from the FOODB/Z wordmark, small, beside an inner page's label. It draws in on first paint
 * (pure CSS, .pm-slash in pages-motion.css; resting state is drawn, so it is there without JS and under
 * reduced motion). Same mark as the home opening's CopperSlash, kept separate so these pages do not pull in
 * the home stylesheet.
 */
export function PageSlash({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 30" className={`pm-slash ${className}`.trim()}>
      <line x1="1.5" y1="28.5" x2="14.5" y2="1.5" pathLength={1} />
    </svg>
  );
}
