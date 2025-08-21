import { Box, Flex, Menu, Portal } from "@chakra-ui/react";
import { IoMenuSharp } from "react-icons/io5";
import { SwitchTheme } from "../../buttons/SwitchTheme";
import type { MenuItem } from "../../../interfaces/menu";
import { useLocation, useNavigate } from "react-router";
import { AuthButton } from "../../buttons/AuthButton";

interface MobileMenuProps {
  auth: boolean;
  logout: () => void;
  menuItems: MenuItem[];
}

export const MobileMenu = ({ auth, logout, menuItems }: MobileMenuProps) => {
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
    color: "hoverText",
    _hover: {
      transform: "scale(1.05)",
    },
  };
  return (
    <Flex as="nav" w="100%" px={4} py={2} justify="flex-end" align="center">
      <Menu.Root>
        <Menu.Trigger asChild>
          <IoMenuSharp />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner style={{ top: "16px", left: "30px" }} zIndex="toast">
            <Menu.Content
              color="white"
              shadow="xl"
              rounded="xl"
              minW="200px"
              py={3}
              px={2}
              zIndex="popover"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              {menuItems.map((item) => {
                if (!item.authRequired || auth) {
                  return (
                    <Menu.Item
                      key={item.value}
                      value={item.value}
                      onClick={() => {
                        if (item.path) {
                          navigate(item.path);
                        }
                      }}
                      {...navButtonStyles}
                      _hover={{
                        bg: "brand.500",
                        color: "white",
                        transform: "scale(1.03)",
                      }}
                      fontSize="md"
                      fontWeight="medium"
                      borderRadius="md"
                      px={3}
                      py={2}
                    >
                      {item.label}
                    </Menu.Item>
                  );
                }
              })}
              <Box display="flex" gap={6} mt={2}>
                <AuthButton
                  handleRedirect={handleRedirect}
                  auth={auth}
                  logout={logout}
                  text={"Logout"}
                />
                <SwitchTheme />
              </Box>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};
