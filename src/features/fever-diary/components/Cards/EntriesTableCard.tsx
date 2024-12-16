import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntriesTable, { EntriesTableProps } from "../EntriesTable";
import { Person } from "@/types";

type EntriesTableCardProps = {
  person?: Person;
} & EntriesTableProps;

export function EntriesTableCard({ person, ...props }: EntriesTableCardProps) {
  const title = person ? `${person.name}'s Diary` : "All Diary Entries";
  return (
    <Card variant="modern">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <EntriesTable {...props} />
      </CardContent>
    </Card>
  );
}
