import { HiAnime } from "@/types/anime";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../navbar/navbar";
import { ErrorComponent, useRouter } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { AnimeInfo } from "./_components/anime-info";
import { Loader } from "../Loader";

interface IProps {
  animeName: string;
}

interface ApiData {
  data: HiAnime.ScrapedAnimeAboutInfo;
  status: boolean;
}

const Anime = ({ animeName }: IProps) => {
  const santizedName = animeName.replace(/\s/g, "-").toLowerCase();
  console.log(santizedName);
  const { data, isLoading, error } = useQuery<ApiData>({
    queryKey: ["anime", animeName],
    queryFn: async () => {
      return (
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/v2/hianime/anime/${santizedName}`
        )
      ).json();
    },
  });
  const path = useRouter().state.location.pathname.split("/");
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full flex p-4">
        <BreadcrumbHeader path={path} />
      </div>
      {data && !isLoading ? (
        <AnimeInfo animeInfo={data.data} />
      ) : !data && !isLoading ? (
        <ErrorComponent error={error} />
      ) : (
        !data && isLoading && <Loader />
      )}
    </div>
  );
};

export const BreadcrumbHeader = ({ path }: { path: string[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${item}`}
                className="max-w-[300px] truncate whitespace-nowrap"
              >
                {item === "" ? "Home" : item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Anime;
