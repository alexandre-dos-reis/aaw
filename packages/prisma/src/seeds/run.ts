import { PrismaClient } from "../index";

import {
  gallerySeeds,
  shopSeeds,
  settingsSeed,
  purchasesSeed,
  imagesSeeds,
  usersSeeds,
} from ".";

const prisma = new PrismaClient();

async function main() {
  await imagesSeeds();
  await gallerySeeds(prisma);
  await shopSeeds(prisma);
  await settingsSeed(prisma);
  await purchasesSeed(prisma);
  await usersSeeds(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
