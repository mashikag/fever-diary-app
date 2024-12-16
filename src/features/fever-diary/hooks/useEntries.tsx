import { useQuery } from "@tanstack/react-query";
import FeverDiaryIDBClient from "@/lib/idbClient";

export function entriesQueryOptions() {
  return {
    queryKey: ["entries"],
    queryFn: () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getAllEntries();
    },
  };
}

export function useEntries() {
  const options = entriesQueryOptions();
  return useQuery(options);
}
