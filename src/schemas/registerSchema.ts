import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres"),
  firstName: z.string().min(3, "Minimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password1: z.string().min(6,"Minimo 6 caracteres"),
  password2: z.string().min(6, "Mínimo 6 caracteres"), 
  terms: z.boolean("Debe aceptar los términos y condiciones")
  .refine((val) => val === true, {
    message: "Debe aceptar los términos y condiciones",
  }),
})
.refine((data) => data.password1 === data.password2, {
    message: "Las contraseñas no coinciden",
    path: ["password2"],
});

export type RegisterData = z.infer<typeof registerSchema>