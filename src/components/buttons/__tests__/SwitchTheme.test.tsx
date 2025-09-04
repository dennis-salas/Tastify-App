import { ChakraProvider } from "@chakra-ui/react"
import { system } from "../../../theme/theme"
import { describe, expect, it } from "vitest"
import { useThemeStore } from "../../../store/themeStore"
import { SwitchTheme } from "../SwitchTheme"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"


const renderWithChakra = (ui:React.ReactElement) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>)

    describe('SwitchTheme', () => {
        it('icono segun el estado', () =>{
            useThemeStore.setState({ colorMode: 'dark' })  

            renderWithChakra(
                <SwitchTheme/>
            )
        
        expect(screen.getByTestId("icon-moon")).toBeInTheDocument()
        })

        it("renderiza el icono de sol cuando el modo es light", () => {
            useThemeStore.setState({ colorMode: "light" })

            renderWithChakra(<SwitchTheme />)

            expect(screen.getByTestId("icon-sun")).toBeInTheDocument()
        })

        it("cambia de light a dark al hacer click", async () => {
            const user = userEvent.setup()
            useThemeStore.setState({ colorMode: "light" })

            renderWithChakra(<SwitchTheme />)

            expect(screen.getByTestId("icon-sun")).toBeInTheDocument()
            
            await user.click(screen.getByRole("button"))
            
            expect(useThemeStore.getState().colorMode).toBe("dark")
            
            expect(screen.getByTestId("icon-moon")).toBeInTheDocument()
        })

        it("cambia de dark a light al hacer click", async () => {
            const user = userEvent.setup()
            useThemeStore.setState({ colorMode: "dark" })

            renderWithChakra(<SwitchTheme />)

            expect(screen.getByTestId("icon-moon")).toBeInTheDocument()

            await user.click(screen.getByRole("button"))

            expect(useThemeStore.getState().colorMode).toBe("light")
            expect(screen.getByTestId("icon-sun")).toBeInTheDocument()
        })
    })