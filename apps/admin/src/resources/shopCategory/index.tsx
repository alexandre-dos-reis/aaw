import type { ShopCategory } from "@aaw/prisma";
import { Grid } from "@mui/material";
import {
  Create,
  Datagrid,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { ParentCategoryField } from "~/components/domain/ParentCategoryField";
import { resources as r } from "~/resources/resources.map";

const sc = r.ShopCategory.fields;

export const shopCategoryResource: ResourceProps = {
  name: r.ShopCategory.name,
  recordRepresentation: (r: ShopCategory) => r.name,
  options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={sc.disposition} />
        <TextField source={sc.name} />
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
  create: () => (
    <Create>
      <Form />
    </Create>
  ),
};

const Form = () => {
  return (
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
            <SelectInput
              label="Catégorie parente"
              fullWidth
              optionText={<ParentCategoryField />}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={3}>
          <TextInput source={sc.disposition} fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
