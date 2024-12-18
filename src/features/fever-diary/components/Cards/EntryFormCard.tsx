import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntryForm, { EntryFormProps } from "../EntryForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type EntryFormCard = EntryFormProps & {
  onDelete?: () => void;
  title?: string;
};

export function EntryFormCard({ onDelete, title, ...props }: EntryFormCard) {
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
          <CardTitle>{title || "New Diary Entry"}</CardTitle>
        </CardHeader>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the diary entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardContent>
        <EntryForm {...props} />
      </CardContent>
    </Card>
  );
}
