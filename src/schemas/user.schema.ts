import * as z from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  dni: z
    .string()
    .length(8, "El DNI debe tener 8 dígitos")
    .regex(/^\d+$/, "El DNI solo debe contener números"),
  email: z.email("Ingresa un correo válido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  active: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;
