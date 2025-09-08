import { Box, Checkbox } from "@chakra-ui/react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
}

export const CheckboxInput = <T extends FieldValues>({
  name,
  control,
  label,
  error
}: CheckboxInputProps<T>) => {
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
            {error && <span style={{ color: "brand.500" }} role="alert">{error}</span>}
          </Checkbox.Root>
        )}
      />
    </Box>
  );
};