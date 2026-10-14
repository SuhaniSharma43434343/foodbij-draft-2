import Link from "next/link";
import type { ComponentProps } from "react";
import "./motion/motion-extras.css";

export type ButtonVariant = "solid" | "outline" | "outline-light";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  /**
   * solid: copper fill, white label (the main action, on any ground).
   * outline: copper border, navy label (on white).
   * outline-light: white border and label (on navy or over photos).
   */
  variant?: ButtonVariant;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  // The hover/focus fill is a sweep from the left (.btn-sweep in globals.css, colour in --sweep).
  solid: "bg-copper text-white [--sweep:#9E5F27]",
  outline: "border border-copper text-navy [--sweep:var(--color-copper)] hover:text-white focus-visible:text-white",
  "outline-light": "border border-white text-white [--sweep:#fff] hover:text-navy focus-visible:text-navy",
};

const base =
  "t-button inline-flex min-h-12 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

/**
 * Square-cornered button link: at least 48px tall, 13px uppercase label.
 * The solid variant is magnetic on desktop fine pointers (useMagnetic, mounted by CopperCursor): the link keeps
 * its box, hit area and focus outline while the inner face (copper fill + label) leans toward the pointer.
 */
export function ButtonLink({ variant = "solid", className = "", children, ...rest }: ButtonLinkProps) {
  if (variant === "solid") {
    return (
      <Link {...rest} data-magnetic="" className={`btn-magnetic ${base} ${className}`.trim()}>
        <span
          data-magnetic-face=""
          className={`btn-sweep btn-face flex min-h-12 w-full items-center justify-center px-7 text-center ${variants.solid}`}
        >
          {children}
        </span>
      </Link>
    );
  }
  return (
    <Link {...rest} className={`btn-sweep ${base} px-7 text-center ${variants[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
