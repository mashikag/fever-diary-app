export interface Person {
  id: string;
  name: string;
  dateOfBirth?: Date;
  weight?: number;
}

export interface FeverDiaryEntry {
  id: string;
  personId: string;
  timestamp: Date;
  temperatureCelsius?: number;
  medicationType?: string;
  medicationDosage?: string;
}

export type MedicationType = "Paracetamol" | "Ibuprofen" | "Other";
