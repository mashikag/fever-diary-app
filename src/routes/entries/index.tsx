import { Button } from "@/components/ui/button";
import EntriesTable from "@/features/fever-diary/components/EntriesTable";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { z } from "zod";
import useDiaryEntries from "@/features/fever-diary/hooks/useDiaryEntries";
import usePerson from "@/features/persons/hooks/usePerson";

const searchSchema = z.object({
  personId: z.string(),
});

export const Route = createFileRoute("/entries/")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const router = Route.useNavigate();
  const { personId } = Route.useSearch();
  const { data: entries } = useDiaryEntries(personId);
  const { data: person } = usePerson(personId);

  return (
    <div>
      <div className="mb-4 flex flex-row items-center">
        <h2>{person?.name}'s Diary</h2>
        <div className="flex-grow">
          Weight: {person?.weight ? `${person?.weight}kg` : "Unknown"}
        </div>
      </div>

      <EntriesTable data={entries || []} />
      <div className="absolute flex w-full left-0 bottom-4 justify-center">
        <Button onClick={() => router({ to: "/entries/new", search: { ref: "entries" } })}>
          <Plus /> New Entry
        </Button>
      </div>
    </div>
  );
}
