import { FastifyInstance } from "fastify";
import { LoginBody, loginJsonSchema } from "./schema";

import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const authModule = async (app: FastifyInstance) => {
  app.post<{ Body: LoginBody }>(
    "/login",
    {
      schema: loginJsonSchema,
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await app.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user || !(await argon2.verify(user.password, password))) {
        return reply.code(400).send({
          message: "Invalid email or password !",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email,
          name: user.name,
        },
        "secret"
      );

      reply
        .setCookie("session_id", "my-cookie-value", {
          domain: "localhost:3002",
          sameSite: "none",
          maxAge: 31536000,
          path: "/",
          httpOnly: true,
          secure: false,
        })
        .send({ token });
    }
  );

  app.log.info("Auth routes registered.");
};
