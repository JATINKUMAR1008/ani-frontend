import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HiAnime } from "@/types/anime";
import { Link } from "@tanstack/react-router";
interface IProps {
  trendingData: HiAnime.ScrapedHomePage["trendingAnimes"];
}
export const Trending = ({ trendingData }: IProps) => {
  // console.log("@TRENDS", trendingData);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-4">
        <h1 className="text-lg font-semibold">Trending</h1>
        <div className="w-full mt-5">
          <ScrollArea>
            <div className="flex w-max items-center gap-5">
              {trendingData.map((anime) => (
                <PosterCard key={anime.id} anime={anime} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <Separator />
    </div>
  );
};

const PosterCard = ({ anime }: { anime: HiAnime.TrendingAnime }) => {
  return (
    <div className="w-full h-auto relative max-h-[250px] flex">
      <div className="flex absolute top-0 left-0 size-[40px] flex-col-reverse justify-center rounded-br-md border bg-accent gap-2 items-center text-center">
        <div className="font-semibold text-md border w-full h-fit">
          {anime.rank}
        </div>
      </div>
      <Link href={`/${anime.id}`}>
        <img
          src={anime.poster || ""}
          alt={anime.name || ""}
          className="w-full h-[250px] object-cover rounded-sm"
        />
      </Link>
    </div>
  );
};
