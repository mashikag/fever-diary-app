import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonForm, { PersonFormProps } from "../PersonForm";

function PersonFormCard(props: PersonFormProps) {
  return (
    <Card variant="modern">
      <CardHeader>
        <CardTitle>Person Details</CardTitle>
      </CardHeader>
      <CardContent>
        <PersonForm {...props} />
      </CardContent>
    </Card>
  );
}

export default PersonFormCard;
