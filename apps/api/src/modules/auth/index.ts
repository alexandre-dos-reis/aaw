import { FastifyInstance } from "fastify";
import { LoginBody, loginJsonSchema } from "./schema";

import argon2 from "argon2";
import { jwtEncode } from "~/utils/jwt";
import { ENV } from "~/utils/env";

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

      const token = jwtEncode({
        id: user.id,
        email,
        name: user.name,
      });

      return reply
        .setCookie("SESSION_ID", ENV.COOKIE_SESSION_ID)
        .send({ token });
    }
  );

  app.post("/logout", async (_, reply) => {
    return reply
      .clearCookie("SESSION_ID")
      .send({ message: "You have been sucessfully logged out !" });
  });

  app.log.info("Auth routes registered.");
};
