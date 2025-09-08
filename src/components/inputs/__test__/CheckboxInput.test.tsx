import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { CheckboxInput } from "../CheckboxInput";
import { system } from "../../../theme/theme";
import {
  useForm,
  FormProvider,
  type FieldValues,
  type UseFormReturn,
  type DefaultValues,
} from "react-hook-form";
import type { ReactNode } from "react";

interface FormWrapperProps<T extends FieldValues> {
  children: (methods: UseFormReturn<T>) => ReactNode;
  initialValues: DefaultValues<T>; // 👈 clave
}

const FormWrapper = <T extends FieldValues>({
  children,
  initialValues,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({ defaultValues: initialValues });
  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};

export default FormWrapper;


describe("CheckboxInput", () => {
  it("should render with the correct label", () => {
    render(
      <ChakraProvider value={system}>
        <FormWrapper initialValues={{ myCheckbox: false }}>
          {(methods) => (
            <CheckboxInput
              name="myCheckbox"
              label="Acepto los términos y condiciones"
              control={methods.control}
            />
          )}
        </FormWrapper>
      </ChakraProvider>
    );

    const checkboxLabel = screen.getByLabelText(/acepto los términos y condiciones/i);
    expect(checkboxLabel).toBeInTheDocument();
  });

  it("should toggle the checkbox state when clicked", async () => {
    const user = userEvent.setup();
    render(
      <ChakraProvider value={system}>
        <FormWrapper initialValues={{ myCheckbox: false }}>
          {(methods) => (
            <CheckboxInput
              name="myCheckbox"
              label="Acepto los términos y condiciones"
              control={methods.control}
            />
          )}
        </FormWrapper>
      </ChakraProvider>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should display the error message when error prop is provided", () => {
    render(
      <ChakraProvider value={system}>
        <FormWrapper initialValues={{ myCheckbox: false }}>
          {(methods) => (
            <CheckboxInput
              name="myCheckbox"
              label="Acepto los términos y condiciones"
              control={methods.control}
              error="Debes aceptar para continuar"
            />
          )}
        </FormWrapper>
      </ChakraProvider>
    );

    const errorMessage = screen.getByText(/debes aceptar para continuar/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
