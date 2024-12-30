import { MedicationType } from "@/constants";
import { ParacetamolCalculator } from "./paracetamolCalculator";
import { IbuprofenCalculator } from "./ibuprofenCalculator";
import { BaseMedicationCalculatorArgs } from "./baseMedicationCalculator";

export class MedicationCalculatorFactory {
  static createCalculator<MedT extends MedicationType>(
    medicationType: MedT,
    args?: Partial<BaseMedicationCalculatorArgs<MedT>>
  ) {
    switch (medicationType) {
      case MedicationType.Paracetamol:
        return new ParacetamolCalculator(
          args as BaseMedicationCalculatorArgs<MedicationType.Paracetamol>
        );
      case MedicationType.Ibuprofen:
        return new IbuprofenCalculator(
          args as BaseMedicationCalculatorArgs<MedicationType.Ibuprofen>
        );
      default:
        throw new Error(`No calculator found for medication type: ${medicationType}`);
    }
  }
}
