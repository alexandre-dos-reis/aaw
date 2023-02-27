import { type Category } from "@aaw/prisma";
import { Grid } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  NumberInput,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources as r } from "../resources.map";

const c = r.Category.fields;

export const categoryResource: ResourceProps = {
  name: r.Category.name,
  recordRepresentation: (r: Category) => r.name,
  options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source={c.disposition} />
        <TextField source={c.name} />
        <BooleanField source={c.showInGallery} />
        <TextField source={c.description} />
        <DateField source={c.updatedAt} />
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

const Form = () => (
  <SimpleForm>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextInput source={c.name} fullWidth label="Titre" />
      </Grid>
      <Grid item xs={6}>
        <TextInput source={c.slug} fullWidth disabled />
      </Grid>
    </Grid>
    <TextInput source={c.description} fullWidth multiline />
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <NumberInput source={c.disposition} fullWidth />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BooleanInput
          source={c.showInGallery}
          fullWidth
          label="Afficher dans la galerie ?"
        />
      </Grid>
    </Grid>
  </SimpleForm>
);
