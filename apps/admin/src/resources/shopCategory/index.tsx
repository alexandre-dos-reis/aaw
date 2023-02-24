import type { ShopCategory, Category } from "@aaw/prisma";
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { resources as r } from "../resources.map";

const sc = r.ShopCategory.fields;

const Name = (p: { label?: string }) => {
  const record = useRecordContext<ShopCategory>();

  const parentRecord = useGetOne<ShopCategory>(
    r.ShopCategory.name,
    {
      id: record.parentCategoryId || "",
    },
    {
      enabled: !!record.parentCategoryId,
    }
  );

  const name = record.parentCategoryId
    ? `${parentRecord.data?.name} ${record.name}`
    : `${record.name}`;

  return <div>{name}</div>;
};

export const shopCategoryResource: ResourceProps = {
  name: r.ShopCategory.name,
  options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <Name label="Nom" />
        <TextField source={sc.disposition} />
        <ReferenceField
          source={sc.parentCategoryId}
          reference={r.ShopCategory.name}
        />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source={sc.name} />
        <TextInput source={sc.slug} disabled />
        <TextInput source={sc.disposition} />
        <ReferenceInput
          source={sc.parentCategoryId}
          reference={r.ShopCategory.name}
        />
      </SimpleForm>
    </Edit>
  ),
};
