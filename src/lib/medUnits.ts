import { MedicationDoseUnit, MedicationType } from "@/constants";

export function resolveMedicationDoseUnits(medicationType: MedicationType) {
  switch (medicationType) {
    case "paracetamol":
    case "ibuprofen":
      return MedicationDoseUnit.Milliliters;
  }
}
