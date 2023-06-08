import { validateEnv } from "@aaw/validation";
import { z } from "zod";

export const ENV = validateEnv({
  schema: z.object({
    API_URL: z.string().url(),
    STORAGE_URL: z.string().url(),
  }),
  data: {
    API_URL: import.meta.env.VITE_API_URL,
    STORAGE_URL: import.meta.env.VITE_STORAGE_URL,
  },
});
