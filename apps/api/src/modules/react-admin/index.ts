import { FastifyInstance } from "fastify";
import { defaultHandler } from "ra-data-simple-prisma";
import {
  getResourceSchema,
  ModelExtracted,
  MethodExtracted,
} from "@aaw/validation";

export type RaRequest = {
  Body: {
    method: MethodExtracted;
    resource: ModelExtracted;
    params: {
      id?: string;
      data: unknown;
    };
  };
};

export const reactAdminModule = async (app: FastifyInstance) => {
  app.post<RaRequest>(
    "/*",
    {
      preHandler: [app.privateRoute],
    },
    (req, reply) => {
      if (
        req.body.method.startsWith("create") ||
        req.body.method.startsWith("update")
      ) {
        if (req.body.resource === "Artwork") {
          const schema = getResourceSchema({
            method: req.body.method,
            resource: req.body.resource,
          });

          const result = schema.safeParse(req.body.params.data);

          if (!result.success) {
            return reply.code(400).send({
              errors: result.error.flatten().fieldErrors,
            });
          }

          req.body.params.data = result.data;
        }
      }

      defaultHandler(
        { body: req.body as any },
        { json: (data) => reply.send(data) },
        app.prisma
      );
    }
  );

  app.log.info("React-admin routes registered.");
};
