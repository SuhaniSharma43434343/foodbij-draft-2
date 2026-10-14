import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { services, weddings } from "@/content/site";

const service = services.find((s) => s.slug === "weddings")!;
const others = services.filter((s) => s.slug !== service.slug);

export const metadata: Metadata = {
  title: "Weddings",
  description: service.promise,
};

export default function WeddingsPage() {
  return (
    <ServicePage
      service={service}
      page={weddings}
      others={others}
      galleryCrops={{
        // Chef at the live counter: keep the bottom of the frame (hands, plate, garnish), toque out.
        "/images/1-weddings/bangalore-wedding/bangalore-wedding-03.jpg": { zoom: 2, position: "50% 100%" },
      }}
    />
  );
}
