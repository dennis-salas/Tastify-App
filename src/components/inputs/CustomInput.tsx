import {
  Field,
  Input,
  type InputProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import type { UseFormRegister } from "react-hook-form";

interface CustomInputProps extends InputProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ name, label, error, required = false, register, ...rest }) => {

    return (
      <Field.Root id={name}>
        <Field.Label mt={4}>
          {label}
          {required && <Field.RequiredIndicator />}
        </Field.Label>

        <Input
          {...register(name)}
          id={name}
          aria-invalid={!!error}
          {...rest}
          borderRadius="md"
        />

        {typeof error === "string" ? (
          <Field.HelperText role='alert'>{error}</Field.HelperText>
        ) : (
          <Field.HelperText />
        )}
      </Field.Root>
    );
  }
);

CustomInput.displayName = "CustomInput";