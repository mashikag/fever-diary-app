import { Button } from "@/components/ui/button";
import PersonFormCard from "@/features/persons/components/Cards/PersonFormCard";
import { useDeletePersonMutation } from "@/features/persons/hooks/useDeletePersonMutation";
import { useEditPersonMutation } from "@/features/persons/hooks/useEditPersonMutation";
import { personQueryOptions, usePerson } from "@/features/persons/hooks/usePerson";
import { Person } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/persons/$personId/")({
  validateSearch: z.object({
    ref: z.literal("new-entry").or(z.literal("entries")).optional(),
  }),
  beforeLoad: () => {
    console.log("beforeLoad");
  },
  loader: async ({ context: { queryClient }, params: { personId } }) => {
    await queryClient.ensureQueryData(personQueryOptions(personId));
  },
  component: EditPersonPage,
});

function EditPersonPage() {
  const { personId } = Route.useParams();
  const { ref } = Route.useSearch();
  const { data: person } = usePerson(personId);
  const navigate = Route.useNavigate();
  const { mutate: editPerson } = useEditPersonMutation();
  const { mutate: deletePerson } = useDeletePersonMutation();

  const handleSubmit = (person: Omit<Person, "id">) => {
    return new Promise<void>((resolve, reject) => {
      editPerson(
        {
          id: personId,
          ...person,
        },
        {
          onSuccess: () => {
            resolve();
            toast.success("Person saved successfully");
          },
          onError: () => {
            reject();
            toast.error("Failed to save person");
          },
        }
      );
    });
  };

  const handlePersonDelete = () => {
    return new Promise<void>((resolve, reject) => {
      deletePerson(personId, {
        onSuccess: () => {
          resolve();
          navigate({ to: "/entries" });
          toast.success("Person deleted successfully");
        },
        onError: () => {
          reject();
          toast.error("Failed to delete person");
        },
      });
    });
  };

  return (
    <>
      {(ref === "new-entry" || ref === "entries") && (
        <div className="mb-4 flex flex-row items-center">
          <Button
            variant="ghost"
            onClick={() => {
              switch (ref) {
                case "new-entry":
                  navigate({ to: "/entries/new" });
                  break;
                case "entries":
                  navigate({ to: `/persons/${personId}/entries` });
                  break;
              }
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      <PersonFormCard
        title="Person Details"
        defaultValues={person}
        onSubmit={handleSubmit}
        onDelete={handlePersonDelete}
      />
    </>
  );
}
