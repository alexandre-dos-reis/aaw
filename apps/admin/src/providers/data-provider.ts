import { Artwork_Category } from "@aaw/prisma";
import { dataProvider as prismaDataProvider } from "ra-data-simple-prisma";
import { Identifier, withLifecycleCallbacks } from "react-admin";
import { typedLocalStorage } from "~/utils/typed-local-storage";
import { resources } from "../resources/resources.map";
import { env } from "../utils/env";

const token = typedLocalStorage.get("auth")?.token;

export const dataProvider = withLifecycleCallbacks(
  prismaDataProvider(`${env.API_URL}/ra`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
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
