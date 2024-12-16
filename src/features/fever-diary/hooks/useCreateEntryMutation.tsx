import FeverDiaryIDBClient from "@/lib/idbClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeverDiaryEntry } from "@/types";

export const useCreateEntryMutation = () => {
  const queryClient = useQueryClient();

  const createEntry = useMutation({
    mutationFn: async (newEntry: Omit<FeverDiaryEntry, "id">) => {
      const client = FeverDiaryIDBClient.getInstance();
      const id = await client.addEntry(newEntry);
      return { ...newEntry, id };
    },
    onSuccess: ({ personId }) => {
      queryClient.invalidateQueries({
        queryKey: ["entries", personId],
      });
    },
  });

  return createEntry;
};
