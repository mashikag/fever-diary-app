import { FeverDiaryEntry } from "@/types";
import { EntryFormValues } from "../components/EntryForm";

export const toFeverDiaryEntry = (data: EntryFormValues): Omit<FeverDiaryEntry, "id"> => {
  return {
    personId: data.personId,
    date: data.date,
    tempC: data.temperature,
    medType: data.medication?.type,
    medForm: data.medication?.form.type,
    medFormStrength: data.medication?.form.strength,
    medFormDose: data.medication?.form.dose,
  };
};

export const fromFeverDiaryEntry = (entry: FeverDiaryEntry): Partial<EntryFormValues> => {
  const medication = entry.medType
    ? ({
        type: entry.medType,
        form: {
          type: entry.medForm,
          strength: entry.medFormStrength,
          dose: entry.medFormDose,
        },
      } as EntryFormValues["medication"])
    : undefined;
  return {
    personId: entry.personId,
    date: entry.date,
    temperature: entry.tempC,
    medication,
  };
};
