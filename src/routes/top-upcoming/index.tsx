import { EpisodesGrid } from '@/components/recenlty-added'
import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
const searchSchema = z.object({
  page: z.number().optional(),
})
export const Route = createFileRoute('/top-upcoming/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { page } = Route.useSearch()
  console.log('@PAGE', page)

  return <EpisodesGrid category="top-upcoming" page={page || 1} title='Top Upcoming' />
}
