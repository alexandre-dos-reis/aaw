import { Prisma } from "@aaw/prisma/browser";
import { z } from "zod";
import { zOptionalDateString, zStringRequired } from "./zod-extends";

const { ArtworkScalarFieldEnum: Artwork } = Prisma;

export type ModelExtracted = "Artwork";
export type MethodExtracted = "create" | "update";

export const raZodResourceValidation = {
  Artwork: () => {
    const schema = z.object({
      [Artwork.name]: zStringRequired,
      [Artwork.slug]: zStringRequired,
      [Artwork.description]: zStringRequired,
      [Artwork.madeAt]: zOptionalDateString,
      [Artwork.showInGallery]: z.boolean(),
    });
    return {
      create: schema,
      update: schema.extend({
        [Artwork.id]: z.string().cuid2(),
      }),
    };
  },
} satisfies Record<ModelExtracted, () => Record<MethodExtracted, z.Schema>>;
