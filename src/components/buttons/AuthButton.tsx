import { LuLogOut } from "react-icons/lu";
import { ButtonsIcon } from "./ButtonsIcon";

interface AuthBottonProps {
  auth: boolean;
  logout: () => void;
  handleRedirect: () => void;
  text?: string
}


export const AuthButton = ({ auth, logout, handleRedirect, text }: AuthBottonProps) => {
  if (auth) {
    return (
      <ButtonsIcon
        onClick={logout}
        icon={<LuLogOut />}
        w={"100px"}
        h={"32px"}
        borderRadius={"full"}
        label={text}
      />
    );
  }
  return (
    <ButtonsIcon
      onClick={handleRedirect}
      w={"75px"}
      h={"32px"}
      borderRadius="full"
      label={location.pathname === "/login" ? "Register" : "Login"}
    />
  );
};