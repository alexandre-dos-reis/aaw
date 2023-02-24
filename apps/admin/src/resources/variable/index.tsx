import {
  Datagrid,
  Edit,
  List,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { Grid } from "@mui/material";

import { resources as r } from "../resources.map";
import { RichTextInput } from "ra-input-rich-text";
import { VAR_KEY_TYPE } from "@aaw/prisma/react";

export const variableResource: ResourceProps = {
  name: r.AdminVariable.name,
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput
            source="id"
            label="Clé unique de la varible"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput source="type" label="Type" disabled fullWidth />
        </Grid>
      </Grid>
      <TextInput source="title" label="Titre" fullWidth />
      {record.type === VAR_KEY_TYPE.HTML ? (
        <RichTextInput source="value" label="contenu" />
      ) : null}
      {record.type === VAR_KEY_TYPE.STRING ? (
        <TextInput source="value" label="contenu" />
      ) : null}
    </SimpleForm>
  );
};
