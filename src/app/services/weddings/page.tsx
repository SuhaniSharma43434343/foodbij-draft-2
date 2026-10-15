import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/content/services";

const data = servicePages["weddings"];

export const metadata: Metadata = data.meta;

export default function Page() {
  return <ServicePage data={data} flip={false} />;
}
