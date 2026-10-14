// Homepage (W3.2): built from the approved sketch (src/app/sketch/page.tsx) on the shared
// components and the copy in src/content/site.ts.
import { PlanBand } from "@/components/PlanBand";
import { home } from "@/content/site";
import { EventStories } from "./_home/EventStories";
import { FoodGallery } from "./_home/FoodGallery";
import { Opening } from "./_home/Opening";
import { Services } from "./_home/Services";
import { StoryShort } from "./_home/StoryShort";

export default function Home() {
  return (
    <>
      <Opening />
      <Services />
      <FoodGallery />
      <StoryShort />
      <EventStories />
      <PlanBand {...home.plan} />
    </>
  );
}
