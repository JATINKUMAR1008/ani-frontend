import {
  Description,
  InfoBadge,
} from "@/components/home/_components/poster_carousel";
import { Badge } from "@/components/ui/badge";
import { HiAnime } from "@/types/anime";
import { Captions, Mic, PlayCircleIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const AnimeBanner = ({
  animeInfo,
  moreInfo,
}: {
  animeInfo: HiAnime.ScrapedAnimeAboutInfo["anime"]["info"];
  moreInfo?: HiAnime.ScrapedAnimeAboutInfo["anime"]["moreInfo"];
}) => {
  return (
    <div className={`w-full  p-4 relative bg-background/80`}>
      <div className="absolute inset-0 -z-10">
        <img
          src={animeInfo.poster || ""}
          className=" absolute inset-0 w-full h-full object-cover -z-20 "
        />
      </div>
      <div className="w-full flex items-center justify-center h-full ">
        <div className="flex w-full items-center h-full gap-2 max-w-[1200px]">
          <div className="w-fit h-full md:basis-1/5">
            <img
              src={animeInfo.poster || ""}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col w-full basis-[60%] px-3">
            <h1 className="md:text-2xl font-semibold">{animeInfo.name}</h1>
            <p className="text-xs text-accent-foreground">
              <Description description={animeInfo.description || ""} />
            </p>
            <div className="mt-2 flex my-4 gap-1 items-center">
              <InfoBadge label={animeInfo.stats.rating || ""} />
              <InfoBadge label={animeInfo.stats.quality || ""} />
              <InfoBadge
                label={animeInfo.stats.episodes.sub || ""}
                icon={Captions}
              />
              {animeInfo.stats.episodes.dub && (
                <InfoBadge
                  label={animeInfo.stats.episodes.dub || ""}
                  icon={Mic}
                />
              )}
              <div className="size-1 md:mx-2 mx-1 rounded-full bg-accent"></div>
              <p className="md:text-sm text-xs font-semibold">
                {animeInfo.stats.type}
              </p>
              <div className="size-1 md:mx-2 mx-1 rounded-full bg-accent"></div>
              <p className="md:text-sm text-xs font-semibold">
                {animeInfo.stats.duration}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <Link href={`/watch/${animeInfo.id}`}>
                <Button variant={"outline"} className="flex items-center gap-2">
                  <PlayCircleIcon size={16} />
                  <span>Watch Now</span>
                </Button>
              </Link>
              <Button variant={"outline"} className="flex items-center gap-2">
                <PlusIcon size={16} />
                <span>Add to List</span>
              </Button>
            </div>
          </div>
          <div className="w-full basis-1/5 hidden flex-wrap md:flex">
            {moreInfo && (
              <div className="mt-2 w-full">
                <MoreInfo moreInfo={moreInfo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const MoreInfo = ({
  moreInfo,
}: {
  moreInfo: HiAnime.ScrapedAnimeAboutInfo["anime"]["moreInfo"];
}) => {
  return (
    <div className="w-full h-full">
      <div className="flex gap-1 items-center flex-wrap">
        {Object.keys(moreInfo).map((key) => (
          <div key={key} className="w-full items-center flex gap-1">
            <h3 className="text-sm basis-1/4 font-semibold capitalize">
              {key}:
            </h3>
            {Array.isArray(moreInfo[key]) ? (
              <div className="flex basis-3/4 gap-1 flex-wrap">
                {moreInfo[key].map((value, index) => (
                  <Badge key={index} className="text-xs line-clamp-1 truncate">
                    {value}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs basis-3/4">{moreInfo[key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
