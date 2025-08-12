import { useForm } from "react-hook-form";
import { CustomInput } from "../inputs/CustomInput";
import {
  registerSchema,
  type RegisterData,
} from "../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckboxInput } from "../inputs/CheckboxInput";
import { CustomButton } from "../buttons/CustomButton";
import { Box } from "@chakra-ui/react";

interface RegisterFormProps {
  onRegister: (
    name: string,
    firstName: string,
    email: string,
    password1: string,
    password2: string,
    terms: boolean
  ) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = (data: RegisterData) => {
    onRegister(
      data.name,
      data.firstName,
      data.email,
      data.password1,
      data.password2,
      data.terms
    )
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="name"
        label="Nombres"
        type="text"
        required
        register={register}
        error={errors.name?.message ?? undefined}
      />
      <CustomInput
        name="firstName"
        label="Apellidos"
        type="text"
        required
        register={register}
        error={errors.firstName?.message ?? undefined}
      />
      <CustomInput
        name="email"
        label="Correo electrónico"
        type="email"
        required
        register={register}
        error={errors.email?.message ?? undefined}
      />
      <CustomInput
        name="password1"
        label="Contraseña"
        type="password"
        required
        register={register}
        error={errors.password1?.message ?? undefined}
      />
      <CustomInput
        name="password2"
        label="Contraseña"
        type="password"
        required
        register={register}
        error={errors.password2?.message ?? undefined}
      />
      <CheckboxInput
        name="terms"
        label="Acepto términos y condiciones"
        control={control}
        error={errors.terms?.message}
      />
      <Box textAlign="center" mt={8}>
        <CustomButton typeButton="submit">Enviar</CustomButton>
      </Box>
    </form>
  );
};
