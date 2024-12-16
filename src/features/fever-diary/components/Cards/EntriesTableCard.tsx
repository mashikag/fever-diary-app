import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntriesTable, { EntriesTableProps } from "../EntriesTable";
import { Person } from "@/types";

type EntriesTableCardProps = {
  person: Person;
} & EntriesTableProps;

export function EntriesTableCard({ person, ...props }: EntriesTableCardProps) {
  return (
    <Card variant="modern">
      <CardHeader>
        <CardTitle>{person.name}'s Diary</CardTitle>
      </CardHeader>
      <CardContent>
        <EntriesTable {...props} />
      </CardContent>
    </Card>
  );
}
