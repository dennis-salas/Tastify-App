import { Box, Text } from "@chakra-ui/react";
import { Navbar } from "../navbar/Navbar";

export const Header = () => {
  return (
    <Box
      as="header"
      p={4}
      bg="brand.500"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      color="white"
    >
      <Text fontSize={["md", "lg", "xl"]}fontWeight="bold" whiteSpace="nowrap">
        Taskify-App
      </Text>
      <Navbar/>
    </Box>
  );
};
