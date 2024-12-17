import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateEntryMutation } from "@/features/fever-diary/hooks/useCreateEntryMutation";
import { EntryFormCard } from "@/features/fever-diary/components/Cards/EntryFormCard";
import { EntryFormValues } from "@/features/fever-diary/components/EntryForm";

const searchSchema = z.object({
  ref: z.literal("welcome").or(z.literal("entries")).optional(),
  personId: z.string().optional(),
});

export const Route = createFileRoute("/entries/new")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { personId, ref } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { mutate: createNewEntry } = useCreateEntryMutation();

  const handleSubmit = async (newEntry: EntryFormValues) => {
    try {
      await createNewEntry(newEntry, {
        onSuccess: () => {
          toast.success("Entry created successfully");
          navigate({ to: `/persons/${newEntry.personId}/entries` });
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

  const onBack = () => {
    switch (ref) {
      case "entries":
        if (personId) {
          navigate({ to: `/persons/${personId}/entries` });
        } else {
          navigate({ to: `/entries` });
        }
        return;
      case "welcome":
        navigate({ to: "/welcome" });
        return;
    }
  };

  const defaultValues = {
    ...(personId ? { personId } : {}),
  };

  return (
    <div>
      <div className="mb-4 flex flex-row items-center gap-x-2">
        {ref === "welcome" ||
          (ref === "entries" && (
            <Button variant="ghost" onClick={onBack}>
              <ChevronLeft />
            </Button>
          ))}
      </div>
      <EntryFormCard defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  );
}
