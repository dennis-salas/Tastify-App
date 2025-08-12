import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6,"Minimo 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;