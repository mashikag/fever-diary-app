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
    onSuccess: (newEntry) => {
      queryClient.invalidateQueries({
        queryKey: ["diaryEntries"],
      });
      // Optionally, update the cache with the new entry
      queryClient.setQueryData<FeverDiaryEntry[]>(
        ["diaryEntries"],
        (oldEntries) => [...(oldEntries || []), newEntry]
      );
    },
  });

  return createEntry;
};
