import * as z from "zod";

export const subscriptionSchema = z.object({
  plan: z.string().min(1, "Selecciona un plan"),
  startDate: z.date({ error: "Selecciona una fecha de inicio" }),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
