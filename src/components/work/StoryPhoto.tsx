import Image from "next/image";
import { photoStyle, zoomSizes } from "@/components/media/photo-bg";
import type { StoryImage } from "@/content/stories";

type StoryPhotoProps = {
  img: StoryImage;
  sizes: string;
  preload?: boolean;
  /** Extra classes on the <img> (e.g. a hover zoom). */
  className?: string;
};

/**
 * A story photo filling its (relative, overflow-hidden) parent. Applies the image's crop: `zoom`
 * enlarges it from the bottom of the frame, `position` sets the object-position.
 */
export function StoryPhoto({ img, sizes, preload, className = "" }: StoryPhotoProps) {
  const zoom = img.crop?.zoom ?? 1;
  return (
    <div className="absolute inset-x-0 bottom-0" style={{ height: `${zoom * 100}%` }}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        sizes={zoomSizes(sizes, zoom)}
        className={`object-cover ${className}`.trim()}
        style={photoStyle(img.src, img.crop?.position ? { objectPosition: img.crop.position } : undefined)}
      />
    </div>
  );
}
