import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { HiAnime } from "@/types/anime";
import { Link } from "@tanstack/react-router";

interface IProps {
  episodes: HiAnime.ScrapedHomePage["latestEpisodeAnimes"];
  title: string;
  view_all?: boolean;
  link?: string;
  withHeading?: boolean;
}

export const EpisodesList = ({
  episodes,
  title,
  view_all,
  link,
  withHeading,
}: IProps) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-4">
        {withHeading && (
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">{title}</h1>
            {view_all && (
              <Link href={link}>
                <Button
                  variant={"link"}
                  size={"default"}
                  className="text-muted-foreground"
                >
                  View all
                </Button>
              </Link>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-[1rem] w-full mx-auto">
          {episodes.map((anime) => (
            <FilmItem key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const FilmItem = ({ anime }: { anime: HiAnime.Anime }) => {
  console.log(anime);
  return (
    <Link
      href={`/${anime.id}`}
      className="flex-[0_0_calc(50%-1rem)] sm:flex-[0_0_calc(25%-1rem)] lg:flex-[0_0_calc(16.66%-1rem)] h-auto cursor-pointer"
    >
      <div className="w-full flex flex-col">
        <AspectRatio ratio={3 / 4} className="relative">
          <img
            src={anime.poster || ""}
            alt={anime.name || ""}
            className="w-full h-full object-fill rounded-sm"
          />
          <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-background to-transparent"></div>
        </AspectRatio>
        <div className="w-full py-1 mt-2 px-1">
          <h4 className="text-md line-clamp-1">{anime.name}</h4>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
            <span>{anime.type}</span>
            <div className="size-1 rounded-full bg-accent"></div>
            <span>{anime.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
