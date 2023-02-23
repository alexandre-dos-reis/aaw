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
import { resources } from "../resources.map";

export const artworkResource: ResourceProps = {
  name: resources.artwork,
  recordRepresentation: (r) => r.name,
  options: { label: "Oeuvres" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="madeAt" />
        <BooleanField source="showInGallery" />
        <TextField source="filename" />
        <TextField source="watermarkedFilename" />
        <TextField source="designState" />
      </Datagrid>
    </List>
  ),
  create: () => (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} fullWidth />
        <TextInput source="slug" validate={[required()]} fullWidth />
        <TextInput source="description" multiline label="Short description" />
      </SimpleForm>
    </Create>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="slug" />
        <TextInput source="description" />
        <DateInput source="createdAt" />
        <DateInput source="updatedAt" />
        <TextInput source="madeAt" />
        <BooleanInput source="showInGallery" />
        <BooleanInput source="showInPortfolio" />
        <TextInput source="filename" />
        <TextInput source="watermarkedFilename" />
        <TextInput source="designState" />
      </SimpleForm>
    </Edit>
  ),
};
