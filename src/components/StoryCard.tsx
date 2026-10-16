import Link from "@/components/Link";
import { getService, type Img } from "@/content/site";
import type { Story } from "@/content/stories";
import { Photo } from "./Photo";

type Props = {
  story: Story;
  /** The photo to show, when the page has already used the story's first one. */
  image?: Img;
  ratio?: string;
  sizes: string;
  reveal?: boolean;
  delay?: number;
  /** Show the service name above the title (useful where several services mix). */
  showService?: boolean;
};

/** A story in a list: the photograph, the title, and (where it helps) its service. */
export function StoryCard({ story, image, ratio = "4 / 5", sizes, reveal = true, delay, showService = true }: Props) {
  return (
    <Link href={`/our-work/${story.slug}`} className="lift group block">
      <Photo img={image ?? story.images[0]} ratio={ratio} sizes={sizes} reveal={reveal} delay={delay} />
      {showService && <p className="t-meta muted mt-4 hidden md:block">{getService(story.service).name}</p>}
      <h3 className={`serif text-[1.25rem] leading-[1.15] md:text-[1.375rem] lg:text-[1.625rem] mt-3 ${showService ? "md:mt-1" : "md:mt-4"}`}>
        <span className="uline [background-size:0_1px] group-hover:[background-size:100%_1px]">{story.title}</span>
      </h3>
    </Link>
  );
}
