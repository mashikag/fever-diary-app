import { useQuery } from "@tanstack/react-query";
import FeverDiaryIDBClient from "@/lib/idbClient";
import { Person } from "@/types";

export const usePerson = (personId: string) => {
  return useQuery<Person>({
    queryKey: ["person", personId],
    queryFn: async () => {
      const client = FeverDiaryIDBClient.getInstance();
      const person = await client.getPerson(personId);
      if (!person) {
        throw new Error("Person not found");
      }
      return person;
    },
    refetchOnWindowFocus: false,
    enabled: !!personId,
  });
};

export default usePerson;
