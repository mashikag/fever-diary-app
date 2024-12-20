import { MedicationType } from "@/constants";
import {
  IbuprofenCapsuleStrength,
  IbuprofenForm,
  IbuprofenSuppositoryStrength,
  IbuprofenSuspensionStrength,
  IbuprofenTabletStrength,
  ParacetamolForm,
  ParacetamolSuppositoryStrength,
  ParacetamolSyrupStrength,
  ParacetamolTabletStrength,
} from "@/constants/medicationType";

export interface Person {
  id: string;
  name: string;
  dateOfBirth?: Date;
  weight?: number;
}

export interface FeverDiaryEntry<TMed extends MedicationType = MedicationType> {
  id: string;
  personId: string;
  date: Date;
  tempC?: number;
  medType?: TMed;
  medForm?: MedicationForm<TMed>;
  medFormStrength?: number;
  medFormDose?: number;
}

export type MedicationForm<TMed extends MedicationType = MedicationType> =
  TMed extends "paracetamol" ? ParacetamolForm : TMed extends "ibuprofen" ? IbuprofenForm : never;

export type MedicationFormStrength<
  TMed extends MedicationType = MedicationType,
  TForm extends MedicationForm<TMed> = MedicationForm<TMed>,
> = TForm extends ParacetamolForm.Suppository
  ? ParacetamolSuppositoryStrength
  : TForm extends ParacetamolForm.Syrup
    ? ParacetamolSyrupStrength
    : TForm extends ParacetamolForm.Tablet
      ? ParacetamolTabletStrength
      : TForm extends IbuprofenForm.Capsule
        ? IbuprofenCapsuleStrength
        : TForm extends IbuprofenForm.Suppository
          ? IbuprofenSuppositoryStrength
          : TForm extends IbuprofenForm.Suspension
            ? IbuprofenSuspensionStrength
            : TForm extends IbuprofenForm.Tablet
              ? IbuprofenTabletStrength
              : never;
