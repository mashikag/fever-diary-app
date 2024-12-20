import { FeverDiaryEntry } from "@/types";
import { EntryFormValues } from "../components/EntryForm";

export const toFeverDiaryEntry = (
  data: EntryFormValues,
  id?: string
): Omit<FeverDiaryEntry, "id"> => {
  return {
    personId: data.personId,
    date: data.date,
    ...(id ? { id } : {}),
    ...(data.showTemperature ? { tempC: data.temperature } : {}),
    ...(data.medication?.show
      ? {
          medType: data.medication?.value.type,
          medForm: data.medication?.value.form.type,
          medFormStrength: data.medication?.value.form.strength,
          medFormDose: data.medication?.value.form.dose,
        }
      : {}),
  };
};

export const fromFeverDiaryEntry = (entry: FeverDiaryEntry): Partial<EntryFormValues> => {
  return {
    personId: entry.personId,
    date: entry.date,
    showTemperature: !!entry.tempC,
    temperature: entry.tempC,
    medication: {
      show: !!entry.medType,
      value: {
        type: entry.medType,
        form: {
          type: entry.medForm,
          strength: entry.medFormStrength,
          dose: entry.medFormDose,
        },
      },
    } as EntryFormValues["medication"],
  };
};
