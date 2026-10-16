import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps each page so React's <ViewTransition> animates route changes (Next.js runs navigations as
 * transitions). Link clicks carry the "page" type: the old page lifts away onto navy and the new one
 * rises in. Back/forward carry no type and get a short crossfade. CSS: "Page transitions" in globals.css.
 * It lives in each page, not the layout: layouts persist across navigations, so enter/exit never fire there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "page-fade-in" }}
      exit={{ page: "page-out", default: "page-fade-out" }}
      default="none"
    >
      <div className="page">{children}</div>
    </ViewTransition>
  );
}
