import { MedicationType } from "@/constants";
import { IbuprofenForm, ParacetamolForm } from "@/constants/medicationType";

export interface Person {
  id: string;
  name: string;
  dateOfBirth?: Date;
  weight?: number;
}

export interface FeverDiaryEntry<TMed extends MedicationType = MedicationType> {
  id: string;
  personId: string;
  date: Date;
  tempC?: number;
  medType?: TMed;
  medForm?: MedicationForm<TMed>;
  medFormStrength?: number;
  medFormDose?: number;
}

export type MedicationForm<TMed extends MedicationType> = TMed extends "paracetamol"
  ? ParacetamolForm
  : TMed extends "ibuprofen"
    ? IbuprofenForm
    : never;
