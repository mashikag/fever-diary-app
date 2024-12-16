import FeverDiaryIDBClient from "@/lib/idbClient";

export function personQueryOptions(personId: string) {
  return {
    queryKey: ["person", personId],
    queryFn: () => {
      const idbClient = FeverDiaryIDBClient.getInstance();
      return idbClient.getPerson(personId);
    },
  };
}
