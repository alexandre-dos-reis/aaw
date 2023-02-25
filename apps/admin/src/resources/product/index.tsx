import { Product, ShopCategory } from "@aaw/prisma";
import { Grid } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { resources as r } from "../resources.map";

const p = r.Product.fields;
const a = r.Artwork.fields;
const sc = r.ShopCategory.fields;

const CategoryField = () => {
  const record = useRecordContext<ShopCategory>();

  const parentRecord = useGetOne<ShopCategory>(
    r.ShopCategory.name,
    {
      id: record.parentCategoryId || "",
    },
    {
      enabled: !!record.parentCategoryId,
    }
  );

  const name = record.parentCategoryId
    ? `${parentRecord.data?.name} ${record.name}`
    : `${record.name}`;

  return <div>{name}</div>;
};

export const productResource: ResourceProps = {
  name: r.Product.name,
  options: { label: "Produits" },
  recordRepresentation: (r: Product) => r.name,
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={p.name} />
        <DateField source={p.updatedAt} />
        <NumberField source={p.stock} />
        <NumberField source={p.price} />
        <BooleanField source={p.forSale} />
        <ReferenceField source={p.artworkId} reference={r.Artwork.name} />
        <ReferenceField
          label="Catégorie"
          source={p.shopCategoryId}
          reference={r.ShopCategory.name}
        >
          <CategoryField />
        </ReferenceField>
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <Form />
    </Edit>
  ),
  create: () => (
    <Create>
      <Form />
    </Create>
  ),
};

const Form = () => (
  <SimpleForm>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextInput source={p.name} fullWidth label="Titre" />
      </Grid>
      <Grid item xs={6}>
        <TextInput source={p.slug} disabled fullWidth />
      </Grid>
    </Grid>
    <TextInput source={p.description} fullWidth multiline />
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <NumberInput source={p.height} fullWidth label="Hauteur en mm" />
      </Grid>
      <Grid item xs={3}>
        <NumberInput source={p.width} fullWidth label="Largeur en mm" />
      </Grid>
      <Grid item xs={3}>
        <NumberInput source={p.stock} fullWidth />
      </Grid>
      <Grid item xs={3}>
        <NumberInput source={p.price} fullWidth label="Prix €" />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BooleanInput source={p.forSale} label="En vente ?" />
      </Grid>
      <Grid item xs={4}>
        <ReferenceInput
          source={p.artworkId}
          reference={r.Artwork.name}
        >
          <SelectInput label="Oeuvre associée" fullWidth />
        </ReferenceInput>
      </Grid>
      <Grid item xs={4}>
        <ReferenceInput
          source={p.shopCategoryId}
          reference={r.ShopCategory.name}
          label="Catégorie"
        >
          <SelectInput label="Catégorie associée" fullWidth />
        </ReferenceInput>
      </Grid>
    </Grid>
  </SimpleForm>
);
