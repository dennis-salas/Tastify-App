import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { CustomButton } from '../CustomButton';
import { system } from '../../../theme/theme';

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('CustomButton', () => {
  it('renderiza el texto (children)', () => {
    renderWithChakra(
      <CustomButton typeButton="button">Enviar</CustomButton>
    );
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('aplica el atributo type correcto', () => {
    renderWithChakra(
      <CustomButton typeButton="submit">Guardar</CustomButton>
    );
    const btn = screen.getByRole('button', { name: /guardar/i });
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('llama onClickButton al hacer click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithChakra(
      <CustomButton typeButton="button" onClickButton={onClick}>
        Click
      </CustomButton>
    );

    await user.click(screen.getByRole('button', { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
