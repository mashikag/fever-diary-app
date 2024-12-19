import { MedicationType } from "@/constants";
import {
  ParacetamolForm,
  ParacetamolTabletStrength,
  ParacetamolSuppositoryStrength,
  ParacetamolSyrupStrength,
  IbuprofenForm,
  IbuprofenTabletStrength,
  IbuprofenCapsuleStrength,
  IbuprofenSuppositoryStrength,
  IbuprofenSuspensionStrength,
} from "@/constants/medicationType";

const medications = {
  [MedicationType.Paracetamol]: {
    label: "Paracetamol",
    forms: [
      {
        form: ParacetamolForm.Tablet,
        label: "Tablet",
        doseUnit: "tablets",
        variants: [
          {
            strength: ParacetamolTabletStrength.Mg250,
            label: "250mg",
          },
          {
            strength: ParacetamolTabletStrength.Mg500,
            label: "500mg",
          },
          {
            strength: ParacetamolTabletStrength.Mg1000,
            label: "1000mg",
          },
        ],
      },
      {
        form: ParacetamolForm.Suppository,
        label: "Suppository",
        doseUnit: "capsules",
        variants: [
          {
            strength: ParacetamolSuppositoryStrength.Mg60,
            label: "60mg",
          },
          {
            strength: ParacetamolSuppositoryStrength.Mg120,
            label: "120mg",
          },
          {
            strength: ParacetamolSuppositoryStrength.Mg250,
            label: "250mg",
          },
          {
            strength: ParacetamolSuppositoryStrength.Mg500,
            label: "500mg",
          },
          {
            strength: ParacetamolSuppositoryStrength.Mg1000,
            label: "1000mg",
          },
        ],
      },
      {
        form: ParacetamolForm.Syrup,
        label: "Syrup",
        doseUnit: "ml",
        variants: [
          {
            strength: ParacetamolSyrupStrength.MgPerMl24,
            label: "120/5ml",
          },
          {
            strength: ParacetamolSyrupStrength.MgPerMl50,
            label: "250mg/5ml",
          },
        ],
      },
    ],
  },
  [MedicationType.Ibuprofen]: {
    label: "Ibuprofen",
    forms: [
      {
        form: IbuprofenForm.Tablet,
        label: "Tablet",
        doseUnit: "tablets",
        variants: [
          {
            strength: IbuprofenTabletStrength.Mg200,
            label: "200mg",
          },
          {
            strength: IbuprofenTabletStrength.Mg400,
            label: "400mg",
          },
          {
            strength: IbuprofenTabletStrength.Mg600,
            label: "600mg",
          },
          {
            strength: IbuprofenTabletStrength.Mg800,
            label: "800mg",
          },
        ],
      },
      {
        form: IbuprofenForm.Capsule,
        label: "Capsule",
        doseUnit: "capsules",
        variants: [
          {
            strength: IbuprofenCapsuleStrength.Mg200,
            label: "200mg",
          },
          {
            strength: IbuprofenCapsuleStrength.Mg400,
            label: "400mg",
          },
        ],
      },
      {
        form: IbuprofenForm.Suppository,
        label: "Suppository",
        doseUnit: "capsules",
        variants: [
          {
            strength: IbuprofenSuppositoryStrength.Mg60,
            label: "60mg",
          },
          {
            strength: IbuprofenSuppositoryStrength.Mg125,
            label: "125mg",
          },
          {
            strength: IbuprofenSuppositoryStrength.Mg500,
            label: "500mg",
          },
        ],
      },
      {
        form: IbuprofenForm.Suspension,
        label: "Suspension",
        doseUnit: "ml",
        variants: [
          {
            strength: IbuprofenSuspensionStrength.MgPerMl20,
            label: "100mg/5ml",
          },
          {
            strength: IbuprofenSuspensionStrength.MgPerMl40,
            label: "200mg/5ml",
          },
        ],
      },
    ],
  },
};

export default medications;
