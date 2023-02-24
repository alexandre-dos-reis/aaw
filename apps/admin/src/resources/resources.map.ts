import { Prisma } from "@aaw/prisma/react";

export const resources = {
  artwork: {
    name: Prisma.ModelName.Artwork,
    fields: Prisma.ArtworkScalarFieldEnum,
  },
  category: {
    name: Prisma.ModelName.Category,
    fields: Prisma.CategoryScalarFieldEnum,
  },
  product: {
    name: Prisma.ModelName.Product,
    fields: Prisma.ProductScalarFieldEnum,
  },
  shopCategory: {
    name: Prisma.ModelName.ShopCategory,
    fields: Prisma.ShopCategoryScalarFieldEnum,
  },
  adminVariable: {
    name: Prisma.ModelName.AdminVariable,
    fields: Prisma.AdminVariableScalarFieldEnum,
  },
} satisfies Record<string, { name: string; fields: Record<string, Object> }>;
