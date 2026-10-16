"use client";

import { useEffect } from "react";

/**
 * Browser back and forward swap pages without a view transition (Next.js restores them directly), so
 * they get their own light entrance: the arriving page fades in over 0.3s. The page that is leaving is
 * marked so only the new one animates. Nothing here touches navigation itself.
 */
export function HistoryEntrance() {
  useEffect(() => {
    let t = 0;
    const onPop = () => {
      const root = document.documentElement;
      document.querySelectorAll(".page").forEach((el) => el.setAttribute("data-leaving", ""));
      root.classList.add("pt-pop");
      window.clearTimeout(t);
      t = window.setTimeout(() => root.classList.remove("pt-pop"), 700);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.clearTimeout(t);
    };
  }, []);
  return null;
}
