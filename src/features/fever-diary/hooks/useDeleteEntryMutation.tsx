import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteEntryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entryId: string) => {
      const client = FeverDiaryIDBClient.getInstance();
      const entry = await client.deleteEntry(entryId);
      if (!entry) {
        throw new Error("Entry not found");
      }
      return entry;
    },
    onSuccess: ({ id, personId }) => {
      queryClient.invalidateQueries({
        queryKey: ["entry", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["entries", "all"],
      });
      queryClient.invalidateQueries({
        queryKey: ["entries", "by-person", personId],
      });
    },
  });
}

export default useDeleteEntryMutation;
