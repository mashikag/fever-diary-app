import { useCreatePersonMutation } from "../hooks/useCreatePersonMutation";
import { useMemo } from "react";
import { useGetPersons } from "../hooks/useGetPersons";
import Combobox from "@/components/ui/combobox";

export type PersonComboboxProps = {
  value: string;
  onChange: (value: string) => void;
};

function PersonCombobox({ value, onChange }: PersonComboboxProps) {
  const { data: persons } = useGetPersons();
  const { mutate: createPerson } = useCreatePersonMutation();

  const options = useMemo(
    () =>
      persons?.map((person) => ({ id: person.id, label: person.name })) ?? [],
    [persons]
  );

  const handleCreateNew = async (value: string) => {
    return new Promise<string>((resolve, reject) => {
      createPerson(
        { name: value },
        {
          onSuccess: (newPerson) => resolve(newPerson.id),
          onError: () =>
            reject("Something went wrong when creating a new person"),
        }
      );
    });
  };

  return (
    <Combobox
      value={value}
      options={options}
      onChange={onChange}
      onCreateNew={handleCreateNew}
    />
  );
}

export default PersonCombobox;
