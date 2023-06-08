import { ZodFormattedError, ZodTypeAny, z } from "zod";

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

export const validateEnv = <TSchema extends ZodTypeAny>(args: {
  schema: TSchema;
  data: unknown;
}) => {
  const _env = args.schema.safeParse(args.data);

  if (!_env.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_env.error.format())
    );
    throw new Error("Invalid environment variables");
  }

  return _env.data as z.infer<TSchema>;
};
