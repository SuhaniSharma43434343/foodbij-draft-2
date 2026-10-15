import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/content/services";

const data = servicePages["corporate-dining"];

export const metadata: Metadata = data.meta;

export default function Page() {
  return <ServicePage data={data} flip={true} />;
}
