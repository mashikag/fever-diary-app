import FeverDiaryIDBClient from "@/lib/idbClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export function personQueryOptions(personId: string) {
  return {
    queryKey: ["person", personId],
    queryFn: () => {
      const idbClient = FeverDiaryIDBClient.getInstance();
      return idbClient.getPerson(personId);
    },
  };
}

export function usePerson(personId: string) {
  return useSuspenseQuery(personQueryOptions(personId));
}
