import Github from "@uiw/react-color-github";
import { useInput } from "react-admin";
import Circle from "@uiw/react-color-circle";

export const ColorPickerInput = (p: { source: string }) => {
  const {
    id,
    field: { onBlur, onChange, ref, value },
    fieldState,
  } = useInput({ source: p.source });

  return (
    <div>
      {/* TODO implement errors with MUI, etc... */}
      <Circle
        colors={[
          "#F44336",
          "#E91E62",
          "#9C27B0",
          "#3F50B5",
          "#2096F3",
          "#00A8F4",
          "#00BCD4",
          "#009688",
          "#4CAF4F",
          "#8BC24A",
          "#CDDC39",
          "#FFEB3A",
          "#FFC007",
          "#FF9800",
          "#FF5721",
          "#0E1117",
          "#607D8A",
          "#e1ddda",
        ]}
        id={id}
        color={value}
        onChange={(color) => onChange(color.hex)}
        ref={ref}
        onBlur={onBlur}
      />
    </div>
  );
};
