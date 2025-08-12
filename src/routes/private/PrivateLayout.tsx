import { Box, Flex } from "@chakra-ui/react"
import { Navigate, Outlet } from "react-router"
import { Header } from "../../components/header/Header"
import { useAuthStore } from "../../store/authStore"


export const PrivateLayout = () => {
  
  const { auth } = useAuthStore()

  if(!auth) {
    return <Navigate to="/login" replace/>
  }

  return (
    <Flex minH="100vh" direction="column" bg="bg" color="text">
      <Header/>
      <Box as="main" flex="1" p={6}>
        <Outlet/>
      </Box>
    </Flex>
  )
}
