import { z } from "zod";
import { validateEnv } from "@aaw/validation";

export const ENV = validateEnv({
  schema: z.object({
    STORAGE_URL: z.string().url(),
  }),
  data: process.env,
});
