import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources as r } from "../resources.map";
import { type Artwork } from "@aaw/prisma";
import { Grid } from "@mui/material";
import { GridContainer } from "../../components/form/GridContainer";
import { GridItem } from "../../components/form/GridItem";

const a = r.Artwork.fields;

export const artworkResource: ResourceProps = {
  name: r.Artwork.name,
  recordRepresentation: (r: Artwork) => r.name,
  options: { label: "Oeuvres" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={a.name} />
        <DateField source={a.madeAt} />
        <BooleanField source={a.showInGallery} />
        <TextField source={a.filename} />
        <TextField source={a.watermarkedFilename} />
        <TextField source={a.designState} />
      </Datagrid>
    </List>
  ),
  create: () => (
    <Create>
      <Form />
    </Create>
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
        <TextInput source={a.name} label="Titre" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextInput source={a.slug} disabled fullWidth />
      </Grid>
    </Grid>
    <TextInput source={a.description} multiline fullWidth />
    <GridContainer>
      <Grid item xs={4}>
        <DateInput source={a.madeAt} label="Créée le" fullWidth />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BooleanInput
          source={a.showInGallery}
          label="Afficher dans la galerie ?"
        />
      </Grid>
    </GridContainer>

    {/* <TextInput source={a.filename} />
    <TextInput source={a.watermarkedFilename} />
    <TextInput source={a.designState} /> */}
  </SimpleForm>
);
