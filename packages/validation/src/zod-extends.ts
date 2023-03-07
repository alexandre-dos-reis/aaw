import { z } from "zod";
import { errorKeymap } from "./errors.keymap";

export const zOptionalDateString = z
  .string() 
  .nullish()
  .transform((str) => (str ? new Date(str) : null));

export const zDateString = z
  .string({
    invalid_type_error: errorKeymap["date.required"],
    required_error: errorKeymap["date.required"],
  })
  .transform((str) => new Date(str));

export const zStringRequired = z.string({
  invalid_type_error: errorKeymap["field.required"],
  required_error: errorKeymap["field.required"],
});
