import FeverDiaryIDBClient from "@/lib/idbClient";
import { useQuery } from "@tanstack/react-query";

const useDiaryEntries = (personId: string) => {
  return useQuery({
    queryKey: ["fever-diary-entries", personId],
    queryFn: () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getEntriesByPerson(personId);
    },
    refetchOnWindowFocus: false,
  });
};

export default useDiaryEntries;
