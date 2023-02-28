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
import { resources as r } from "~/resources/resources.map";
import { RichTextInput } from "ra-input-rich-text";
import { VAR_KEY_TYPE } from "@aaw/prisma/browser";
import { type AdminVariable } from "@aaw/prisma";
import { WatchedSlugInput } from "~/components/inputs/WatchedSlugInput";

const av = r.AdminVariable.fields;

export const variableResource: ResourceProps = {
  name: r.AdminVariable.name,
  recordRepresentation: (r: AdminVariable) => r.title || r.type,
  options: { label: "Variables" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="title" label="Titre" />
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
  const record = useRecordContext<AdminVariable>();
  return (
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput source={av.title} label="Titre" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <WatchedSlugInput
            sourceToWatch={av.title}
            source={av.slug}
            label="Slug"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
      {record.type === VAR_KEY_TYPE.HTML ? (
        <RichTextInput source="value" label=" " />
      ) : null}
      {record.type === VAR_KEY_TYPE.STRING ? (
        <TextInput source="value" label="contenu" />
      ) : null}
    </SimpleForm>
  );
};
