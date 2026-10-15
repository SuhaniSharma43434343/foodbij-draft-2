import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/content/site";
import { placeholderColor } from "@/lib/image-loader";

type Props = {
  img: Img;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 5". Omit when the parent sets the size. */
  ratio?: string;
  className?: string;
  /** The first-screen image: preloaded, never lazy, no reveal. */
  preload?: boolean;
  /** Mask reveal when scrolled into view (default on). */
  reveal?: boolean;
  /** Gentle scroll-linked drift inside the frame. */
  drift?: boolean;
  /** Reveal delay in ms, to let a paired image arrive a beat later. */
  delay?: number;
  /** Load immediately without preloading (secondary photos on the first screen). */
  eager?: boolean;
  /** Override the crop for this placement. */
  position?: string;
  positionWide?: string;
};

/**
 * A photograph in a cropped frame: the one image treatment used across the site.
 * The frame is filled with the photo's own dominant colour, so a photo that is still loading
 * reads as a block of its colour, never as a blank white hole.
 */
export function Photo({ img, sizes, ratio, className = "", preload, eager, reveal = true, drift, delay, position, positionWide }: Props) {
  const pos = position ?? img.position ?? "50% 50%";
  const style = {
    aspectRatio: ratio,
    backgroundColor: placeholderColor(img.src),
    "--pos": pos,
    "--pos-w": positionWide ?? img.positionWide ?? pos,
    "--d": delay ? `${delay}ms` : undefined,
  } as CSSProperties;
  return (
    <div className={`frame ${drift ? "drift" : ""} ${className}`} style={style} data-reveal={reveal && !preload ? "image" : undefined}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        loading={preload || eager ? "eager" : "lazy"}
      />
    </div>
  );
}
