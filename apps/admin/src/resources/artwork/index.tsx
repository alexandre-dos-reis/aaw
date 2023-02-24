import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateInput,
  Edit,
  List,
  required,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources as r } from "../resources.map";
import { type Artwork } from "@aaw/prisma";

const a = r.Artwork.fields;

export const artworkResource: ResourceProps = {
  name: r.Artwork.name,
  recordRepresentation: (r: Artwork) => r.name,
  options: { label: "Oeuvres" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={a.name} />
        <TextField source={a.madeAt} />
        <BooleanField source={a.showInGallery} />
        <TextField source={a.filename} />
        <TextField source={a.watermarkedFilename} />
        <TextField source={a.designState} />
      </Datagrid>
    </List>
  ),
  create: () => (
    <Create>
      <SimpleForm>
        <TextInput source={a.name} validate={[required()]} fullWidth />
        <TextInput source={a.slug} validate={[required()]} fullWidth />
        <TextInput source={a.description} multiline label="Short description" />
      </SimpleForm>
    </Create>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source={a.name} />
        <TextInput source={a.slug} disabled/>
        <TextInput source={a.description} />
        <TextInput source={a.madeAt} />
        <BooleanInput source={a.showInGallery} />
        <BooleanInput source={a.showInPortfolio} />
        <TextInput source={a.filename} />
        <TextInput source={a.watermarkedFilename} />
        <TextInput source={a.designState} />
      </SimpleForm>
    </Edit>
  ),
};
