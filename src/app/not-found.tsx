import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap pb-[var(--section)] pt-[calc(var(--header-h)+96px)]">
      <h1 className="t-h1 max-w-[14ch]">This page isn’t on the menu.</h1>
      <p className="muted mt-5">The link may be old, or the page may have moved.</p>
      <Link href="/" className="tlink mt-6">
        <span className="uline">Back to the homepage</span>
        <span className="arrow" aria-hidden="true" />
      </Link>
    </section>
  );
}
