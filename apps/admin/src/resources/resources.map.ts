import { Prisma } from "@aaw/prisma/react";

const Models = Prisma;

export const resources = {
  artwork: {
    name: Models.ModelName.Artwork,
    fields: Models.ArtworkScalarFieldEnum,
  },
  category: {
    name: Models.ModelName.Category,
    fields: Models.CategoryScalarFieldEnum,
  },
  product: {
    name: Models.ModelName.Product,
    fields: Models.ProductScalarFieldEnum,
  },
  shopCategory: {
    name: Models.ModelName.ShopCategory,
    fields: Models.ShopCategoryScalarFieldEnum,
  },
  adminVariable: {
    name: Models.ModelName.AdminVariable,
    fields: Models.AdminVariableScalarFieldEnum,
  },
} satisfies Record<string, { name: string; fields: Record<string, Object> }>;
