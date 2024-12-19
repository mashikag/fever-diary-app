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
import { z } from "zod";

/**
 * Ideally the schema for medication would look slightly different.
 * We would have a nested discriminated union for medication form,
 * within discriminated union for medication type. Then each z.object would be
 * determined by the medication type AND medication form, where the combination of each object of the 2 would be unique (kind of like a composite key).
 * However, this is currently not possible with zod, see the issue:
 * https://github.com/colinhacks/zod/issues/1884
 */

export const entrySchema = z
  .object({
    date: z.date(),
    personId: z.string().min(1, "Person name is required"),
    temperature: z
      .number()
      .min(35, "Temperature must be at least 35°C")
      .max(43, "Temperature must be at most 43°C")
      .optional(),
    medication: z
      .discriminatedUnion("type", [
        z.object({
          type: z.literal(MedicationType.Paracetamol),
          form: z.discriminatedUnion("type", [
            z.object({
              type: z.literal(ParacetamolForm.Tablet),
              strength: z.preprocess((val) => Number(val), z.nativeEnum(ParacetamolTabletStrength)),
              dose: z.number().min(1, "Dose must be at least 1 mg"),
            }),
            z.object({
              type: z.literal(ParacetamolForm.Suppository),
              strength: z.preprocess(
                (val) => Number(val),
                z.nativeEnum(ParacetamolSuppositoryStrength)
              ),
              dose: z.number().min(1, "Dose must be at least 1 mg"),
            }),
            z.object({
              type: z.literal(ParacetamolForm.Syrup),
              strength: z.nativeEnum(ParacetamolSyrupStrength),
              dose: z.number().min(1, "Dose must be at least 1 ml"),
            }),
          ]),
        }),
        z.object({
          type: z.literal(MedicationType.Ibuprofen),
          form: z.discriminatedUnion("type", [
            z.object({
              type: z.literal(IbuprofenForm.Tablet),
              strength: z.nativeEnum(IbuprofenTabletStrength),
              dose: z.number().min(1, "Dose must be at least 1 mg"),
            }),
            z.object({
              type: z.literal(IbuprofenForm.Capsule),
              strength: z.nativeEnum(IbuprofenCapsuleStrength),
              dose: z.number().min(1, "Dose must be at least 1 mg"),
            }),
            z.object({
              type: z.literal(IbuprofenForm.Suppository),
              strength: z.nativeEnum(IbuprofenSuppositoryStrength),
              dose: z.number().min(1, "Dose must be at least 1 mg"),
            }),
            z.object({
              type: z.literal(IbuprofenForm.Suspension),
              strength: z.nativeEnum(IbuprofenSuspensionStrength),
              dose: z.number().min(1, "Dose must be at least 1 ml"),
            }),
          ]),
        }),
      ])
      .optional(),
  })
  .refine((data) => data.temperature || data.medication, {
    message: "Temperature or medication is required",
    path: ["temperature", "medicationType", "medicationDosage"],
  });
