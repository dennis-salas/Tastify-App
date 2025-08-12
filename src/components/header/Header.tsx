import { Box, Text } from "@chakra-ui/react"
import { SwitchTheme } from "../buttons/SwitchTheme"
import { ButtonsIcon } from "../buttons/ButtonsIcon"
import { useAuthStore } from "../../store/authStore"
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";

export const Header = () => {
  const { logout, auth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation();

  const handleRedirect = () => {
    if (location.pathname === "/login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };
  return (
    <Box as="header" p={4} bg="brand.500" display="flex" justifyContent="space-between" color="white">
        <Text fontSize="xl" fontWeight="bold">Taskify-App</Text>
        <Box display="flex" alignItems="center" justifyContent="center">
          <SwitchTheme />
          {
            !auth ?
            <ButtonsIcon
            onClick={handleRedirect}
            w={"75px"}
            h={"28px"}
            borderRadius="full"
            label={location.pathname === "/login" ? "Register" : "Login"}
          />
            :
            <ButtonsIcon
            onClick={logout}
            icon={<LuLogOut/>}
            w={"45px"}
            h={"28px"}
            borderRadius={"full"}
          />
          }
        </Box>
    </Box>
  )
}
