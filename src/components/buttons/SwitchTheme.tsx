import { Box, Icon } from "@chakra-ui/react"
import { FaSun, FaMoon } from "react-icons/fa"
import { useThemeStore } from "../../store/themeStore"

export const SwitchTheme = () => {
  const { colorMode, toggleTheme } = useThemeStore()
  const isDark = colorMode === "dark"
  return (
    <Box
      as="button"
      onClick={toggleTheme}
      w="50px"
      h="32px"
      bg="bg"
      borderRadius="full"
      p="2"
      position="relative"
      border="2px solid"
      borderColor="brand.500"
    >
      <Box
        position="absolute"
        left={isDark ? "2px" : "calc(100% - 28px)"}
        top="2px"
        w="26px"
        h="26px"
        borderRadius="full"
        transition="left 0.2s ease"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          as={isDark ? FaMoon : FaSun}
          color={isDark ? "white" : "brand.500"}
          fontSize="18px"
        />
      </Box>
    </Box>
  )
}

