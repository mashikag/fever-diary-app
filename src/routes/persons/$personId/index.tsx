import { Button } from "@/components/ui/button";
import PersonFormCard from "@/features/persons/components/Cards/PersonFormCard";
import { useEditPersonMutation } from "@/features/persons/hooks/useEditPersonMutation";
import { personQueryOptions } from "@/features/persons/queries";
import { Person } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/persons/$personId/")({
  validateSearch: z.object({
    ref: z.literal("new-entry").or(z.literal("entries")).optional(),
  }),
  loader: async ({ context: { queryClient }, params: { personId } }) => {
    return queryClient.ensureQueryData(personQueryOptions(personId));
  },
  component: EditPersonPage,
});

function EditPersonPage() {
  const { personId } = Route.useParams();
  const { ref } = Route.useSearch();
  const { data: person } = useSuspenseQuery(personQueryOptions(personId));
  const navigate = Route.useNavigate();
  const { mutate: editPerson } = useEditPersonMutation();

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
          },
          onError: () => {
            reject();
          },
        }
      );
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

      <PersonFormCard defaultValues={person} onSubmit={handleSubmit} />
    </>
  );
}
