import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonForm, { PersonFormProps } from "../PersonForm";
import { Button } from "@/components/ui/button";

function PersonFormCard(props: PersonFormProps) {
  return (
    <Card variant="modern">
      <CardHeader
        action={
          <Button variant="destructive">
            <Trash />
          </Button>
        }
      >
        <CardTitle>Person Details</CardTitle>
      </CardHeader>
      <CardContent>
        <PersonForm {...props} />
      </CardContent>
    </Card>
  );
}

export default PersonFormCard;
