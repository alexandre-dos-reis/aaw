import Fastify, { FastifyRequest } from "fastify";
import { defaultHandler } from "ra-data-simple-prisma";
import { prismaClient } from "@aaw/prisma";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
});

app.post("/ra/*", (req, reply) => {
  defaultHandler(
    { body: req.body as any },
    { json: (data) => reply.send(data) },
    prismaClient
  );
});

(async () => {
  try {
    await app.listen({ port: 3002 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
