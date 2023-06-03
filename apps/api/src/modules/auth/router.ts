import { FastifyInstance } from "fastify";
import { loginJsonSchema } from "./schema";
import { loginHandler } from "./controller";

export const authRouter = async (app: FastifyInstance) => {
  app.post(
    "/login",
    {
      schema: loginJsonSchema,
    },
    (request, reply) => loginHandler(app, request, reply)
  );
};
