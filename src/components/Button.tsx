import Link from "next/link";
import type { ComponentProps } from "react";

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

/** Square-cornered button link: at least 48px tall, 13px uppercase label. */
export function ButtonLink({ variant = "solid", className = "", children, ...rest }: ButtonLinkProps) {
  return (
    <Link
      {...rest}
      className={`btn-sweep t-button inline-flex min-h-12 items-center justify-center px-7 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
