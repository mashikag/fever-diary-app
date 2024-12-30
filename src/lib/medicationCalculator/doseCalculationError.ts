import { MedicationType } from "@/constants";
import { BaseMedicationCalculatorArgs } from "./baseMedicationCalculator";

export enum DoseCalculationErrorCode {
  CHILD_UNDER_6_MONTHS = "CHILD_UNDER_6_MONTHS",
}

type ChildUnder6MonthsMeta = {
  dose: number;
};

type DoseCalculationErrorCause<
  ET extends DoseCalculationErrorCode = DoseCalculationErrorCode,
  MedT extends MedicationType = MedicationType,
> = {
  code: ET;
  args: Partial<BaseMedicationCalculatorArgs<MedT>>;
  meta: ET extends DoseCalculationErrorCode.CHILD_UNDER_6_MONTHS ? ChildUnder6MonthsMeta : never;
};

export class DoseCalculationError extends Error {
  cause: DoseCalculationErrorCause;

  constructor(message: string, cause: DoseCalculationErrorCause) {
    super(message);
    this.name = "DoseCalculationError";
    this.cause = cause;
  }
}
