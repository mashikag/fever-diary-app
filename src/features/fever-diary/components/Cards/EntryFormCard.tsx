import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntryForm, { EntryFormProps } from "../EntryForm";

type EntryFormCard = EntryFormProps;

export function EntryFormCard(props: EntryFormCard) {
  return (
    <Card variant="modern">
      <CardHeader>
        <CardTitle>New Diary Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <EntryForm {...props} />
      </CardContent>
    </Card>
  );
}
