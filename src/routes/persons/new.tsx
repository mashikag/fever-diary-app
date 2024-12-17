import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/persons/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /persons/new!";
}
