import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/content/pages";

export const metadata: Metadata = terms.meta;

export default function TermsPage() {
  return <LegalPage data={terms} />;
}
