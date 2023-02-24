import { Prisma } from "@aaw/prisma/react";

export const resources = {
  Artwork: {
    name: Prisma.ModelName.Artwork,
    fields: Prisma.ArtworkScalarFieldEnum,
  },
  Category: {
    name: Prisma.ModelName.Category,
    fields: Prisma.CategoryScalarFieldEnum,
  },
  Product: {
    name: Prisma.ModelName.Product,
    fields: Prisma.ProductScalarFieldEnum,
  },
  ShopCategory: {
    name: Prisma.ModelName.ShopCategory,
    fields: Prisma.ShopCategoryScalarFieldEnum,
  },
  AdminVariable: {
    name: Prisma.ModelName.AdminVariable,
    fields: Prisma.AdminVariableScalarFieldEnum,
  },
  Address: {
    name: Prisma.ModelName.AdminVariable,
    fields: Prisma.AddressScalarFieldEnum,
  },
  Artwork_Category: {
    name: Prisma.ModelName.Artwork_Category,
    fields: Prisma.Artwork_CategoryScalarFieldEnum,
  },
  ProductImage: {
    name: Prisma.ModelName.ProductImage,
    fields: Prisma.ProductImageScalarFieldEnum,
  },
  Purchase: {
    name: Prisma.ModelName.Purchase,
    fields: Prisma.PurchaseScalarFieldEnum,
  },
  PurchaseItem: {
    name: Prisma.ModelName.PurchaseItem,
    fields: Prisma.PurchaseItemScalarFieldEnum,
  },
  ShippingCost: {
    name: Prisma.ModelName.ShippingCost,
    fields: Prisma.ShippingCostScalarFieldEnum,
  },
} satisfies Record<
  Prisma.ModelName,
  { name: string; fields: Record<string, Object> }
>;
