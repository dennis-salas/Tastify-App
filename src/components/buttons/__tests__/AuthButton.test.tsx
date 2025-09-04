import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme/theme";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { AuthButton } from "../AuthButton";


const renderWithChakra = (ui:React.ReactElement) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>)

describe('AuthButton', () => {
    it("renderiza el boton con texto, llama a logout y muestra el icono cuando auth = true", async () => {
        const user = userEvent.setup()
        const logout = vi.fn()
        const handleRedirect = vi.fn()

        renderWithChakra(
            <AuthButton
            auth={true}
            logout={logout}
            handleRedirect={handleRedirect}
            text="Logout"
            />
        )

        const button = screen.getByRole('button',{name: /logout/i})
        expect(button).toBeInTheDocument()

        await  user.click(button)
        expect(logout).toHaveBeenCalledTimes(1)

        const icon = button.querySelector("svg");
        expect(icon).toBeInTheDocument();
    })

    it('Cuando auth = false renderiza - Register cuando pathname es /login', () => {
        const handleRedirect = vi.fn()
        const logout = vi.fn()
        window.history.pushState({}, "", "/login")

        renderWithChakra(
            <AuthButton
                auth={false}
                logout={logout}
                handleRedirect={handleRedirect}
            />
        )

        const button = screen.getByRole("button", { name: /register/i })
        expect(button).toBeInTheDocument()
    })

    it("renderiza 'Login' cuando pathname es distinto de /login", () => {
  window.history.pushState({}, "", "/register") // simula otra ruta

  renderWithChakra(
    <AuthButton
      auth={false}
      logout={vi.fn()}
      handleRedirect={vi.fn()}
    />
  )

  const button = screen.getByRole("button", { name: /login/i })
  expect(button).toBeInTheDocument()
})
})