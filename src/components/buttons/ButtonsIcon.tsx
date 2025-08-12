import { Button, IconButton, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useThemeStore } from "../../store/themeStore";

interface ButtonsIconProps {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  borderRadius?: string | number;
  w?: string | number;
  h?: string | number;
}

export const ButtonsIcon = ({ icon, label, onClick, borderRadius = "md", w, h }: ButtonsIconProps) => {

  const { colorMode } = useThemeStore()
  const isDark = colorMode === "dark"

  return (
    <Stack direction="row">
      {label ? (
        <Button onClick={onClick}  w={w} h={h} bg="bg" color={isDark ? "white" : "brand.500"} ml="4" borderRadius={borderRadius}>{icon} {label}</Button>
      ) : (
        <IconButton aria-label="button" onClick={onClick}  w={w} h={h} bg="bg" color={isDark ? "white" : "brand.500"} ml="4" borderRadius={borderRadius}>
          {icon}
        </IconButton>
      )}
    </Stack>
  );
};
