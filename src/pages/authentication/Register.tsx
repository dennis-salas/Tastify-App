import { Box, Text } from "@chakra-ui/react";
import { RegisterForm } from "../../components/form/RegisterForm";
import { useRegisterStore } from "../../store/registerStore";
import { useNavigate } from "react-router";

export const Register = () => {
  const { sendRegister } = useRegisterStore();
  const navigate = useNavigate();

  const handleRegister = (
    name: string,
    firstName: string,
    email: string,
    password1: string,
    password2: string,
    terms: boolean
  ) => {
    sendRegister( name, firstName, email, password1, password2, terms );
    navigate("/login");
  };
  return (
    <Box
      bg="white"
      color="black"
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      maxWidth="500px"
      w={{ lg: "800px" }}
      mx="auto"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        textAlign="center"
        pb={4}
        color="brand.500"
      >
        Registro
      </Text>
      <RegisterForm onRegister={handleRegister}/>
    </Box>
  );
};
