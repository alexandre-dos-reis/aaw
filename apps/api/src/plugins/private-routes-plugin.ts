import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fp from "fastify-plugin";
import { ENV } from "~/utils/env";

declare module "fastify" {
  export interface FastifyInstance {
    privateRoute: any;
  }
}

export const privateRoutePlugin: FastifyPluginAsync = fp(
  async (app: FastifyInstance) => {
    app.decorate(
      "privateRoute",
      async (req: FastifyRequest, reply: FastifyReply) => {
        if (!req.user || req.cookies.SESSION_ID !== ENV.COOKIE_SESSION_ID) {
          return reply
            .code(403)
            .send({ message: "You can't access this resource !" });
        }
      }
    );
  }
);
