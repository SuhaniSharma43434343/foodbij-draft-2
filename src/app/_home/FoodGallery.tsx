import { home } from "@/content/site";
import { GalleryMotion } from "./gallery/GalleryMotion";
import "./gallery-motion.css";

/**
 * Navy food band, "a magazine spread of the food" (motion spec, Expressive pass W7 item 4).
 * - Desktop (>=1024px, JS + motion allowed): the band pins and the row of frames travels sideways with
 *   scroll, driven by useScrollProgress (--p 0..1); each photo drifts against its frame (counter-parallax)
 *   and a copper line fills along the bottom.
 * - Phone (<1024px): a native scroll-snap carousel; the centred slide is full size and bright, its
 *   neighbours scale down and dim (IntersectionObserver toggles `is-active`); "01 / 06" counter below.
 * - No JS / reduced motion: desktop shows the static asymmetric grid, phone the plain scroll-snap row.
 * Behaviour lives in ./gallery/GalleryMotion.tsx, all CSS in ./gallery-motion.css.
 */
export function FoodGallery() {
  const { label, heading, images } = home.food;
  return <GalleryMotion label={label} heading={heading} images={images.map(({ src, alt }) => ({ src, alt }))} />;
}
