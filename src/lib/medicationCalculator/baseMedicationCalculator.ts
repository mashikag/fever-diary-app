import { MedicationType } from "@/constants";
import { toAgeInMonths } from "../utils";
import { MedicationForm, MedicationFormStrength } from "@/types";

export type BaseMedicationCalculatorArgs<MedT extends MedicationType = MedicationType> = {
  weight: number;
  dob: Date;
  medForm: MedicationForm<MedT>;
  medStrength: MedicationFormStrength<MedT>;
};

export class BaseMedicationCalculator<MedT extends MedicationType = MedicationType> {
  ageInMonths: number | undefined;
  weight: number | undefined;
  medForm: MedicationForm<MedT> | undefined;
  medStrength: MedicationFormStrength<MedT> | undefined;
  dob = new Date();

  constructor(args: Partial<BaseMedicationCalculatorArgs<MedT>> = {}) {
    this.setArgs(args);
  }

  // This is an abstract method, to be implemented by subclasses
  calcRecommendedDose(): number {
    throw new Error("Method not implemented.");
  }

  setWeight(weight: number): void {
    this.weight = weight;
  }

  setDOB(dob: Date): void {
    this.dob = dob;
    this.ageInMonths = toAgeInMonths(dob);
  }

  setMedForm(medForm: MedicationForm<MedT>): void {
    this.medForm = medForm;
  }

  setMedStrength(medStrength: MedicationFormStrength<MedT>): void {
    this.medStrength = medStrength;
  }

  setArgs(args: Partial<BaseMedicationCalculatorArgs<MedT>> = {}): void {
    if (args.weight) this.weight = args.weight;
    if (args.medForm) this.medForm = args.medForm;
    if (args.medStrength) this.medStrength = args.medStrength;

    if (args.dob) {
      this.dob = args.dob;
      this.ageInMonths = toAgeInMonths(args.dob);
    }
  }

  getArgs(): Partial<BaseMedicationCalculatorArgs<MedT>> {
    return {
      weight: this.weight,
      dob: this.dob,
      medForm: this.medForm,
      medStrength: this.medStrength,
    };
  }
}
