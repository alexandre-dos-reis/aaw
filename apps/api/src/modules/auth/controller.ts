import { FastifyHandler } from "~/utils/types";
import { LoginBody } from "./schema";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const loginHandler: FastifyHandler<{ Body: LoginBody }> = async (
  app,
  request,
  reply
) => {
  const { email, password } = request.body;

  const user = await app.prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return reply.code(400).send({
      message: "Invalid email or password !",
    });
  }

  if (!(await argon2.verify(user.password, password))) {
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

  return { token };
};
