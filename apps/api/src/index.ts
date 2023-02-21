import Fastify from "fastify";
import { defaultHandler } from "ra-data-simple-prisma";
import { PrismaClient } from "@aaw/prisma";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
});

declare type Send<T> = (body: T) => void;

export type Response<T extends { data: any } = any> = {
  json: Send<T>;
};

const prisma = new PrismaClient();

app.get("/ra/*", async (req, reply) => {
  const res: Response = {
    json: (obj: any) => {
      reply.send(obj);
    },
  };

  await defaultHandler({ body: req.body as any }, res, prisma);
});

app.post("/ra/*", async (req, reply) => {
  const res: Response = {
    json: (obj: any) => {
      reply.send(obj);
    },
  };
  await defaultHandler({ body: req.body as any }, res, prisma);
});

(async () => {
  try {
    await app.listen({ port: 3002 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
