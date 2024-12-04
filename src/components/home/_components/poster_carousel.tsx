import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SpotlightAnime } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  InfoIcon,
  LucideIcon,
  Mic,
  PlayCircleIcon,
  TvIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface IProps {
  spotlights: SpotlightAnime[];
}

export const PosterCarousel = ({ spotlights }: IProps) => {
  // console.log("@SPOTS", spotlights);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <div className="px-2">
      <div className="embla mt-4" ref={emblaRef}>
        <div className="embla__container flex">
          {spotlights.map((poster, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] ">
              <PosterCard
                key={index}
                title={poster.name || ""}
                description={poster.description || ""}
                genre={poster.otherInfo}
                image={poster.poster}
                rank={poster.rank}
                episodes={poster.episodes}
              />
            </div>
          ))}
        </div>
        <Separator />
      </div>
    </div>
  );
};

const PosterCard = ({
  title,
  description,
  genre,
  image,
  rank,
  episodes,
}: {
  title: SpotlightAnime["name"];
  description: SpotlightAnime["description"];
  genre: SpotlightAnime["otherInfo"];
  image: SpotlightAnime["poster"];
  rank: SpotlightAnime["rank"];
  episodes: SpotlightAnime["episodes"];
}) => {
  return (
    <div className="relative overflow-hidden flex w-full md:h-full md:max-h-[50vh] h-[40vh]">
      <img
        src={image ?? ""}
        alt={title ?? ""}
        className="w-full h-auto object-cover relative"
      />
      <div className="absolute inset-0 bg-[rgba(12,12,12,0.7)] slider-mask md:block  z-10"></div>
      <div className="absolute inset-0 flex items-center justify-start sm:p-[30px] text-white z-10">
        <div className="max-w-[600px]">
          <p className="md:mb-8 mb-4 md:text-md text-sm font-semibold">
            # Spotlight {rank}
          </p>
          <h2 className="md:mb-5 mb-3 md:text-2xl text-lg font-semibold">
            {title}
          </h2>
          <p className="md:text-md text-xs font-medium overflow-hidden whitespace-pre-wrap md:h-[80px]">
            <Description description={`${description}`} />
          </p>
          <div className="flex md:gap-2 gap-1 items-center my-2">
            <InfoBadge icon={TvIcon} label={genre[0]} />
            <InfoBadge icon={Clock} label={genre[1]} />
            <InfoBadge icon={Calendar} label={genre[2]} />
            <Badge variant={"secondary"}>{genre[3]}</Badge>
            <div className="ml-4 flex items-center gap-2">
              <InfoBadge label={episodes.sub || ""}>
                <p className="text-[10px] font-extrabold">CC</p>
              </InfoBadge>
              {episodes.dub && (
                <InfoBadge label={episodes.dub || ""} icon={Mic} />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Button variant={"outline"} className="flex items-center gap-2">
              <PlayCircleIcon size={16} />
              <span>Play Now</span>
            </Button>
            <Button variant={"default"} className="flex items-center gap-2">
              <InfoIcon size={16} />
              <span>More Info</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InfoBadge = ({
  icon,
  label,
  children,
  variant,
}: {
  icon?: LucideIcon;
  label: string | number;
  children?: React.ReactNode;
  variant?: "default" | "secondary";
}) => {
  const Icon = icon;
  return (
    <Badge variant={variant} className="flex md:gap-2 gap-1 md:px-4 px-2 ">
      {Icon && <Icon className="md:size-4 size-2" />}
      {children}
      <span className="text-[10px] md:text-sm">{label}</span>
    </Badge>
  );
};

export const Description = ({ description }: { description: string }) => {
  return (
    <div
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {description}
    </div>
  );
};
