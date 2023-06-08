import { ZodTypeAny } from "zod";
import { ArtworkSchemas } from "./schemas";

export type ModelExtracted = "Artwork";
export type MethodExtracted = "create" | "update";
export type SingleResourceSchemaKeymap = Record<MethodExtracted, ZodTypeAny>;

const resourcesSchemaKeymap: Record<
  ModelExtracted,
  SingleResourceSchemaKeymap
> = {
  Artwork: ArtworkSchemas,
};

export const getResourceSchema = (args: {
  resource: ModelExtracted;
  method: MethodExtracted;
}) => {
  return resourcesSchemaKeymap[args.resource][args.method];
};
