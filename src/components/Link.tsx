import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Every internal link on the site. It is next/link, tagged as a "page" navigation so the page
 * transition plays (see PageTransition.tsx). Browser back/forward carry no tag and get the lighter
 * crossfade instead. Modifier-clicks, new tabs, external URLs and downloads are left to the browser
 * by next/link itself, so nothing here intercepts clicks.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink transitionTypes={["page"]} {...props} />;
}
