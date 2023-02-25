import type { ShopCategory, Category } from "@aaw/prisma";
import { Grid } from "@mui/material";
import {
  AutocompleteInput,
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
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { resources as r } from "../resources.map";

const sc = r.ShopCategory.fields;

export const shopCategoryResource: ResourceProps = {
  name: r.ShopCategory.name,
  recordRepresentation: (r: ShopCategory) => r.name,
  options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={sc.name} />
        <TextField source={sc.disposition} />
        <ReferenceField
          source={sc.parentCategoryId}
          reference={r.ShopCategory.name}
          label="Catégorie parente"
        >
          <TextField source={sc.name} />
        </ReferenceField>
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <Form />
    </Edit>
  ),
};

const Form = () => (
  <SimpleForm>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextInput source={sc.name} label="Titre" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextInput source={sc.slug} disabled fullWidth />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ReferenceInput
          source={sc.parentCategoryId}
          reference={r.ShopCategory.name}
        >
          <SelectInput label="Catégorie associée" fullWidth />
        </ReferenceInput>
      </Grid>
      <Grid item xs={3}>
        <TextInput source={sc.disposition} fullWidth />
      </Grid>
    </Grid>
  </SimpleForm>
);

const CategoryField = () => {
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
