import { Button, Center, Flex } from "@chakra-ui/react";
import type { MenuItem } from "../../../interfaces/menu";
import { useLocation, useNavigate } from "react-router";
import { SwitchTheme } from "../../buttons/SwitchTheme";
import { AuthButton } from "../../buttons/AuthButton";

interface DesktopMenuProps {
  auth: boolean;
  logout: () => void;
  menuItems: MenuItem[];
}

export const DesktopMenu = ({ auth, logout, menuItems }: DesktopMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = () => {
    if (location.pathname === "/login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  const navButtonStyles = {
    bg: "brand.500",
    _hover: {
      bg: "hoverMenu",
      color: "hoverText",
      transform: "scale(1.05)",
    },
  };
  return (
    <>
    <Center>
      <Flex gap={4}>
       {
        menuItems.map((item) => {
          if(!item.authRequired || auth) {
            return (
              <Button
                key={item.value}
                {...navButtonStyles}
                onClick={() => {
                  if(item.path){
                    navigate(item.path)
                  }
                }}
              >
                {item.label}
              </Button>
            )
          }
          return null
        })
       }
      </Flex>
    </Center>
    <Flex>
       <SwitchTheme/>
       <AuthButton 
         handleRedirect={handleRedirect}
         auth={auth}
         logout={logout}
       />
    </Flex>
    </>
  );
};
