import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { FormProvider, useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { system } from "../../../theme/theme";
import { CustomInput } from "../CustomInput";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";


interface FormWrapperProps<T extends FieldValues> {
    children: ReactNode
    initialValues: DefaultValues<T>
} 

const FormWrapper = <T extends FieldValues>({
  children,
  initialValues,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({ defaultValues: initialValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormWrapper;

describe('CusrmInput', () => {
    it('Render del input', () => {
        render(
            <ChakraProvider value={system}>
                <FormWrapper initialValues={{email: ''}}>
                    <CustomInput name='email' label='Email' register={()=>{}} />
                </FormWrapper>
            </ChakraProvider>
        )

        const inputText = screen.getByText('Email')
        expect(inputText).toBeInTheDocument()
    })

    it("debería mostrar el mensaje de error",() => {
        render(
            <ChakraProvider value={system}>
                <FormWrapper initialValues={{email: ''}}>
                    <CustomInput name='email' label='Email' register={()=>{}} error="Email inválido" />
                </FormWrapper>
            </ChakraProvider>
        )
        const errorMessage = screen.getByText(/Email inválido/i);
        expect(errorMessage).toBeInTheDocument()
    })

    it('deberia permitir escribir en el input', async() => {
        render(
            <ChakraProvider value={system}>
                <FormWrapper initialValues={{ email: ''}}>
                    <CustomInput name="email" label="Email" register={() => {}} />
                </FormWrapper>
            </ChakraProvider>
        )

        const input = screen.getByLabelText("Email");
        await userEvent.type(input, "mi@email.com");

        expect(input).toHaveValue("mi@email.com");
    })
})