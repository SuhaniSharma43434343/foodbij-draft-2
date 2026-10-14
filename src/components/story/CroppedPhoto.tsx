import Image from "next/image";
import { photoStyle, zoomSizes } from "@/components/media/photo-bg";
import type { CroppedImg } from "@/content/pages";

type CroppedPhotoProps = {
  img: CroppedImg;
  /** Frame classes, e.g. an aspect ratio ("aspect-[4/5]"). */
  className?: string;
  sizes: string;
  /**
   * Motion (shared API in globals.css): the frame wipes in on first view (data-reveal="wipe"), the photo drifts
   * inside it on desktop scroll (data-parallax), and the desktop cursor grows into "View" over it. Off by default.
   */
  motion?: boolean;
};

/**
 * A photo in a fixed frame with art direction: `position` is the object-position, and `zoom` > 1
 * enlarges the photo around that same point (used to keep lettering or a toque out of frame).
 * The parallax layer is oversized and moves inside the frame, so it only ever shows less of the photo.
 */
export function CroppedPhoto({ img, className = "", sizes, motion = false }: CroppedPhotoProps) {
  const zoom = img.zoom ?? 1;
  const position = img.position ?? "50% 50%";
  const photo = (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={zoomSizes(sizes, zoom)}
      className="object-cover"
      style={photoStyle(img.src, {
        objectPosition: position,
        ...(zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: position } : null),
      })}
    />
  );
  if (!motion) return <div className={`relative overflow-hidden bg-mist ${className}`.trim()}>{photo}</div>;
  return (
    <div
      data-reveal="wipe"
      data-parallax=""
      data-cursor="view"
      className={`relative overflow-hidden bg-mist ${className}`.trim()}
    >
      <div className="parallax-layer">{photo}</div>
    </div>
  );
}
