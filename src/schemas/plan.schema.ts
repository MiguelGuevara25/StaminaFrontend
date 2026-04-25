import * as z from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  durationDays: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
  description: z.string().optional(),
});

export type PlanFormValues = z.input<typeof planSchema>;
