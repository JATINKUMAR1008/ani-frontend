import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/watch/$anime')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/watch/$anime"!</div>
}
