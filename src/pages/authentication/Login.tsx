import { Box, Text } from "@chakra-ui/react";
import { LoginForm } from "../../components/form/LoginForm";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";


export function Login() {

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    navigate("/app/dashboard");
  };
  return (
    <Box bg="white" color="black" p={8} borderRadius="lg" boxShadow="lg" maxWidth="500px" mx="auto" border="1px solid" borderColor="gray.200">
      <Text fontSize="xl" fontWeight="bold" textAlign="center" pb={4} color="brand.500">Login</Text>
      <LoginForm onLogin={handleLogin}/>
    </Box>
  );
}