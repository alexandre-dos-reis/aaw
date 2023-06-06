import { FastifyInstance } from "fastify";
import { LoginBody, loginJsonSchema } from "./schema";

import argon2 from "argon2";
import { jwtEncode } from "~/utils/jwt";

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

      reply.setCookie("session_id", "my-cookie-value").send({ token });
    }
  );

  app.log.info("Auth routes registered.");
};
