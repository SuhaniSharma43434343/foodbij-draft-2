import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/content/site";

type Props = {
  img: Img;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 5". Omit when the parent sets the size. */
  ratio?: string;
  className?: string;
  /** The first-screen image: preloaded, never lazy, no reveal. */
  preload?: boolean;
  /** Clip-path reveal when scrolled into view (default on). */
  reveal?: boolean;
  /** Gentle scroll-linked drift inside the frame. */
  drift?: boolean;
  /** Reveal delay in ms, to let a paired image arrive a beat later. */
  delay?: number;
};

/** A photograph in a cropped frame: the one image treatment used across the site. */
export function Photo({ img, sizes, ratio, className = "", preload, reveal = true, drift, delay }: Props) {
  const style = {
    aspectRatio: ratio,
    "--pos": img.position ?? "50% 50%",
    "--pos-w": img.positionWide ?? img.position ?? "50% 50%",
    "--d": delay ? `${delay}ms` : undefined,
  } as CSSProperties;
  return (
    <div
      className={`frame ${drift ? "drift" : ""} ${className}`}
      style={style}
      data-reveal={reveal && !preload ? "image" : undefined}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        quality={70}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
      />
    </div>
  );
}
