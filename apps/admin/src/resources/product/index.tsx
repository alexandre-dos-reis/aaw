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

export const productResource: ResourceProps = {
  name: resources.product,
  options: { label: "Produits" },
  recordRepresentation: (r) => r.name,
  list: () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <DateField source="updatedAt" />
        <NumberField source="stock" />
        <NumberField source="price" />
        <BooleanField source="forSale" />
        <ReferenceField source="artworkId" reference={resources.artwork} />
        <ReferenceField
          source="shopCategoryId"
          reference={resources.shopCategory}
        />
      </Datagrid>
    </List>
  ),
  edit: () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" />
        <DateInput source="createdAt" />
        <DateInput source="updatedAt" />
        <TextInput source="name" />
        <TextInput source="slug" />
        <TextInput source="description" />
        <NumberInput source="height" />
        <NumberInput source="width" />
        <NumberInput source="stock" />
        <NumberInput source="price" />
        <BooleanInput source="forSale" />
        <ReferenceInput source="artworkId" reference={resources.artwork} />
        <ReferenceInput
          source="shopCategoryId"
          reference={resources.shopCategory}
        />
      </SimpleForm>
    </Edit>
  ),
};
