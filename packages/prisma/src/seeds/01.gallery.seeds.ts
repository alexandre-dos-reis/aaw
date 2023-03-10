import { faker } from "@faker-js/faker";
import slugify from "slugify";
import { PrismaClient } from "../index";
import { minio } from "@aaw/minio";

export async function gallerySeeds(prisma: PrismaClient) {
  const catsName = [
    "Calligraphies",
    "Enluminures",
    "Marques-pages",
    "Evènements",
    "Autres techniques",
  ];

  await prisma.category.createMany({
    data: catsName.map((c, i) => ({
      name: c,
      disposition: i + 1,
      slug: slugify(c + " " + faker.random.word(), { lower: true }),
      color: faker.color.rgb(),
      description: faker.random.words(20),
      showInGallery: true,
    })),
  });

  const objects = await minio.listObjectsAsync(
    process.env.MINIO_IMAGES_BUCKET_NAME as string
  );

  for (let i = 0; i < 50; i++) {
    const name = faker.random.words();

    await prisma.artwork.create({
      data: {
        filename: faker.helpers.arrayElement(objects),
        name,
        slug:
          slugify(name + " " + faker.random.word(), { lower: true }) +
          new Date().getDay(),
        description: faker.random.words(20),
        showInGallery: faker.helpers.arrayElement([true, false]),
        madeAt: faker.helpers.maybe(() => faker.date.past(10)),
      },
    });
  }

  const artworks = await prisma.artwork.findMany();

  artworks.map(async (a) => {
    const categoriesId = (
      await prisma.category.findMany({
        select: {
          id: true,
        },
      })
    ).map((c) => c.id);

    await prisma.artwork_Category.createMany({
      data: faker.helpers.arrayElements(categoriesId).map((c) => ({
        artwork_id: a.id,
        category_id: c,
      })),
    });
  });
}
