import type { ShopCategory } from "@aaw/prisma";
import { useGetOne, useRecordContext } from "react-admin";
import { resources as r } from "~/resources/resources.map";

export const ParentCategoryField = () => {
  const record = useRecordContext<ShopCategory>();

  const { data: parentRecord } = useGetOne<ShopCategory>(
    r.ShopCategory.name,
    {
      id: record.parentCategoryId || "",
    },
    {
      enabled: !!record.parentCategoryId,
    }
  );

  const name = record.parentCategoryId
    ? `${parentRecord?.name} > ${record.name}`
    : `${record.name}`;

  return <span>{name}</span>;
};
