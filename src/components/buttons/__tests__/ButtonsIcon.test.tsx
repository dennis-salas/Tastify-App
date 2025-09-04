import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme/theme";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonsIcon } from "../ButtonsIcon";
import userEvent from "@testing-library/user-event";
import { useThemeStore } from "../../../store/themeStore";

const renderWithChakra = (ui:React.ReactElement) => 
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>)

describe('ButtonsIcon', () => {
  it('renderizado con label y aplicar estilos  de borde correctos', () => {
    renderWithChakra(
        <ButtonsIcon label="Login" w="100px" h="40px" borderRadius={8}/>
    )
    const button = screen.getByRole('button', {name: /login/i})

    expect(button).toBeInTheDocument()

    expect(button).toHaveStyle({
      width: "100px",
      height: "40px",
      borderRadius: "8px"
    })
  })

  it('renderizado sin label', () => {
    renderWithChakra(
        <ButtonsIcon icon={<svg data-testid="my-icon"></svg>}/>
    )
    const icon = screen.getByTestId("my-icon")
    expect(icon).toBeInTheDocument()
  })

  it('renderizado con label y icon', () => {
    renderWithChakra(
        <ButtonsIcon borderRadius="md" icon={<svg data-testid="my-icon"></svg>} label="Logaut"/>
    )
    const button = screen.getByRole('button', {name: /Logaut/i})
    expect(button).toBeInTheDocument()
    const icon = screen.getByTestId("my-icon")
    expect(icon).toBeInTheDocument()
    expect(button).toHaveStyle({ borderRadius: 'var(--chakra-radii-md)' })
  })

  it('llama onClick al  hacer click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    renderWithChakra(
        <ButtonsIcon onClick={onClick}/>
    )

    await user.click(screen.getByRole('button', { name: /button/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('usa color blanco en modo dark', () => {
   useThemeStore.setState({ colorMode: 'dark' })  

  renderWithChakra(<ButtonsIcon label="DarkMode" />)
  const button = screen.getByRole('button', { name: /darkmode/i })
  expect(button).toHaveStyle({ color: 'var(--chakra-colors-white)' })
  })

})