import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient({ log: ["info", 'query'] });

if (process.env.NODE_ENV !== "production") global.prisma = prismaClient;

export * from "@prisma/client";
export { prismaClient };
