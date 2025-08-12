import { Box, Container, Flex } from "@chakra-ui/react"
import { Outlet } from "react-router"
import { Header } from "../../components/header/Header"

export const PublicLayout = () => {
  return (
    <Flex minH="100vh" direction="column" bg="bg" color="text">
      <Header/>
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md" py={10}>
          <Outlet/>
        </Container>
      </Box>
    </Flex>
  )
}
