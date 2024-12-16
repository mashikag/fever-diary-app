import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePersonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (personId: string) => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.deletePerson(personId);
    },
    onSuccess: (personId) => {
      queryClient.invalidateQueries({
        queryKey: ["persons"],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["entries"],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["entries", personId],
      });
    },
  });
}
