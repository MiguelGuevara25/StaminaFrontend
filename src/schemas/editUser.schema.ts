import { z } from "zod";

export const editUserSchema = z.object({
  dni: z.string().min(8, "El DNI debe tener 8 dígitos").max(8),
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(9, "El teléfono debe tener 9 dígitos").max(9),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;