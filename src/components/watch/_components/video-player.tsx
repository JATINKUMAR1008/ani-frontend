import { usePlayer } from "@/hooks/usePlayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { VPlayer } from "./player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import "video.js/dist/video-js.css";
import { ErrorComponent } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";

interface IProps {
  episodeId: string;
}
interface ApiResponse {
  status: boolean;
  data: {
    anilistID: number;
    intro: {
      start: number;
      end: number;
    };
    mailID: number;
    outro: {
      start: number;
      end: number;
    };
    sources: {
      type: string;
      url: string;
    }[];
    tracks: {
      file: string;
      label: string;
      kind: string;
      default?: boolean;
    }[];
  };
}
export const VideoPlayer = ({ episodeId }: IProps) => {
  const { autoPlay } = usePlayer();

  const { videoServer } = usePlayer();
  const divRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const server = videoServer.split("/")[0]?.toLowerCase() || "hd-1";
  const category = videoServer.split("/")[1]?.toLowerCase() || "sub";

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: [`ep-${episodeId}-${server}-${category}`],
    queryFn: async () => {
      return await fetch(
        `${import.meta.env.VITE_API_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=${server}&category=${category}`
      ).then((res) => res.json());
    },
  });
  useEffect(() => {
    if (data) {
      console.log("@DATA", data.data);
    }
  }, [data, server, category]);

  useEffect(() => {
    const updatePlayerDimensions = () => {
      if (divRef.current && playerRef.current) {
        const parentElement = divRef.current.parentElement;
        if (parentElement) {
          playerRef.current.width(parentElement.clientWidth);
          playerRef.current.height(parentElement.clientHeight);
        }
      }
    };

    window.addEventListener("resize", updatePlayerDimensions);
    const resizeObserver = new ResizeObserver(updatePlayerDimensions);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePlayerDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={divRef} className="w-full h-full">
      {data && !isLoading ? (
        <div className="w-full h-full md:max-w-[800px] mx-auto">
          <div className="relative w-full h-full">
            <AspectRatio ratio={16 / 9} className="absolute inset-0 mx-auto">
              <VPlayer
                props={{
                  options: {
                    autoplay: autoPlay,
                    controls: true,
                    fluid: true,
                    responsive: true,
                    experimentalSvgIcons: true,
                    playbackRates: [0.5, 1, 1.5, 2],
                    sources: data.data.sources.map((source) => ({
                      src: source.url,
                      type:
                        source.type === "hls"
                          ? "application/x-mpegURL"
                          : "video/mp4",
                    })),
                    tracks: data.data.tracks.map((track) => ({
                      src: track.file,
                      kind: track.kind,
                      label: track.label,
                      default: track.default,
                    })),
                    controlBar: {
                      skipButtons: {
                        forward: 10,
                        backward: 10,
                      },
                    },
                  },
                  onReady: () => {
                    console.log("player is ready to play");
                  },
                  markers: {
                    intro: data.data.intro,
                    outro: data.data.outro,
                  },
                }}
              />
            </AspectRatio>
          </div>
        </div>
      ) : !data && !isLoading ? (
        <ErrorComponent error={error} />
      ) : (
        !data &&
        isLoading && (
          <div className="w-full h-[400px] max-w-[800px] max-h-[600px]">
            <Loader />
          </div>
        )
      )}
    </div>
  );
};
