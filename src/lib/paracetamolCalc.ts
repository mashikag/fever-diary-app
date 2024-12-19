import {
  ParacetamolForm,
  ParacetamolSuppositoryStrength,
  ParacetamolSyrupStrength,
  ParacetamolTabletStrength,
} from "@/constants/medicationType";

class ParacetamolCalculator {
  MIN_STANDARD_WEIGHT: number = 50;
  MAX_ADULT_SINGLE_DOSE_MG: number = 1000;
  MAX_CHILD_SINGLE_DOSE_MG: number = 500;
  MAX_SINGLE_DOSE_MG_PER_KG: number = 15;

  // Return the single recommended dose of paracetamol based on age and weight in mg
  recommendedDose(age: number, weight: number): number {
    if (age < 18) {
      return Math.min(weight * this.MAX_SINGLE_DOSE_MG_PER_KG, this.MAX_CHILD_SINGLE_DOSE_MG);
    }
    return Math.min(weight * this.MAX_SINGLE_DOSE_MG_PER_KG, this.MAX_ADULT_SINGLE_DOSE_MG);
  }

  recommendedStrength(form: ParacetamolForm, dose: number): number | undefined {
    switch (form) {
      case "tablet":
        return this.recommendedTabletStrength(dose);
      case "suppository":
        return this.recommendedSuppositoryStrength(dose);
      case "syrup":
        return this.recommendedSyrupStrength(dose);
    }
  }

  recommendedSuppositoryStrength(dose: number): ParacetamolSuppositoryStrength {
    const suppositoryStrengths = Object.values(ParacetamolSuppositoryStrength).filter(
      (val) => typeof val === "number" && val <= dose
    ) as ParacetamolSuppositoryStrength[];

    return suppositoryStrengths.length === 0
      ? ParacetamolSuppositoryStrength.Mg60
      : Math.max(...suppositoryStrengths);
  }

  recommendedSyrupStrength(dose: number): ParacetamolSyrupStrength {
    // Random decision to suggest the 24mg/ml when the dose is less than or equal to 120 mg, this will result in max 5ml of syrup
    if (dose <= 120) return ParacetamolSyrupStrength.MgPerMl24;
    return ParacetamolSyrupStrength.MgPerMl50;
  }

  // Return the recommended tablet strength based on the dose (in mg)
  recommendedTabletStrength(dose: number): ParacetamolTabletStrength {
    const tabletStrengths = Object.values(ParacetamolTabletStrength).filter(
      (val) => typeof val === "number" && val <= dose
    ) as ParacetamolTabletStrength[];

    return tabletStrengths.length === 0
      ? ParacetamolTabletStrength.Mg250
      : Math.max(...tabletStrengths);
  }
}
