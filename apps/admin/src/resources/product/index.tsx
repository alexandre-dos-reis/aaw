import { Product, ShopCategory, Artwork } from "@aaw/prisma";
import { Grid } from "@mui/material";
import {
  AutocompleteInput,
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
  required,
  ResourceProps,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useGetList,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { ParentCategoryField } from "~/components/domain/ParentCategoryField";
import { PriceField } from "~/components/fields/PriceField";
import { PriceInput } from "~/components/inputs/PriceInput";
import { WatchedSlugInput } from "~/components/inputs/WatchedSlugInput";
import { resources as r } from "~/resources/resources.map";
import { ENV } from "~/utils/env";

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

const Form = () => {
  const { data: shopCategories, isLoading } = useGetList(r.ShopCategory.name, {
    filter: {
      [sc.parentCategoryId]: {
        not: null,
      },
    },
  });

  if (isLoading) return null;

  return (
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput source={p.name} fullWidth label="Titre" />
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
            <AutocompleteInput
              fullWidth
              label="Oeuvre associée"
              optionText={<ArtworkFieldAssociated />}
              inputText={(a: Artwork) => a.name}
              filterToQuery={(q: string) => ({ name: `%${q}%` })}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={4}>
          <ReferenceInput
            source={p.shopCategoryId}
            reference={r.ShopCategory.name}
            label="Catégorie"
          >
            <SelectInput
              label="Catégorie associée"
              fullWidth
              source={p.shopCategoryId}
              optionText={<ParentCategoryField />}
              choices={shopCategories}
              validate={required()}
            />
          </ReferenceInput>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

const ArtworkFieldAssociated = () => {
  const artwork = useRecordContext<Artwork>();
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <img
        src={`${ENV.STORAGE_URL}/${artwork.filename}`}
        width="60px"
        height="60px"
        style={{ objectFit: "contain" }}
      />
      <div>{artwork.name}</div>
    </div>
  );
};
