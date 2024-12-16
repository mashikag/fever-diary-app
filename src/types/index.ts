import { MedicationType } from "@/constants";

export interface Person {
  id: string;
  name: string;
  dateOfBirth?: Date;
  weight?: number;
}

export interface FeverDiaryEntry {
  id: string;
  personId: string;
  date: Date;
  temperatureCelsius?: number;
  medicationType?: MedicationType;
  medicationDosage?: number;
}
