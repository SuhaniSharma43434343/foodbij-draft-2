import type { Metadata } from "next";
import { LegalPage } from "@/components/story/LegalPage";
import { privacy } from "@/content/pages";

export const metadata: Metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
};

export default function PrivacyPage() {
  return <LegalPage page={privacy} />;
}
