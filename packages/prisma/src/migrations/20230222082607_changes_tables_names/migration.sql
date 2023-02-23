/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artwork_Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingCost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "purchases_statuses" AS ENUM ('WAITING_FOR_PAYMENT', 'IN_PREPARATION', 'DELIVERING', 'DELIVERED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "address_types" AS ENUM ('SINGLE', 'DELIVERY', 'BILLING');

-- CreateEnum
CREATE TYPE "var_keys" AS ENUM ('CGV');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Artwork_Category" DROP CONSTRAINT "Artwork_Category_artwork_id_fkey";

-- DropForeignKey
ALTER TABLE "Artwork_Category" DROP CONSTRAINT "Artwork_Category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "ShopCategory" DROP CONSTRAINT "ShopCategory_parentCategoryId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "AdminVariable";

-- DropTable
DROP TABLE "Artwork";

-- DropTable
DROP TABLE "Artwork_Category";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "PurchaseItem";

-- DropTable
DROP TABLE "ShippingCost";

-- DropTable
DROP TABLE "ShopCategory";

-- DropEnum
DROP TYPE "ADDRESS_TYPE";

-- DropEnum
DROP TYPE "PURCHASE_STATUS";

-- DropEnum
DROP TYPE "VAR_KEY";

-- CreateTable
CREATE TABLE "artworks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "madeAt" TIMESTAMP(3),
    "showInGallery" BOOLEAN NOT NULL DEFAULT false,
    "showInPortfolio" BOOLEAN NOT NULL DEFAULT false,
    "filename" TEXT NOT NULL,
    "watermarkedFilename" TEXT,
    "designState" TEXT,

    CONSTRAINT "artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artworks_categories" (
    "artwork_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "artworks_categories_pkey" PRIMARY KEY ("artwork_id","category_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "disposition" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "showInGallery" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_categories" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "disposition" INTEGER NOT NULL,
    "parentCategoryId" TEXT,

    CONSTRAINT "shop_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" INTEGER,
    "width" INTEGER,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "forSale" BOOLEAN NOT NULL DEFAULT false,
    "artworkId" TEXT NOT NULL,
    "shopCategoryId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL,
    "showInGallery" BOOLEAN NOT NULL DEFAULT false,
    "filename" TEXT NOT NULL,
    "watermarkedFilename" TEXT,
    "designState" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "purchaseAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "status" "purchases_statuses" NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "weightCost" INTEGER NOT NULL,
    "insuranceCost" INTEGER NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "type" "address_types" NOT NULL,
    "fullname" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_cost" (
    "id" TEXT NOT NULL,
    "max" INTEGER NOT NULL,
    "weightCost" INTEGER NOT NULL,
    "insuranceCost" INTEGER NOT NULL,

    CONSTRAINT "shipping_cost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_variables" (
    "id" TEXT NOT NULL,
    "key" "var_keys" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "admin_variables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artworks_slug_key" ON "artworks"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- AddForeignKey
ALTER TABLE "artworks_categories" ADD CONSTRAINT "artworks_categories_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artworks_categories" ADD CONSTRAINT "artworks_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_categories" ADD CONSTRAINT "shop_categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "shop_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "artworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shopCategoryId_fkey" FOREIGN KEY ("shopCategoryId") REFERENCES "shop_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
