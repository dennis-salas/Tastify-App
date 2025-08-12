import { Box, Checkbox } from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import type { RegisterData } from "../../schemas/registerSchema";

interface CheckboxInputProps {
  name:  keyof RegisterData;
  control: Control<RegisterData>;
  label: string;
  error?: string;
}

export const CheckboxInput = ({ name, control, label, error }: CheckboxInputProps) => {
  return (
    <Box mt={4}>

    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox.Root
          checked={field.value || false}
          onCheckedChange={(checked) => field.onChange(!!checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>{label}</Checkbox.Label>
          {error && <span style={{ color: "brand.500" }}>{error}</span>}
        </Checkbox.Root>
      )}
    />
    </Box>
  );
};
