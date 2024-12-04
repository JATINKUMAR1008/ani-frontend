import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../navbar/navbar";
import { HiAnime } from "@/types/anime";
import { useEffect } from "react";
import { EpisodesList } from "../home/_components/episodes";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ErrorComponent, Link } from "@tanstack/react-router";
import { Loader } from "../Loader";

interface ApiResponse {
  status: boolean;
  data: HiAnime.ScrapedAnimeCategory;
}

export const EpisodesGrid = ({
  category,
  page,
  title,
}: {
  category: HiAnime.AnimeCategories;
  page: number;
  title: string;
}) => {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["category", category, page],
    queryFn: async () => {
      return (
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/v2/hianime/category/${category}?page=${page}`
        )
      ).json();
    },
  });
  useEffect(() => {
    console.log("@CATDATA", data);
  }, [data]);
  return (
    <div className="w-screen h-screen">
      <Navbar />
      {data && !isLoading ? (
        <div className="max-w-[1440px] mx-auto w-full">
          <EpisodesList
            episodes={data?.data.animes}
            withHeading
            title={title}
          />

          <div className="mt-5 w-full p-4 flex justify-center items-center">
            <PaginationPages
              page={page}
              totalPages={data.data.totalPages}
              category={category}
            />
          </div>
        </div>
      ) : !data && !isLoading ? (
        <ErrorComponent error={error} />
      ) : (
        !data && isLoading && <Loader />
      )}
    </div>
  );
};

const PaginationPages = ({
  page,
  totalPages,
  category,
}: {
  page: number;
  totalPages: number;
  category: HiAnime.AnimeCategories;
}) => {
  return (
    <div className="flex items-center gap-2">
      {page === 1 ? (
        <Button variant={"active"} size={"icon"}>
          1
        </Button>
      ) : (
        <>
          <Link href={`/${category}?page=1`}>
            <Button variant={"outline"} size={"icon"} className="gap-0">
              <ChevronLeft className="p-0" />
              <ChevronLeft className="p-0" />
            </Button>
          </Link>
          <Link href={`/${category}?page=${page - 1}`}>
            <Button variant={"outline"} size={"icon"}>
              <ChevronLeft size={16} />
            </Button>
          </Link>
        </>
      )}
      {page !== 1 && (
        <Button variant={"active"} size={"icon"}>
          {page}
        </Button>
      )}
      <Link href={`/${category}?page=${page + 1}`}>
        <Button variant={"outline"} size={"icon"}>
          {page + 1}
        </Button>
      </Link>
      <Link href={`/${category}?page=${page + 2}`}>
        <Button variant={"outline"} size={"icon"}>
          {page + 2}
        </Button>
      </Link>
      {page !== totalPages && (
        <>
          <Link href={`/${category}?page=${page + 1}`}>
            <Button variant={"outline"} size={"icon"}>
              <ChevronRight size={16} />
            </Button>
          </Link>
          <Link href={`/${category}?page=${totalPages}`}>
            <Button variant={"outline"} size={"icon"} className="gap-0">
              <ChevronRight className="p-0" />
              <ChevronRight className="p-0" />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
