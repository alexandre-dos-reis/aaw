import {
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  FunctionField,
  List,
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  ResourceProps,
  SimpleForm,
  SimpleList,
  SingleFieldList,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { resources as r } from "../resources.map";
import { type Artwork } from "@aaw/prisma";
import { Grid } from "@mui/material";
import { GridContainer } from "../../components/form/GridContainer";
import { GridItem } from "../../components/form/GridItem";

const a = r.Artwork.fields;
const ac = r.Artwork_Category.fields;
const c = r.Category.fields;
const p = r.Product.fields;

const Test = () => {
  const record = useRecordContext();
  console.log(record);
  return <div>{record.id}</div>;
};

export const artworkResource: ResourceProps = {
  name: r.Artwork.name,
  recordRepresentation: (r: Artwork) => r.name,
  options: { label: "Oeuvres" },
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={a.filename} label="" />
        <TextField source={a.name} label="Titre" />
        <BooleanField source={a.showInGallery} label="Gallerie ?" />
        <FunctionField
          label="Filigrane ?"
          render={(r: Artwork) =>
            r.designState ? "X" : "O"
          }
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
        >
          <SingleFieldList linkType={false}>
            <ReferenceField reference={r.Category.name} source={ac.category_id}>
              <ChipField source={c.name} />
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
        <TextInput source={a.slug} disabled fullWidth />
      </Grid>
    </Grid>
    <TextInput source={a.description} multiline fullWidth />
    <GridContainer>
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
    </GridContainer>

    {/* <TextInput source={a.filename} />
    <TextInput source={a.watermarkedFilename} />
    <TextInput source={a.designState} /> */}
  </SimpleForm>
);
