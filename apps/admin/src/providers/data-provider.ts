import { Artwork_Category } from "@aaw/prisma";
import { dataProvider as prismaDataProvider } from "ra-data-simple-prisma";
import { Identifier, withLifecycleCallbacks } from "react-admin";
import { resources } from "../resources/resources.map";

export const dataProvider = withLifecycleCallbacks(
  prismaDataProvider("http://localhost:3002/ra"),
  [
    {
      // Because Artwork_Category doesn't have an Id
      resource: resources.Artwork_Category.name,
      afterRead: async (record: Artwork_Category & { id: Identifier }) => {
        record.id = `${record.artwork_id}${record.category_id}`;
        return record;
      },
    },
  ]
);
