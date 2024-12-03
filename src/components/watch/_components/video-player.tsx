import { usePlayer } from "@/hooks/usePlayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface IProps {
  episodeId: string;
}
export const VideoPlayer = ({ episodeId }: IProps) => {
  const { videoServer } = usePlayer();
  const server = videoServer.split("/")[0]?.toLowerCase() || "hd-1";
  const category = videoServer.split("/")[1]?.toLowerCase() || "sub";
  const { data, isLoading } = useQuery({
    queryKey: [`ep-${episodeId}-${server}-${category}`],
    queryFn: async () => {
      return await fetch(
        `${import.meta.env.VITE_API_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=${server}&category=${category}`
      ).then((res) => res.json());
    },
  });
  useEffect(() => {
    console.log("@SERVER", server);
    console.log("@CATEGORY", category);
    console.log(data);
  }, [data, server, category]);
  return (
    <div className="w-full h-[50vh] border flex items-center justify-center">
      {isLoading ? "Loading" : "Video Player"}
    </div>
  );
};
