import {
  Datagrid,
  Edit,
  FunctionField,
  List,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { resources } from "../resources.map";
import { RichTextInput } from "ra-input-rich-text";

export const variableResource: ResourceProps = {
  name: resources.adminVariable,
  options: { label: "Variables" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="title" label="Titre" />
        <TextField source="id" label="Clé" />
        <TextField source="type" label="Type" />
      </Datagrid>
    </List>
  ),

  edit: () => (
    <Edit>
      <Form />
    </Edit>
  ),
};

const Form = () => {
  const record = useRecordContext<{ type: string }>();
  return (
    <SimpleForm>
      <TextInput source="id" label="Clé unique de la varible" disabled />
      <TextInput source="type" label="Type" disabled />
      <TextInput source="title" label="Titre" />
      {record.type === "HTML" ? (
        <RichTextInput source="value" label="contenu" />
      ) : null}
      {record.type === "STRING" ? (
        <TextInput source="value" label="contenu" />
      ) : null}
    </SimpleForm>
  );
};
