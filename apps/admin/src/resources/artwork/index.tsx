import {
  BooleanField,
  BooleanInput,
  ChipField,
  ChipFieldProps,
  Create,
  Datagrid,
  DateInput,
  Edit,
  FunctionField,
  List,
  RaRecord,
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  ResourceProps,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { resources as r } from "~/resources/resources.map";
import { Category, type Artwork } from "@aaw/prisma";
import { Grid } from "@mui/material";
import { ThumbnailField } from "~/components/fields/ThumbnailField";
import { WatchedSlugInput } from "~/components/inputs/WatchedSlugInput";
import chroma from "chroma-js";

const a = r.Artwork.fields;
const ac = r.Artwork_Category.fields;
const c = r.Category.fields;
const p = r.Product.fields;

const CategoryChipField = ({
  sourceColor,
  ...p
}: ChipFieldProps & { sourceColor: string }) => {
  const record = useRecordContext<Category>();
  const color = chroma(record.color);
  const dark = color.darken(2).hex();
  return (
    <ChipField
      {...p}
      style={{
        backgroundColor: color.brighten(2).alpha(0.6).hex(),
        border: `1px solid ${dark}`,
        color: dark,
      }}
    />
  );
};

export const artworkResource: ResourceProps = {
  name: r.Artwork.name,
  recordRepresentation: (r: Artwork) => r.name,
  options: { label: "Oeuvres" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <ThumbnailField source={a.filename} label="" />
        <TextField source={a.name} label="Titre" />
        <BooleanField source={a.showInGallery} label="Gallerie ?" />
        <FunctionField
          label="Filigrane ?"
          render={(r: Artwork) => (r.designState ? "X" : "O")}
        />
        <ReferenceManyCount
          label="# produits"
          reference={r.Product.name}
          target={p.artworkId}
          resource={r.Artwork.name}
          link
        />
        <ReferenceManyField
          reference={r.Artwork_Category.name}
          target={ac.artwork_id}
          label="Catégories"
          sort={{ field: ac.artwork_id, order: "asc" }}
        >
          <SingleFieldList linkType={false}>
            <ReferenceField reference={r.Category.name} source={ac.category_id}>
              <CategoryChipField source={c.name} sourceColor={c.color} />
            </ReferenceField>
          </SingleFieldList>
        </ReferenceManyField>
      </Datagrid>
    </List>
  ),
  create: () => (
    <Create>
      <Form />
    </Create>
  ),
  edit: () => (
    <Edit>
      <Form />
    </Edit>
  ),
};

const Form = () => (
  <SimpleForm>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextInput source={a.name} label="Titre" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <WatchedSlugInput
          sourceToWatch={a.name}
          source={a.slug}
          label="Slug"
          disabled
          fullWidth
        />
      </Grid>
    </Grid>
    <TextInput source={a.description} multiline fullWidth />
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <DateInput source={a.madeAt} label="Créée le" fullWidth />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BooleanInput
          source={a.showInGallery}
          label="Afficher dans la galerie ?"
        />
      </Grid>
    </Grid>

    {/* <TextInput source={a.filename} />
    <TextInput source={a.watermarkedFilename} />
    <TextInput source={a.designState} /> */}
  </SimpleForm>
);
