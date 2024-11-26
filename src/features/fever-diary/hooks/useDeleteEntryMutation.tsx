import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEntryMutation = () => {
  const queryClient = useQueryClient();

  const deleteEntry = useMutation({
    mutationFn: async (entryId: string) => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.deleteEntry(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fever-diary-entries"],
      });
    },
  });

  return deleteEntry;
};
