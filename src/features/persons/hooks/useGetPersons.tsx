import { useQuery } from "@tanstack/react-query";
import FeverDiaryIDBClient from "@/lib/idbClient";
import { Person } from "@/types";

export const useGetPersons = () => {
  return useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: async () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getPersons();
    },
    refetchOnWindowFocus: false,
  });
};
