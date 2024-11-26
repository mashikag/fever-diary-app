import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "@/types";

export const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();

  const createPerson = useMutation({
    mutationFn: async (newPerson: Omit<Person, "id">) => {
      const client = FeverDiaryIDBClient.getInstance();
      const id = await client.addPerson(newPerson);
      return { ...newPerson, id };
    },
    onSuccess: (newPerson) => {
      queryClient.invalidateQueries({
        queryKey: ["persons"],
      });
      // Optionally, you can update the cache with the new person
      queryClient.setQueryData<Person[]>(["persons"], (oldPersons) => [
        ...(oldPersons || []),
        newPerson,
      ]);
    },
  });

  return createPerson;
};
