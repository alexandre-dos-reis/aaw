import {
  Create,
  Datagrid,
  Edit,
  List,
  ResourceProps,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useCreateContext,
  useEditContext,
  useInput,
} from "react-admin";
import { resources } from "../resources.map";
import { RichTextInput } from "ra-input-rich-text";

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
      <Form type="edit" />
    </Edit>
  ),
  create: () => (
    <Create>
      <Form type="create" />
    </Create>
  ),
};

const Form = (p: { type: "edit" | "create" }) => {
  return (
    <SimpleForm>
      <TextInput
        source="key"
        disabled={p.type === "edit"}
        label="Nom de la clé"
      />
      <SelectInput
        {...field}
        choices={[
          { id: "HTML", name: "HTML" },
          { id: "STRING", name: "STRING" },
        ]}
        required
        disabled={p.type === "edit"}
      />
      <RichTextInput source="value" label="contenu" />
    </SimpleForm>
  );
};
