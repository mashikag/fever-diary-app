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
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
      queryClient.invalidateQueries({ queryKey: ["person", id] });
    },
  });

  return editPerson;
};
