import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { services } from "@/content/site";
import { celebrations } from "@/content/services-pages";

const service = services.find((s) => s.slug === "celebrations")!;
const others = services.filter((s) => s.slug !== service.slug);

export const metadata: Metadata = {
  title: service.name,
  description: service.promise,
};

export default function CelebrationsPage() {
  return (
    <ServicePage
      service={service}
      page={celebrations}
      others={others}
      galleryCrops={{
        // Pizzas with faces: keep the bottom half of the frame so the printed counter card (with an old
        // sub-brand mark) is cut; anchor left of centre so the front-left pizza stays whole.
        "/images/2-celebrations-private-dining/ninja/ninja-03.jpg": { zoom: 2.05, position: "30% 100%" },
        // Farm counter: keep the bottom of the frame so the television at the top is cut.
        "/images/2-celebrations-private-dining/playseum-set-ups/playseum-set-ups-02.jpg": { zoom: 1.35, position: "50% 100%" },
      }}
    />
  );
}
