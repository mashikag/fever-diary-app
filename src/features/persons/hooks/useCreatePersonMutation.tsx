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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["persons"],
      });
    },
  });

  return createPerson;
};
