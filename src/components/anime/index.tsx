import { HiAnime } from "@/types/anime";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../navbar/navbar";
import { useRouter } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { AnimeInfo } from "./_components/anime-info";

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
  const { data } = useQuery<ApiData>({
    queryKey: ["anime", animeName],
    queryFn: async () => {
      return (
        await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v2/hianime/anime/${santizedName}`
        )
      ).json();
    },
  });
  const path = useRouter().state.location.pathname.split("/");
  console.log(path);
  return (
    data && (
      <div className="w-screen h-screen">
        <Navbar />
        <div className="w-full flex p-4">
          <Breadcrumb>
            <BreadcrumbList>
              {path.map((item, index) => (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={`/${item}`}>
                      {item === "" ? "Home" : item}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AnimeInfo animeInfo={data.data} />
      </div>
    )
  );
};

export default Anime;
