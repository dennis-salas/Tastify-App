import { Box } from "@chakra-ui/react"
import { CustomInput } from "../inputs/CustomInput"
import { loginSchema, type LoginData } from "../../schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "../buttons/CustomButton";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  const onSubmit = (data: LoginData) => {
    onLogin(data.email, data.password);
  };
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="email"
          label="Correo electrónico"
          type="email"
          required
          register={register}
          error={errors.email?.message ?? undefined}
        />

        <CustomInput
          name="password"
          label="Contraseña"
          type="password"
          required
          register={register}
          error={errors.password?.message ?? undefined}
        />
        <Box textAlign="center" mt={8}>
          <CustomButton typeButton="submit">
            Iniciar sesión
          </CustomButton>
        </Box>
    </form>
  )
}
