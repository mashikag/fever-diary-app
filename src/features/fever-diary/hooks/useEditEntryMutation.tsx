import FeverDiaryIDBClient from "@/lib/idbClient";
import { FeverDiaryEntry } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditEntryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: FeverDiaryEntry) => {
      const client = FeverDiaryIDBClient.getInstance();
      await client.putEntry(entry);
      return entry;
    },
    onSuccess: ({ id, personId }) => {
      queryClient.invalidateQueries({
        queryKey: ["entries", personId],
      });
      queryClient.invalidateQueries({
        queryKey: ["entry", id],
      });
    },
  });
}

export default useEditEntryMutation;
