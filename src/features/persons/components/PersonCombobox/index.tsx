import { useCreatePersonMutation } from "../../hooks/useCreatePersonMutation";
import { useMemo, useState } from "react";
import { usePersons } from "../../hooks/usePersons";
import Combobox from "@/components/ui/combobox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export type PersonComboboxProps = {
  value: string;
  onChange: (value: string) => void;
};

function PersonCombobox({ value, onChange }: PersonComboboxProps) {
  const navigate = useNavigate();
  const { data: persons } = usePersons();
  const { mutate: createPerson } = useCreatePersonMutation();
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  const options = useMemo(
    () => persons?.map((person) => ({ id: person.id, label: person.name })) ?? [],
    [persons]
  );

  const handleCreateNew = async (value: string) => {
    return new Promise<string>((resolve, reject) => {
      createPerson(
        { name: value },
        {
          onSuccess: (newPerson) => {
            resolve(newPerson.id);
            onChange(newPerson.id);
            setAlertDialogOpen(true);
          },
          onError: () => reject("Something went wrong when creating a new person"),
        }
      );
    });
  };

  return (
    <>
      <Combobox value={value} options={options} onChange={onChange} onCreateNew={handleCreateNew} />

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Person</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to add more details about the person? It can help to provide you with a
              better experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setAlertDialogOpen(false);
                toast.success("Person created successfully");
              }}
            >
              Later
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate({ to: `/persons/${value}` })}>
              Add details
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PersonCombobox;
