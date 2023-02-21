import { PrismaClient } from '../client';
import { gallerySeeds, shopSeeds, settingsSeed, purchasesSeed } from '.';

const prisma = new PrismaClient();

async function main() {
  await gallerySeeds(prisma);
  await shopSeeds(prisma);
  await settingsSeed(prisma);
  await purchasesSeed(prisma);
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
