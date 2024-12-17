import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonForm, { PersonFormProps } from "../PersonForm";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PersonFormCardProps = {
  title: string;
  personId?: string;
  onDelete?: () => void;
} & PersonFormProps;

function PersonFormCard({ title, onDelete, ...props }: PersonFormCardProps) {
  return (
    <Card variant="modern">
      <AlertDialog>
        <CardHeader
          action={
            onDelete && (
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash />
                </Button>
              </AlertDialogTrigger>
            )
          }
        >
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the person and all of their
              entries.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardContent>
        <PersonForm {...props} />
      </CardContent>
    </Card>
  );
}

export default PersonFormCard;
