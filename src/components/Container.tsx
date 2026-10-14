import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  /** Element to render (default "div"). */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Content column: 1320px max, 20px gutter on phone, 48px from 1024px (the `site-container` utility). */
export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return <Tag className={`site-container ${className}`.trim()}>{children}</Tag>;
}
