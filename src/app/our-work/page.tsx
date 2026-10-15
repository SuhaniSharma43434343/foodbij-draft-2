import type { Metadata } from "next";
import { Close } from "@/components/Close";
import { WorkIndex } from "@/components/WorkIndex";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Our work",
  description: "Weddings, celebrations, brand launches and corporate dining that Foodbiz has catered.",
};

export default function OurWorkPage() {
  return (
    <>
      <section className="pb-[var(--section)] pt-[calc(var(--header-h)+56px)] lg:pt-[calc(var(--header-h)+96px)]">
        <div className="wrap">
          <h1 className="t-h1 max-w-[14ch]">Every event starts with a brief.</h1>
        </div>
        <div className="mt-10 lg:mt-14">
          <WorkIndex stories={stories} />
        </div>
      </section>
      <Close heading="Brief us on something similar." lead="A date, a rough guest count and the kind of event is enough to start." />
    </>
  );
}
