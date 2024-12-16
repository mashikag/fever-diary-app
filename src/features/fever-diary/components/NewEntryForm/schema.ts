import { MedicationType } from "@/constants";
import { z } from "zod";

export const entrySchema = z
  .object({
    date: z.date(),
    personId: z.string().min(1, "Person name is required"),
    temperature: z
      .number()
      .min(35, "Temperature must be at least 35°C")
      .max(43, "Temperature must be at most 43°C")
      .optional(),
    medicationType: z.nativeEnum(MedicationType).optional(),
    medicationDosage: z.number().positive("Dosage must be a positive number").optional(),
  })
  .refine((data) => data.temperature || (data.medicationType && data.medicationDosage), {
    message: "Temperature or medication is required",
    path: ["temperature", "medicationType", "medicationDosage"],
  });
