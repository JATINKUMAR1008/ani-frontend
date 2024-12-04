import { Link, useRouter } from "@tanstack/react-router";
import { Navbar } from "../navbar/navbar";
import { BreadcrumbHeader } from "../anime";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HiAnime } from "@/types/anime";
import { VideoPlayer } from "./_components/video-player";
import { PlayerProvider } from "../contexts/videoPlayer";
import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Mic, PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface IProps {
  animeId: string;
  ep: string;
}

interface ApiResponseEpisodes {
  status: boolean;
  data: HiAnime.ScrapedAnimeEpisodes;
}

interface ApiResponse {
  status: boolean;
  data: HiAnime.ScrapedEpisodeServers;
}

export const WatchPage = ({ animeId, ep }: IProps) => {
  const path = useRouter().state.location.pathname.split("/");
  const { data: EpisodesData } = useQuery<ApiResponseEpisodes>({
    queryKey: [`episodes-${animeId}`],
    queryFn: async () => {
      return await fetch(
        `${import.meta.env.VITE_API_URL}/api/v2/hianime/anime/${animeId}/episodes`
      ).then((res) => res.json());
    },
  });
  const { data } = useQuery<ApiResponse>({
    queryKey: ["watch", animeId, ep],
    queryFn: async () => {
      return await fetch(
        `${import.meta.env.VITE_API_URL}/api/v2/hianime/episode/servers?animeEpisodeId=${animeId}?ep=${ep}`
      ).then((res) => res.json());
    },
  });
  useEffect(() => {
    if (ep === "1") {
      if (EpisodesData) {
        ep = EpisodesData?.data.episodes[0].episodeId || "";
        window.location.href = `/watch/${ep}`;
      }
    }
    console.log("@DATA", data);
  }, [EpisodesData, data]);
  return (
    data && (
      <div className="w-screen h-screen">
        <Navbar />
        <div className="w-full flex p-4">
          <BreadcrumbHeader path={path} />
        </div>
        <PlayerProvider>
          <div className="flex flex-col-reverse md:flex-row md:justify-center">
            <div className="w-full md:max-w-[400px]  border">
              <header className="w-full h-[40px] flex items-center gap-4 p-2 border-b border-separate">
                <h4 className="text-xs font-semibold basis-1/3">
                  List of episodes
                </h4>
                <Input
                  placeholder="Number of episode"
                  className="h-[30px] text-xs basis-2/3"
                />
              </header>
              <EpisodesList
                episodes={EpisodesData?.data.episodes || []}
                activeEpisode={`${animeId}?ep=${ep}`}
              />
            </div>
            <div className="flex flex-col w-full max-w-[800px] border">
              <VideoPlayer episodeId={`${animeId}?ep=${ep}`} />
              <div className="flex flex-col md:flex-row items-center justify-between gap-1 py-3 px-4 border-y mt-1">
                <AutoButtons />
                <NavigationButtons />
              </div>
              <div className="mt-2 flex flex-col gap-1 items-center">
                <h4 className="text-sm text-muted-foreground">
                  You are watching
                </h4>
                <p className="text-sm font-semibold">
                  Episode {data?.data.episodeNo}
                </p>
                <p className="text-muted-foreground text-xs">
                  if current server doesn't work please try other servers
                  beside.
                </p>
              </div>
              <ServersSelector
                subServers={data?.data.sub}
                dubServers={data?.data.dub}
              />
            </div>
          </div>
        </PlayerProvider>
      </div>
    )
  );
};

const AutoButtons = () => {
  const {
    autoNext,
    autoPlay,
    autoSkipIntro,
    setAutoNext,
    setAutoPlay,
    setAutoSkipIntro,
  } = usePlayer();
  const options = ["Auto Play", "Auto Next", "Auto Skip Intro"] as const;

  const matcher: Record<(typeof options)[number], boolean> = {
    "Auto Play": autoPlay,
    "Auto Next": autoNext,
    "Auto Skip Intro": autoSkipIntro,
  };

  const fnMatcher: Record<(typeof options)[number], (value: boolean) => void> =
    {
      "Auto Play": setAutoPlay,
      "Auto Next": setAutoNext,
      "Auto Skip Intro": setAutoSkipIntro,
    };
  return (
    <div className="flex items-center gap-2 py-2">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            fnMatcher[option](!matcher[option]);
          }}
        >
          <p className="text-xs font-thin">{option}</p>
          <p className="text-xs font-medium">
            {matcher[option] ? "On" : "Off"}
          </p>
        </div>
      ))}
    </div>
  );
};

const NavigationButtons = ({
  prev,
  next,
}: {
  prev?: string;
  next?: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex items-center gap-1"
        disabled={!prev}
      >
        <ChevronLeft size={16} />
        <span className="">Prev</span>
      </Button>
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex items-center gap-1"
        disabled={!next}
      >
        <span className="">Next</span>
        <ChevronRight size={16} />
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <PlusIcon size={16} />
      </Button>
    </div>
  );
};

const ServersSelector = ({
  subServers,
  dubServers,
}: {
  subServers: HiAnime.ScrapedEpisodeServers["sub"];
  dubServers: HiAnime.ScrapedEpisodeServers["dub"];
}) => {
  const { setVideoServer, videoServer } = usePlayer();
  const exisitingServer = videoServer.split("/")[0];
  const exisitingCategory = videoServer.split("/")[1];
  return (
    <div className="w-full mt-5 h-full flex flex-col border space-y-2 py-2">
      <div className="flex w-full items-start gap-2 py-2 px-4">
        <div className="basis-1/6 flex gap-1 items-center">
          <div className="rounded-sm p-1 text-xs bg-accent text-accent-foreground">
            cc
          </div>
          <p className="text-sm ml-1">SUB:</p>
        </div>
        <div className="basis-5/6 w-full flex gap-2 flex-wrap items-center">
          {subServers?.map((server) => (
            <Badge
              key={server.serverId}
              variant={
                exisitingCategory === "sub" &&
                exisitingServer === server.serverName
                  ? "active"
                  : "default"
              }
              className="cursor-pointer"
              onClick={() => {
                setVideoServer(`${server.serverName}/sub`);
              }}
            >
              {server.serverName}
            </Badge>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex w-full items-start gap-2 py-2 px-4">
        <div className="basis-1/6 flex gap-1 items-center">
          <div className="rounded-sm p-1 text-xs bg-accent text-accent-foreground">
            <Mic size={13} />
          </div>
          <p className="text-sm ml-1">DUB:</p>
        </div>
        <div className="basis-5/6 w-full flex gap-2 flex-wrap items-center">
          {dubServers?.map((server) => (
            <Badge
              variant={
                exisitingCategory === "dub" &&
                exisitingServer === server.serverName
                  ? "active"
                  : "default"
              }
              key={server.serverId}
              className="cursor-pointer"
              onClick={() => {
                setVideoServer(`${server.serverName}/dub`);
              }}
            >
              {server.serverName}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const EpisodesList = ({
  episodes,
  activeEpisode,
}: {
  episodes: HiAnime.ScrapedAnimeEpisodes["episodes"];
  activeEpisode?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 10;
  
  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const currentEpisodes = episodes.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full divide-y">
        {currentEpisodes.map((episode) => (
          <Link
            href={`/watch/${episode.episodeId}`}
            key={episode.episodeId}
            className={cn(
              "flex items-center gap-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors duration-100",
              episode.episodeId === activeEpisode &&
                "bg-accent text-accent-foreground"
            )}
          >
            <p className="text-xs font-semibold">{episode.number}.</p>
            <p className="text-xs">{episode.title}</p>
          </Link>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-2 border-t">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-xs">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
