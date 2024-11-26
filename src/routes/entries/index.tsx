import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/entries/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /entries/!";
}
