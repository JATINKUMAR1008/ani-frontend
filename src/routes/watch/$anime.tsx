import { WatchPage } from "@/components/watch";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
const RouteSchema = z.object({
  ep: z.number().optional(),
});

export const Route = createFileRoute("/watch/$anime")({
  component: RouteComponent,
  validateSearch: RouteSchema,
});

function RouteComponent() {
  const { anime } = Route.useParams();
  const { ep } = Route.useSearch();
  return <WatchPage animeId={anime} ep={ep?.toString() || String(1)} />;
}
