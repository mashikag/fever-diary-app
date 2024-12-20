import FeverDiaryIDBClient from "@/lib/idbClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export function personQueryOptions(personId: string) {
  return {
    queryKey: ["person", personId],
    queryFn: async () => {
      const idbClient = FeverDiaryIDBClient.getInstance();
      const person = await idbClient.getPerson(personId);
      return person;
    },
  };
}

export function usePerson(personId: string) {
  return useSuspenseQuery(personQueryOptions(personId));
}
