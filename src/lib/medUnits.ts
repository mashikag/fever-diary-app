import { MedicationDoseUnit, MedicationType } from "@/constants";
import { MedicationForm } from "@/types";

export function resolveMedDoseUnitText<TMed extends MedicationType>(form: MedicationForm<TMed>) {
  switch (form) {
    case "tablet":
    case "suppository":
      return MedicationDoseUnit.Milligrams;
    case "syrup":
      return MedicationDoseUnit.Milliliters;
  }
  return "";
}
