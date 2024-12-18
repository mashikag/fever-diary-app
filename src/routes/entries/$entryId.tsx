import { Button } from "@/components/ui/button";
import { EntryFormCard } from "@/features/fever-diary/components/Cards/EntryFormCard";
import useEditEntryMutation from "@/features/fever-diary/hooks/useEditEntryMutation";
import useEntry, { entryQueryOptions } from "@/features/fever-diary/hooks/useEntry";
import { FeverDiaryEntry } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/entries/$entryId")({
  loader: async ({ params, context: { queryClient } }) => {
    // Fetch entry data
    const entry = await queryClient.ensureQueryData(entryQueryOptions(params.entryId));

    if (!entry) {
      throw new Error("Entry not found");
    }

    return {
      goBackOpts: {
        to: "/persons/$personId/entries" as const,
        params: { personId: entry.personId },
      },
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { goBackOpts } = Route.useLoaderData();
  const { entryId } = Route.useParams();
  const { data: entry } = useEntry(entryId);
  const { mutateAsync: editEntry } = useEditEntryMutation();

  const handleSubmit = async (entry: Omit<FeverDiaryEntry, "id">) => {
    try {
      await editEntry({
        id: entryId,
        ...entry,
      });
      toast.success("Entry updated successfully");
    } catch (error) {
      console.error("Error updating entry:", error);
      toast.error("Failed to update entry");
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-row items-center">
        <Button variant="ghost" onClick={() => navigate(goBackOpts)}>
          <ChevronLeft />
        </Button>
      </div>

      <EntryFormCard defaultValues={entry} onSubmit={handleSubmit} />
    </>
  );
}
