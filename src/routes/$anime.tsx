import Anime from "@/components/anime";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$anime")({
  component: RouteComponent,
});

function RouteComponent() {
  const { anime } = Route.useParams();
  console.log(anime);
  return (
    <>
      <Anime animeName={anime} />
    </>
  );
}
