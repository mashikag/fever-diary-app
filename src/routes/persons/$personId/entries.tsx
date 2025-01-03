import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { setSelectedPersonId } from "@/lib/localStorage";
import PersonDetailsCard from "@/features/persons/components/Cards/PersonDetailsCard";
import { EntriesTableCard } from "@/features/fever-diary/components/Cards/EntriesTableCard";
import { useAppStore } from "@/stores";
import { isSidebarExpanded as isSidebarExpandedSelector } from "@/stores/sidebar/selectors";
import useTitle from "@/hooks/useTitle";

export const Route = createFileRoute("/persons/$personId/entries")({
  loader: async ({ params, context: { idbClient } }) => {
    if (!params.personId) {
      throw new Error("No personId provided");
    }

    const person = await idbClient.getPerson(params.personId);
    if (!person) {
      throw new Error("Person not found");
    }

    const entries = await idbClient.getEntriesByPerson(person.id);

    setSelectedPersonId(person.id);

    return { person, entries };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = Route.useNavigate();
  const { person, entries } = Route.useLoaderData();
  useTitle(`${person.name} - Fever Diary`);
  const isSidebarExpanded = useAppStore(isSidebarExpandedSelector);

  return (
    <div className="flex flex-col gap-6 w-full">
      <PersonDetailsCard person={person} />

      <EntriesTableCard person={person} data={entries || []} />

      {!isSidebarExpanded && (
        <div className="fixed flex w-full left-0 bottom-4 justify-center">
          <Button
            onClick={() =>
              router({ to: "/entries/new", search: { ref: "entries", personId: person.id } })
            }
          >
            <Plus /> New Entry
          </Button>
        </div>
      )}
    </div>
  );
}
