import {
  BooleanField,
  ChipField,
  ChipFieldProps,
  Create,
  Datagrid,
  Edit,
  FunctionField,
  List,
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  ResourceProps,
  SingleFieldList,
  TextField,
  useRecordContext,
} from "react-admin";
import { resources as r } from "~/resources/resources.map";
import { Category, type Artwork } from "@aaw/prisma";

import { ThumbnailField } from "~/components/fields/ThumbnailField";

import chroma from "chroma-js";
import { Form } from "./Form";

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
      <Form type="create" />
    </Create>
  ),
  edit: () => (
    <Edit redirect={false} mutationMode="pessimistic">
      <Form type="edit" />
    </Edit>
  ),
};
