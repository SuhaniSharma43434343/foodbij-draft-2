"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** True on the approved /sketch reference pages, which keep their own chrome. */
export function useIsSketch() {
  return (usePathname() ?? "").startsWith("/sketch");
}

/** Renders nothing on /sketch; lets server-rendered chrome (the footer) skip those pages. */
export function HideOnSketch({ children }: { children: ReactNode }) {
  return useIsSketch() ? null : <>{children}</>;
}
