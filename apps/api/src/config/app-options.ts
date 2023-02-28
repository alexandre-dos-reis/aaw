import { FastifyServerOptions } from "fastify";
import { Server } from "http";

export const appOptions: FastifyServerOptions<Server> = {
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        colorize: true,
        ignore: "reqId,remoteAddress,remotePort",
      },
    },
  },
};
