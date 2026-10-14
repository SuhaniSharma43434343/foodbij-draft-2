import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { services } from "@/content/site";
import { corporateDining } from "@/content/services-pages";

const service = services.find((s) => s.slug === "corporate-dining")!;
const others = services.filter((s) => s.slug !== service.slug);

export const metadata: Metadata = {
  title: service.name,
  description: service.promise,
};

export default function CorporateDiningPage() {
  return (
    <ServicePage
      service={service}
      page={corporateDining}
      others={others}
      galleryCrops={{
        // Canapé boards: crop in on the food so the tile reads as a detail, not a repeat of the hero.
        "/images/4-corporate-office-dining/motilal-oswal/motilal-oswal-01.jpg": { zoom: 1.5, position: "60% 100%" },
      }}
    />
  );
}
