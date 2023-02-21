import { faker } from "@faker-js/faker";
import slugify from "slugify";
import { PrismaClient } from '../client';

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
      slug: slugify(c, { lower: true }),
      description: faker.random.words(20),
      showInGallery: true,
    })),
  });

  const categories = await prisma.category.findMany();

  for (let i = 0; i < 50; i++) {
    const name = faker.random.words();

    await prisma.artwork.create({
      data: {
        filename: "Manet.jpg",
        name,
        slug:
          slugify(name + " " + faker.random.word(), { lower: true }) +
          new Date().getDay(),
        description: faker.random.words(20),
        showInGallery: faker.helpers.arrayElement([true, false]),
        // Artwork_Categories: {
        //   createMany: {
        //     data: {
        //       category_id: faker.helpers.arrayElement(
        //         categories.map((c) => {
        //           return c.id;
        //         })
        //       ),
        //     },
        //   },
        // },
      },
    });
  }

  const artworks = await prisma.artwork.findMany();

  artworks.map(async (a) => {
    categories.map(async (c) => {
      faker.helpers.maybe(async () => {
        await prisma.artwork_Category.create({
          data: {
            artwork_id: a.id,
            category_id: c.id,
          },
        });
      });
    });
  });
}
