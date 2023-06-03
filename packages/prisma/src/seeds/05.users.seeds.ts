import { PrismaClient } from "../index";
import argon2 from "argon2";

export async function usersSeeds(prisma: PrismaClient) {
  const hashedPassword = await argon2.hash("1234");

  await prisma.user.createMany({
    data: [
      {
        name: "Alexandre Des Rois",
        email: "alex@gmail.com",
        password: hashedPassword,
      },
      {
        name: "Amelie Des Rois",
        email: "amelie@gmail.com",
        password: hashedPassword,
      },
    ],
  });
}
