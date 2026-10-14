/** The copper "/" from the FOODB/Z wordmark as a line (same drawing as the homepage opening's slash). */
export function CopperSlash({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 30" className={className} focusable="false">
      <line x1="1.5" y1="28.5" x2="14.5" y2="1.5" pathLength={1} />
    </svg>
  );
}
