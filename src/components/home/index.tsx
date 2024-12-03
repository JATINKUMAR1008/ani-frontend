import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../navbar/navbar";
import { PosterCarousel } from "./_components/poster_carousel";
import { useEffect } from "react";
import { HiAnime } from "@/types/anime";
import { Trending } from "./_components/trending";
import { EpisodesList } from "./_components/episodes";

interface ApiData {
  data: HiAnime.ScrapedHomePage;
  status: boolean;
}

export const HomePage = () => {
  const { data } = useQuery<ApiData>({
    queryKey: ["home-data"],
    queryFn: async () => {
      return (await fetch(`${import.meta.env.VITE_API_URL}/api/v2/hianime/home`)).json();
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    data && (
      <div className="w-screen  h-screen">
        <header className="">
          <Navbar />
        </header>
        <main className="mt-3 max-w-[1440px] mx-auto">
          <PosterCarousel spotlights={data?.data.spotlightAnimes} />
          <Trending trendingData={data.data.trendingAnimes} />
          <div className="my-2 w-full h-[300px] p-2">
            <div className=" w-full h-full border-dashed border text-center text-muted-foreground flex items-center justify-center">
              Want your ads here?
              <br />
              contact: ads@hikarihub.to
            </div>
          </div>
          <div className="w-full">
            <EpisodesList
              episodes={data.data.latestEpisodeAnimes}
              title="Latest Episodes"
              view_all
              link="recently-updated"
              withHeading
            />
            <EpisodesList
              episodes={data.data.topUpcomingAnimes}
              title="Top Upcoming"
              view_all
              link="top-upcoming"
              withHeading
            />
          </div>
        </main>
      </div>
    )
  );
};
