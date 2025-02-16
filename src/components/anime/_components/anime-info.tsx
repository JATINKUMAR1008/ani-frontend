import { EpisodesList } from "@/components/home/_components/episodes";
import { HiAnime } from "@/types/anime";
import { AnimeBanner } from "./anime-header";
interface IProps {
  animeInfo: HiAnime.ScrapedAnimeAboutInfo;
  lastEp?: string;
}
export const AnimeInfo = ({ animeInfo,lastEp }: IProps) => {
  // console.table(animeInfo);
  return (
    <div>
      <AnimeBanner
        animeInfo={animeInfo.anime.info}
        moreInfo={animeInfo.anime.moreInfo}
        lastEp={lastEp}
      />
      <div className="w-full h-full p-2 mt-5 md:w-[75%] mx-auto">
        <EpisodesList
          episodes={animeInfo.recommendedAnimes}
          title="Recommended for you"
          withHeading
        />
      </div>
    </div>
  );
};
