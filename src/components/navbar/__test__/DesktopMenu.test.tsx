import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { system } from "../../../theme/theme";
import { DesktopMenu } from "../desktop/DesktopMenu";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/login" }),
  };
});

describe("DesktopMenu", () => {
  const menuItems = [
    { value: "home", label: "Home", path: "/", authRequired: false },
    { value: "dashboard", label: "Dashboard", path: "/dashboard", authRequired: true }
  ];

  it("muestra solo items públicos cuando no hay auth", () => {
    render(
      <ChakraProvider value={system}>
        <MemoryRouter>
          <DesktopMenu auth={false} logout={vi.fn()} menuItems={menuItems} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
  });

  it("muestra todos los items cuando hay auth", () => {
    render(
      <ChakraProvider value={system}>
        <MemoryRouter>
          <DesktopMenu auth={true} logout={vi.fn()} menuItems={menuItems} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it("navega al hacer click en un item", async () => {
    render(
      <ChakraProvider value={system}>
        <MemoryRouter>
          <DesktopMenu auth={true} logout={vi.fn()} menuItems={menuItems} />
        </MemoryRouter>
      </ChakraProvider>
    );

    await screen.getByText(/Home/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("redirige a /register si está en /login", async () => {
    render(
      <ChakraProvider value={system}>
        <MemoryRouter>
          <DesktopMenu auth={false} logout={vi.fn()} menuItems={menuItems} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const btn = screen.getByRole("button", { name: /login/i }); 
    await btn.click();
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});