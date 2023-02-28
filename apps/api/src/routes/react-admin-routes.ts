import { FastifyInstance } from "fastify";
import { defaultHandler } from "ra-data-simple-prisma";

export const reactAdminRoutes = async (app: FastifyInstance) => {
  app.post("/*", (req, reply) => {
    defaultHandler(
      { body: req.body as any },
      { json: (data) => reply.send(data) },
      app.prisma
    );
  });

  app.log.info("React-admin routes registered.");
};
