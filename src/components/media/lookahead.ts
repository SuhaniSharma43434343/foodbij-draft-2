/**
 * Image lookahead (W10.2). next/image's loading="lazy" leaves the timing to the browser, which on a phone can
 * start a photo only shortly before it scrolls in, so frames show up empty during a normal scroll. This switches
 * each lazy photo to eager once it comes within 1.5 screen heights (above or below), and within one scroller
 * width inside horizontal rows (scrollMargin, where supported). Photos further away stay lazy, so long pages
 * do not download everything up front. Started once by MotionProvider; picks up photos mounted later.
 */
const LAZY = 'img[loading="lazy"]';

export function startImageLookahead(): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const img = e.target as HTMLImageElement;
        img.loading = "eager";
        io.unobserve(img);
        // Decode ahead too, so the photo paints (and a wipe can open) the moment it scrolls in.
        const predecode = () => void img.decode().catch(() => {});
        if (img.complete) predecode();
        else img.addEventListener("load", predecode, { once: true });
      }
    },
    // scrollMargin extends nested scroll containers (carousels); browsers without it ignore the option.
    { rootMargin: "150% 0px 150% 0px", scrollMargin: "0px 100%" } as IntersectionObserverInit,
  );
  const watch = (root: ParentNode) => root.querySelectorAll<HTMLImageElement>(LAZY).forEach((img) => io.observe(img));
  watch(document);
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      r.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        const el = n as Element;
        if (el.matches(LAZY)) io.observe(el);
        else watch(el);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
  return () => {
    mo.disconnect();
    io.disconnect();
  };
}

/** True when `el` is already well inside the screen (its top edge above 90% of the viewport height). */
export function isInView(el: Element): boolean {
  return el.getBoundingClientRect().top < window.innerHeight * 0.9;
}

/**
 * For photo reveals (a wipe must never unveil an empty frame). Resolves when the frame may open:
 * - at once if the frame is already in view (it shows its photo, or its placeholder colour, straight away), else
 * - when its first photo has loaded and decoded, or
 * - when the frame comes 10% into the screen first (it then opens on its placeholder colour instead of staying
 *   hidden while the photo finishes), or
 * - after `maxMs` (800ms), so nothing can stay hidden.
 * The result is `true` when the frame is still at or below the bottom edge (play the reveal) and `false` when it
 * is already in view (show it without animating).
 */
export function whenPhotoReady(el: Element, maxMs = 800): Promise<boolean> {
  const img = el.querySelector("img");
  if (!img || isInView(el)) return Promise.resolve(!isInView(el));
  if (img.loading === "lazy") img.loading = "eager";
  const decode = () => img.decode().catch(() => {});
  const ready =
    img.complete
      ? img.naturalWidth > 0
        ? decode()
        : Promise.resolve()
      : new Promise<void>((resolve) => {
          img.addEventListener("load", () => decode().then(resolve), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
  // A scroll check, not an IntersectionObserver: a fully clipped wipe frame is a zero-area target.
  let onScroll = () => {};
  const reachesView = new Promise<void>((resolve) => {
    onScroll = () => isInView(el) && resolve();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
  const timeout = new Promise<void>((r) => window.setTimeout(r, maxMs));
  return Promise.race([ready, reachesView, timeout]).then(() => {
    window.removeEventListener("scroll", onScroll);
    return !isInView(el);
  });
}
