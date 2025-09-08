import { ChakraProvider } from "@chakra-ui/react";
import { describe, expect, it, vi } from "vitest";
import { system } from "../../../theme/theme";
import { LoginForm } from "../LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("LoginForm", () => {
  it("deberia renderizar los campos de email y password", () => {
    const mockLogin = vi.fn();
    render(
      <ChakraProvider value={system}>
        <LoginForm onLogin={mockLogin} />
      </ChakraProvider>
    );
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("errores de validacion si se envia vacio", async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn();
    render(
      <ChakraProvider value={system}>
        <LoginForm onLogin={mockLogin} />
      </ChakraProvider>
    );
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });
    await user.click(submitButton);
    expect(await screen.findByText(/correo electrónico/i)).toBeInTheDocument();
    expect(await screen.findByText(/contraseña/i)).toBeInTheDocument();
  });

  it("debería llamar onLogin con email y password válidos", async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn();

    render(
      <ChakraProvider value={system}>
        <LoginForm onLogin={mockLogin} />
      </ChakraProvider>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    await user.type(emailInput, "test@email.com");
    await user.type(passwordInput, "123456");
    await user.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith("test@email.com", "123456");
  });
});
