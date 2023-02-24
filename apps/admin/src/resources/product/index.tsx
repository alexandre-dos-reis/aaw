import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { resources as r } from "../resources.map";

const p = r.Product.fields;
const a = r.Artwork.fields;
const sc = r.ShopCategory.fields;

export const productResource: ResourceProps = {
  name: r.Product.name,
  options: { label: "Produits" },
  recordRepresentation: (r) => r.name,
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
          source={p.shopCategoryId}
          reference={r.ShopCategory.name}
        />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source={p.name} />
        <TextInput source={p.slug} disabled />
        <TextInput source={p.description} />
        <NumberInput source={p.height} />
        <NumberInput source={p.width} />
        <NumberInput source={p.stock} />
        <NumberInput source={p.price} />
        <BooleanInput source={p.forSale} />
        <ReferenceInput source={p.artworkId} reference={r.Artwork.name} />
        <ReferenceInput
          source={p.shopCategoryId}
          reference={r.ShopCategory.name}
        />
      </SimpleForm>
    </Edit>
  ),
};
