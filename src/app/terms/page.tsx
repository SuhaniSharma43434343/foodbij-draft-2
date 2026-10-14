import type { Metadata } from "next";
import { LegalPage } from "@/components/story/LegalPage";
import { terms } from "@/content/pages";

export const metadata: Metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
};

export default function TermsPage() {
  return <LegalPage page={terms} />;
}
