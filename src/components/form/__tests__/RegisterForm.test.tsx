import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { system } from "../../../theme/theme";
import { RegisterForm } from "../RegisterForm";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
  const mockRegister = vi.fn();

  const setup = () => {
    render(
      <ChakraProvider value={system}>
        <RegisterForm onRegister={mockRegister} />
      </ChakraProvider>
    );
  };

  it("render RegisterForm", () => {
    setup();
    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Contraseña/i).length).toBe(2);
    expect(
      screen.getByLabelText(/Acepto términos y condiciones/i)
    ).toBeInTheDocument();
  });

  it("debería mostrar errores cuando se envía vacío", async () => {
    render(
      <ChakraProvider value={system}>
        <RegisterForm onRegister={vi.fn()} />
      </ChakraProvider>
    );

    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    await userEvent.click(submitBtn);

    const errors = await screen.findAllByText(
      /Minimo 3 caracteres|Email inválido|Minimo 6 caracteres|Mínimo 6 caracteres|Debe aceptar los términos/i
    );

    expect(errors).toHaveLength(6);
  });

  it("debería llamar a onRegister si todo es válido", async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByLabelText(/Nombres/i), "Juan");
    await user.type(screen.getByLabelText(/Apellidos/i), "Pérez");
    await user.type(
      screen.getByLabelText(/Correo electrónico/i),
      "juan@test.com"
    );
    await user.type(screen.getAllByLabelText(/Contraseña/i)[0], "123456");
    await user.type(screen.getAllByLabelText(/Contraseña/i)[1], "123456");
    await user.click(screen.getByLabelText(/Acepto términos/i));

    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    await user.click(submitBtn);

    expect(mockRegister).toHaveBeenCalledWith(
      "Juan",
      "Pérez",
      "juan@test.com",
      "123456",
      "123456",
      true
    );
  });
});
