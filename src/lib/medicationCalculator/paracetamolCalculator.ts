import { MedicationType, ParacetamolForm } from "@/constants/medicationType";
import { BaseMedicationCalculator } from "./baseMedicationCalculator";
import { roundDownToHalf } from "../maths";

export class ParacetamolCalculator extends BaseMedicationCalculator<MedicationType.Paracetamol> {
  MIN_STANDARD_WEIGHT: number = 50;
  MAX_ADULT_SINGLE_DOSE_MG: number = 1000;
  MAX_CHILD_SINGLE_DOSE_MG: number = 500;
  MAX_SINGLE_DOSE_MG_PER_KG: number = 15;

  // Return the single recommended dose of paracetamol based on age and weight in mg
  calcRecommendedDose(): number {
    if (!this.medForm || !this.medStrength) {
      throw new Error("Missing medication form or strength");
    }

    const recommendedDoseMg = this.calcRecommendedDoseInMg();

    switch (this.medForm) {
      case ParacetamolForm.Tablet:
        return roundDownToHalf(recommendedDoseMg / this.medStrength);
      case ParacetamolForm.Suppository:
        return roundDownToHalf(recommendedDoseMg / this.medStrength);
      case ParacetamolForm.Syrup:
        // Multiply by 10 to round DOWN to 1 decimal, then divide by 10.
        return Math.floor((recommendedDoseMg / this.medStrength) * 10) / 10;
    }
  }

  calcRecommendedDoseInMg() {
    if (!this.weight) {
      throw new Error("Missing weight");
    }

    // For children under 12 years
    if (this.ageInMonths && this.ageInMonths < 12 * 12) {
      return Math.min(this.weight * this.MAX_SINGLE_DOSE_MG_PER_KG, this.MAX_CHILD_SINGLE_DOSE_MG);
    }

    return Math.min(this.weight * this.MAX_SINGLE_DOSE_MG_PER_KG, this.MAX_ADULT_SINGLE_DOSE_MG);
  }
}
