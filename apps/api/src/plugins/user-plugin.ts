import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  email: string;
  name: string;
  iat: number;
};

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

export const userPlugin: FastifyPluginAsync = fp(
  async (app: FastifyInstance) => {
    app.decorateRequest("user", null);
    app.addHook("onRequest", async (request) => {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return;
      }

      try {
        const token = authHeader.replace("Bearer ", "");
        const user = jwt.verify(token, "secret") as User;
        request.user = user;
      } catch (e) {}
    });
  }
);
