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
import { PriceField } from "~/components/fields/PriceField";
import { PriceInput } from "~/components/inputs/PriceInput";
import { WatchedSlugInput } from "~/components/inputs/WatchedSlugInput";
import { resources as r } from "~/resources/resources.map";

const p = r.Product.fields;
const a = r.Artwork.fields;
const sc = r.ShopCategory.fields;

const CategoryField = () => {
  const record = useRecordContext<ShopCategory>();

  const { data: parentRecord, isLoading } = useGetOne<ShopCategory>(
    r.ShopCategory.name,
    {
      id: record.parentCategoryId || "",
    },
    {
      enabled: !!record.parentCategoryId,
    }
  );

  if (isLoading) return null;

  const name = record.parentCategoryId
    ? `${parentRecord?.name} ${record.name}`
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
        <TextField source={p.name} label="Nom" />
        <DateField source={p.updatedAt} label="Modifié le" />
        <NumberField source={p.stock} />
        <PriceField source={p.price} label="Prix €" />
        <BooleanField source={p.forSale} label="En vente ?" />
        <ReferenceField
          source={p.artworkId}
          reference={r.Artwork.name}
          label="Oeuvre"
        />
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
        <WatchedSlugInput
          sourceToWatch={a.name}
          source={a.slug}
          label="Slug"
          disabled
          fullWidth
        />
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
        <PriceInput source={p.price} fullWidth label="Prix €" />
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
        <ReferenceInput source={p.artworkId} reference={r.Artwork.name}>
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

const ShopCategoryInput = () => {
  return <div></div>;
};
