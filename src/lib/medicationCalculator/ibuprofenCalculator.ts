import { MedicationType, IbuprofenForm } from "@/constants/medicationType";
import { BaseMedicationCalculator } from "./baseMedicationCalculator";
import { roundDownToHalf } from "../maths";
import { DoseCalculationError, DoseCalculationErrorCode } from "./doseCalculationError";

export class IbuprofenCalculator extends BaseMedicationCalculator<MedicationType.Ibuprofen> {
  MIN_STANDARD_WEIGHT: number = 50;
  MAX_ADULT_SINGLE_DOSE_MG: number = 400;
  MAX_CHILD_UNDER_12_SINGLE_DOSE_MG: number = 200;
  MAX_SINGLE_DOSE_MG_PER_KG: number = 10; // Maximum 10mg/kg per dose

  calcRecommendedDose(): number {
    if (!this.medForm || !this.medStrength) {
      throw new Error("Missing medication form or strength");
    }

    const recommendedDoseMg = this.calcRecommendedDoseInMg();

    switch (this.medForm) {
      case IbuprofenForm.Tablet:
      case IbuprofenForm.Capsule:
      case IbuprofenForm.Suppository:
        return roundDownToHalf(recommendedDoseMg / this.medStrength);
      case IbuprofenForm.Suspension:
        // Multiply by 10 to round DOWN to 1 decimal, then divide by 10
        return Math.floor((recommendedDoseMg / this.medStrength) * 10) / 10;
    }
  }

  calcRecommendedDoseInMg(): number {
    if (!this.weight) {
      throw new Error("Missing weight");
    }

    // For children under 12 years
    if (this.ageInMonths !== undefined && this.ageInMonths < 12 * 12) {
      const dose = Math.min(
        this.weight * this.MAX_SINGLE_DOSE_MG_PER_KG,
        this.MAX_CHILD_UNDER_12_SINGLE_DOSE_MG
      );

      if (this.ageInMonths <= 6) {
        throw new DoseCalculationError(
          "Ibuprofen is not recommended for children under 6 months, unless prescribed by a doctor.",
          {
            code: DoseCalculationErrorCode.CHILD_UNDER_6_MONTHS,
            args: this.getArgs(),
            meta: { dose },
          }
        );
      }

      return dose;
    }

    // For adults
    return Math.min(this.weight * this.MAX_SINGLE_DOSE_MG_PER_KG, this.MAX_ADULT_SINGLE_DOSE_MG);
  }
}
