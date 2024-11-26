import NewEntryForm from "@/features/fever-diary/components/NewEntryForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/entries/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>New Diary Entry</h1>
      <NewEntryForm />
    </div>
  );
}
