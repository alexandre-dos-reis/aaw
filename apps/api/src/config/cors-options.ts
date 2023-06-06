import { FastifyCorsOptions } from "@fastify/cors";
import { ENV } from "~/utils/env";

export const corsOptions: FastifyCorsOptions = {
  credentials: true,
  origin: ENV.ALLOW_ORIGIN_URL,
};
