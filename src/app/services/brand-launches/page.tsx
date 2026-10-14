import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { services } from "@/content/site";
import { brandLaunches } from "@/content/services-pages";

const service = services.find((s) => s.slug === "brand-launches")!;
const others = services.filter((s) => s.slug !== service.slug);

export const metadata: Metadata = {
  title: service.name,
  description: service.promise,
};

export default function BrandLaunchesPage() {
  return <ServicePage service={service} page={brandLaunches} others={others} />;
}
