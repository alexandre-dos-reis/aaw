-- CreateEnum
CREATE TYPE "PURCHASE_STATUS" AS ENUM ('WAITING_FOR_PAYMENT', 'IN_PREPARATION', 'DELIVERING', 'DELIVERED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ADDRESS_TYPE" AS ENUM ('SINGLE', 'DELIVERY', 'BILLING');

-- CreateEnum
CREATE TYPE "VAR_KEY" AS ENUM ('CGV');

-- CreateTable
CREATE TABLE "Artwork" (
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

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork_Category" (
    "id" TEXT NOT NULL,
    "artwork_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Artwork_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "disposition" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "showInGallery" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopCategory" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "disposition" INTEGER NOT NULL,
    "parentCategoryId" TEXT,

    CONSTRAINT "ShopCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "showInGallery" BOOLEAN NOT NULL DEFAULT false,
    "filename" TEXT NOT NULL,
    "watermarkedFilename" TEXT,
    "designState" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "purchaseAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "status" "PURCHASE_STATUS" NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "weightCost" INTEGER NOT NULL,
    "insuranceCost" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "type" "ADDRESS_TYPE" NOT NULL,
    "fullname" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingCost" (
    "id" TEXT NOT NULL,
    "max" INTEGER NOT NULL,
    "weightCost" INTEGER NOT NULL,
    "insuranceCost" INTEGER NOT NULL,

    CONSTRAINT "ShippingCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminVariable" (
    "id" TEXT NOT NULL,
    "key" "VAR_KEY" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "AdminVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_Category_artwork_id_category_id_key" ON "Artwork_Category"("artwork_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Artwork_Category" ADD CONSTRAINT "Artwork_Category_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork_Category" ADD CONSTRAINT "Artwork_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopCategory" ADD CONSTRAINT "ShopCategory_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "ShopCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopCategoryId_fkey" FOREIGN KEY ("shopCategoryId") REFERENCES "ShopCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
