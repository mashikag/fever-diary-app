import FeverDiaryIDBClient from "@/lib/idbClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export function entryQueryOptions(entryId: string) {
  return {
    queryKey: ["entry", entryId],
    queryFn: async () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getEntryById(entryId);
    },
  };
}

function useEntry(entryId: string) {
  return useSuspenseQuery(entryQueryOptions(entryId));
}

export default useEntry;
