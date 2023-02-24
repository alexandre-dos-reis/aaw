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
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources as r } from "../resources.map";

const c = r.Category.fields;

export const categoryResource: ResourceProps = {
  name: r.Category.name,
  options: { label: "Catégories" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={c.name} />
        <BooleanField source={c.showInGallery} />
        <TextField source={c.description} />
        <NumberField source={c.disposition} />
        <DateField source={c.updatedAt} />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source={c.name} />
        <TextInput source={c.slug} />
        <TextInput source={c.description} />
        <NumberInput source={c.disposition} />
        <DateInput source={c.updatedAt} />
        <BooleanInput source={c.showInGallery} />
      </SimpleForm>
    </Edit>
  ),
};
