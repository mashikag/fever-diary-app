import FeverDiaryIDBClient from "@/lib/idbClient";
import { useQuery } from "@tanstack/react-query";

const useEntriesByPerson = (personId: string) => {
  return useQuery({
    queryKey: ["entries", personId],
    queryFn: () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getEntriesByPerson(personId);
    },
    refetchOnWindowFocus: false,
  });
};

export default useEntriesByPerson;
