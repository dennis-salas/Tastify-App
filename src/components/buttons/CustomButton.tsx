import { Button } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface CustomButtonProps {
    children: ReactNode,
    typeButton: "button" | "reset" | "submit" | undefined,
    onClickButton?: () => void 
}

export const CustomButton = ({children, typeButton, onClickButton}: CustomButtonProps) => {
  return (
    <Button type={typeButton} color="white" bg="buttonBg" onClick={onClickButton}>
      {children}
    </Button>
  );
};
