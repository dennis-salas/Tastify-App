import { useAuthStore } from "../../store/authStore";
import { useBreakpointValue } from "@chakra-ui/react";
import { DesktopMenu } from "./desktop/DesktopMenu";
import { MobileMenu } from "./mobile/MobileMenu";

export const Navbar = () => {
  const menuItems = [
    {
      value: "dashboard",
      label: "Inicio",
      authRequired: true,
      path: "dashboard",
    },
    { value: "tasks", label: "Tareas", authRequired: true, path: "task" },
    {
      value: "calendar",
      label: "Calendario",
      authRequired: true,
      path: "calendar",
    },
  ];

  const { logout, auth } = useAuthStore();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <DesktopMenu
          auth={auth}
          logout={logout}
          menuItems={menuItems}
        />
      ) : (
        <MobileMenu
          auth={auth}
          logout={logout}
          menuItems={menuItems}
        />
      )}
    </>
  );
};
