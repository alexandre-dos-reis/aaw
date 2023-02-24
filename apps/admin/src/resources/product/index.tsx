import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
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
import { resources } from "../resources.map";

const p = resources.product.fields;
const a = resources.artwork.fields;
const sc = resources.shopCategory.fields;

export const productResource: ResourceProps = {
  name: resources.product.name,
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
        <ReferenceField
          source={p.artworkId}
          reference={resources.artwork.name}
        />
        <ReferenceField
          source={p.shopCategoryId}
          reference={resources.shopCategory.name}
        />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source={p.name} />
        <TextInput source={p.slug} />
        <TextInput source={p.description} />
        <NumberInput source={p.height} />
        <NumberInput source={p.width} />
        <NumberInput source={p.stock} />
        <NumberInput source={p.price} />
        <BooleanInput source={p.forSale} />
        <ReferenceInput
          source={p.artworkId}
          reference={resources.artwork.name}
        />
        <ReferenceInput
          source={p.shopCategoryId}
          reference={resources.shopCategory.name}
        />
      </SimpleForm>
    </Edit>
  ),
};
