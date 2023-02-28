import { NumberInput, NumberInputProps } from "react-admin";

export const PriceInput = (p: Omit<NumberInputProps, "format" | "parse">) => {
  return (
    <NumberInput
      {...p}
      format={(v) => String(v / 100)}
      parse={(v) => parseFloat(v) * 100}
    />
  );
};
