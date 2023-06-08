import { Grid } from "@mui/material";
import { SimpleForm, TextInput, DateInput, BooleanInput } from "react-admin";
import { WatchedSlugInput } from "~/components/inputs/WatchedSlugInput";
import { useSave } from "~/hooks/useSave";
import { getResourceSchema } from "@aaw/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resources as r } from "~/resources/resources.map";

const a = r.Artwork.fields;

export const Form = (p: { type: "edit" | "create" }) => {
  const { save } = useSave({ type: "edit", model: r.Artwork.name });
  return (
    <SimpleForm
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
      <Grid container spacing={2}>
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
    </SimpleForm>
  );
};
