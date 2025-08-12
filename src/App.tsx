import { BrowserRouter } from "react-router"
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme/theme.ts'
import { AppRoutes } from "./routes/AppRoutes.tsx"
import { useThemeStore } from "./store/themeStore.ts"
import { useEffect } from "react"

function App() {
  const colorMode = useThemeStore((state) => state.colorMode)

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(colorMode)
  }, [colorMode])

  return (
    <BrowserRouter>
      <ChakraProvider 
        value={system}>
        <AppRoutes/>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
