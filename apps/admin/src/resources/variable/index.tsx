import {
  Datagrid,
  Edit,
  List,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources } from "../resources.map";

export const variableResource: ResourceProps = {
  name: resources.adminVariable,
  options: { label: "Variables" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="key" />
        <TextField source="value" />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source="key" disabled label="clé" />
        <TextInput source="value" label="valeur" />
      </SimpleForm>
    </Edit>
  ),
};
