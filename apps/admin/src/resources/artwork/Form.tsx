import { Grid } from "@mui/material";
import {
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  useRecordContext,
  useGetList,
  SelectArrayInput,
  TabbedForm,
} from "react-admin";
import { useSave } from "~/hooks/useSave";
import { getResourceSchema } from "@aaw/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resources as r } from "~/resources/resources.map";
import { ENV } from "~/utils/env";
import Container from "@mui/material/Container";
import { Category } from "@aaw/prisma";

const a = r.Artwork.fields;

const FormImageField = (p: { source: string }) => {
  const record = useRecordContext();
  if (!record) null;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={`${ENV.STORAGE_URL}/${record[p.source]}`} height="200px" />
    </Container>
  );
};

export const Form = (p: { type: "edit" | "create" }) => {
  const { save } = useSave({ type: "edit", model: r.Artwork.name });
  const { data: categories } = useGetList<Category>(r.Category.name);
  return (
    <TabbedForm
      noValidate
      mode="all"
      resolver={zodResolver(
        getResourceSchema({
          resource: "Artwork",
          method: p.type === "edit" ? "update" : "create",
        })
      )}
      onSubmit={save}
    >
      <TabbedForm.Tab label="Informations">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormImageField source={a.filename} />
          </Grid>
          <Grid item xs={6}>
            <TextInput source={a.name} label="Titre" fullWidth />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <TextInput source={a.description} multiline fullWidth />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DateInput source={a.madeAt} label="Créée le" fullWidth />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BooleanInput
              source={a.showInGallery}
              label="Afficher dans la galerie ?"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectArrayInput
              fullWidth
              source="categories"
              label="Catégories"
              choices={categories}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Image / Editeur"></TabbedForm.Tab>
      <TabbedForm.Tab label="Produits"></TabbedForm.Tab>
    </TabbedForm>
  );
};
