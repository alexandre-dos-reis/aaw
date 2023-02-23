import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditGuesser,
  List,
  ListGuesser,
  NumberField,
  NumberInput,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources } from "../resources.map";

export const categoryResource: ResourceProps = {
    name: resources.category,
    options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <BooleanField source="showInGallery" />
        <TextField source="description" />
        <NumberField source="disposition" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="slug" />
        <TextInput source="description" />
        <NumberInput source="disposition" />
        <DateInput source="updatedAt" />
        <BooleanInput source="showInGallery" />
      </SimpleForm>
    </Edit>
  ),
};
