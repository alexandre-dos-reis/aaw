import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@aaw/prisma";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(
  async (app: FastifyInstance) => {
    const prisma = new PrismaClient({ log: ["info", "query"] });
    await prisma.$connect();

    app.decorate("prisma", prisma);
    app.log.info("Prisma plugin registered.");

    app.addHook("onClose", async (app) => {
      await app.prisma.$disconnect();
    });
  }
);
