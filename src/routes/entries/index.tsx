import { Button } from "@/components/ui/button";
import { EntriesTableCard } from "@/features/fever-diary/components/Cards/EntriesTableCard";
import { entriesQueryOptions, useEntries } from "@/features/fever-diary/hooks/useEntries";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/entries/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(entriesQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = Route.useNavigate();
  const { data: entries } = useEntries();

  return (
    <div>
      <EntriesTableCard data={entries || []} />

      <div className="absolute flex w-full left-0 bottom-4 justify-center">
        <Button onClick={() => router({ to: "/entries/new", search: { ref: "entries" } })}>
          <Plus /> New Entry
        </Button>
      </div>
    </div>
  );
}
