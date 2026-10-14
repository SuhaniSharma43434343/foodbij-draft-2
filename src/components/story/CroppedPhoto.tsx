import Image from "next/image";
import type { CroppedImg } from "@/content/pages";

type CroppedPhotoProps = {
  img: CroppedImg;
  /** Frame classes, e.g. an aspect ratio ("aspect-[4/5]"). */
  className?: string;
  sizes: string;
};

/**
 * A photo in a fixed frame with art direction: `position` is the object-position, and `zoom` > 1
 * enlarges the photo around that same point (used to keep lettering or a toque out of frame).
 */
export function CroppedPhoto({ img, className = "", sizes }: CroppedPhotoProps) {
  const zoom = img.zoom ?? 1;
  const position = img.position ?? "50% 50%";
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`.trim()}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{
          objectPosition: position,
          ...(zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: position } : null),
        }}
      />
    </div>
  );
}
