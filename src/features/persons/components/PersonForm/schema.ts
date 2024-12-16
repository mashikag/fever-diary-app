import { z } from "zod";

export const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.date().optional(),
  weight: z
    .number()
    .positive("Weight must be a positive number")
    .optional(),
});
