import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "@/types";

export const useEditPersonMutation = () => {
  const queryClient = useQueryClient();

  const editPerson = useMutation({
    mutationFn: async (person: Person) => {
      const client = FeverDiaryIDBClient.getInstance();
      await client.putPerson(person);
      return person;
    },

    onMutate: async (editedPerson) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["persons"] });

      // Snapshot the previous value
      const previousPersons = queryClient.getQueryData<Person[]>(["persons"]);

      // Perform optimistic update
      queryClient.setQueryData<Person[]>(["persons"], (old) => {
        if (!old) return [editedPerson];
        return old.map((p) => (p.id === editedPerson.id ? editedPerson : p));
      });

      // Return context object with snapshot
      return { previousPersons };
    },

    // If mutation fails, use context to roll back
    onError: (err, _editedPerson, context) => {
      queryClient.setQueryData(["persons"], context?.previousPersons);
      // Optionally display error to user
      console.error("Failed to update person:", err);
    },

    // After success or error, always refetch to ensure cache consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });

  return editPerson;
};
