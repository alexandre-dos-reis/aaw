import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";

interface Props extends Omit<FunctionFieldProps, "render" | "source"> {
  source: string;
}

export const PriceField = ({ source, ...p }: Props) => {
  return (
    <FunctionField
      {...p}
      render={(record: RaRecord) =>
        (record[source] / 100).toString().replace(".", ",")
      }
    />
  );
};
