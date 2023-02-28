import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { PrismaClient, prismaClient } from "@aaw/prisma";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(
  async (app: FastifyInstance) => {
    await prismaClient.$connect();

    app.decorate("prisma", prismaClient);
    app.log.info("Prisma plugin registered.");

    app.addHook("onClose", async (app) => {
      await app.prisma.$disconnect();
    });
  }
);
