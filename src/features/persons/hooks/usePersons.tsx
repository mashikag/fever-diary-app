import { useSuspenseQuery } from "@tanstack/react-query";
import FeverDiaryIDBClient from "@/lib/idbClient";

export const personsQueryOptions = () => {
  return {
    queryKey: ["persons"],
    queryFn: async () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getPersons();
    },
    refetchOnWindowFocus: false,
  };
};

export const usePersons = () => {
  return useSuspenseQuery(personsQueryOptions());
};
