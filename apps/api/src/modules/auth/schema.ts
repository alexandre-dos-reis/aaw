import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginBody = z.infer<typeof loginSchema>;

export const loginJsonSchema = {
  body: zodToJsonSchema(loginSchema, "loginSchema"),
};
