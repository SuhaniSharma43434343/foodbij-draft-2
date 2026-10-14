import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { home } from "@/content/site";

// Desktop placement for the asymmetric 12-column grid, by position. Phone is a swipe row.
const placement = [
  { place: "lg:col-start-1 lg:col-span-7 lg:aspect-[4/3]", sizes: "(min-width: 1320px) 714px, (min-width: 1024px) 56vw, 78vw" },
  { place: "lg:col-start-9 lg:col-span-4 lg:aspect-[3/4] lg:mt-32", sizes: "(min-width: 1320px) 392px, (min-width: 1024px) 31vw, 78vw" },
  { place: "lg:col-start-2 lg:col-span-5 lg:aspect-[3/2]", sizes: "(min-width: 1320px) 510px, (min-width: 1024px) 40vw, 78vw" },
  { place: "lg:col-start-8 lg:col-span-5 lg:aspect-[4/3] lg:mt-24", sizes: "(min-width: 1320px) 510px, (min-width: 1024px) 40vw, 78vw" },
  { place: "lg:col-start-1 lg:col-span-4 lg:aspect-[4/5]", sizes: "(min-width: 1320px) 392px, (min-width: 1024px) 31vw, 78vw" },
  { place: "lg:col-start-6 lg:col-span-7 lg:aspect-[3/2] lg:mt-40", sizes: "(min-width: 1320px) 714px, (min-width: 1024px) 56vw, 78vw" },
];

/**
 * Navy food band: phone horizontal scroll-snap row, desktop asymmetric grid. No captions, no borders.
 * Desktop with CSS scroll-driven animations (and no reduced motion): the band pins (.food-pin is sticky)
 * and the photo row drifts sideways as the visitor scrolls (.food-gallery rules in globals.css);
 * everywhere else the grid above stays.
 */
export function FoodGallery() {
  const { label, heading, images } = home.food;
  return (
    <section aria-labelledby="food-title" className="food-gallery section-y bg-navy text-white">
      <div className="food-pin">
        <div className="site-container">
          <SectionHeading reveal id="food-title" tone="dark" label={label} heading={heading} headingClassName="max-w-[22ch]" />
        </div>
        <div data-reveal className="food-track mt-10 lg:mx-auto lg:mt-20 lg:max-w-[1320px] lg:px-12">
          <ul
            aria-label="Food photographs"
            className="food-row flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 after:block after:w-2 after:shrink-0 after:content-[''] lg:grid lg:snap-none lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-16 lg:overflow-visible lg:px-0 lg:after:hidden"
          >
            {images.map((img, i) => {
              const p = placement[i % placement.length];
              return (
                <li key={img.src} className={`relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden lg:w-auto ${p.place}`}>
                  <Image src={img.src} alt={img.alt} fill sizes={p.sizes} className="object-cover" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
