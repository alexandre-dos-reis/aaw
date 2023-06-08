import { z } from "zod";
import { ArtworkSchemas } from "./schemas";

import { Prisma } from "@aaw/prisma/browser";

const model = Prisma.ModelName;

export type ModelExtracted = "Artwork";
export type MethodExtracted = "create" | "update";
export type SingleResourceSchemaKeymap = Record<MethodExtracted, z.Schema>;

const resourcesSchemaKeymap = {
  [model.Artwork]: ArtworkSchemas,
};

export const getResourceSchema = (args: {
  resource: ModelExtracted;
  method: MethodExtracted;
}) => {
  return resourcesSchemaKeymap[args.resource][args.method];
};
