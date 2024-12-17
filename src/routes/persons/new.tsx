import PersonFormCard from "@/features/persons/components/Cards/PersonFormCard";
import { useCreatePersonMutation } from "@/features/persons/hooks/useCreatePersonMutation";
import { Person } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/persons/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: createPerson } = useCreatePersonMutation();
  const navigate = Route.useNavigate();

  const handleSubmit = (person: Omit<Person, "id">) => {
    return new Promise<void>((resolve, reject) => {
      createPerson(person, {
        onSuccess: (person) => {
          toast.success("Person created successfully");
          navigate({ to: `/persons/${person.id}/entries` });
          resolve();
        },
        onError: () => {
          toast.error("Failed to create person");
          reject();
        },
      });
    });
  };

  return (
    <>
      <PersonFormCard title="Create New Person" onSubmit={handleSubmit} />
    </>
  );
}
