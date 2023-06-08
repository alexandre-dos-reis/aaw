import { z } from "zod";
import { validateEnv } from "@aaw/validation";

export const ENV = validateEnv({
  schema: z.object({
    CORS_ORIGIN_URL: z.string().url(),
    COOKIE_DOMAIN: z.string().min(1),
    COOKIE_SECRET: z.string().min(1),
    COOKIE_SESSION_ID: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  }),
  data: process.env,
});
