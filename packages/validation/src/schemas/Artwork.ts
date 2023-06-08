import { SingleResourceSchemaKeymap } from "../zod-validation-map";
import { Prisma } from "@aaw/prisma/browser";
import { z } from "zod";
import { zOptionalDateString, zStringRequired } from "../zod-extends";

const a = Prisma.ArtworkScalarFieldEnum;

const common = z.object({
  [a.name]: zStringRequired,
  [a.slug]: zStringRequired,
  [a.description]: zStringRequired,
  [a.madeAt]: zOptionalDateString,
  [a.showInGallery]: z.boolean(),
});

export const ArtworkSchemas: SingleResourceSchemaKeymap = {
  create: common,
  update: common.extend({
    [a.id]: z.string().cuid2(),
  }),
};
