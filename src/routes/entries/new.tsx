import EntryForm, { EntryFormValues } from "@/features/fever-diary/components/NewEntryForm";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateEntryMutation } from "@/features/fever-diary/hooks/useCreateEntryMutation";

const searchSchema = z.object({
  ref: z.literal("welcome").or(z.literal("entries")).optional(),
});

export const Route = createFileRoute("/entries/new")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { ref } = Route.useSearch();
  const router = Route.useNavigate();
  const { mutate: createNewEntry } = useCreateEntryMutation();

  const handleSubmit = async (newEntry: EntryFormValues) => {
    try {
      await createNewEntry(newEntry, {
        onSuccess: () => {
          toast.success("Entry created successfully");
          router({ to: "/entries", search: { personId: newEntry.personId } });
        },
        onError: () => {
          toast.error("Failed to create entry");
        },
      });
    } catch (error) {
      console.error("Error creating entry:", error);
      toast.error("Failed to create entry");
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-row items-center gap-x-2">
        {ref === "welcome" && (
          <Button variant="ghost" onClick={() => router({ to: "/welcome" })}>
            <ChevronLeft />
          </Button>
        )}
        <h2>New Diary Entry</h2>
      </div>
      <EntryForm onSubmit={handleSubmit} />
    </div>
  );
}
