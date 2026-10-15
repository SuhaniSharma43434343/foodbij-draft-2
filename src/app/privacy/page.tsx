import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/content/pages";

export const metadata: Metadata = privacy.meta;

export default function PrivacyPage() {
  return <LegalPage data={privacy} />;
}
