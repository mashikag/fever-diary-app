import { MedicationType, MedicationDoseUnit } from "@/constants";

export interface FeverDiaryEntry {
  id: string;
  personId: string;
  date: Date;
  temperature: number;
  medication: MedicationType;
  medicationDose: number;
  medicationDoseUnits: MedicationDoseUnit;
}
