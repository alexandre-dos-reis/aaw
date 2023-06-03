import { prismaClient } from "@aaw/prisma";
import { notFound } from "next/navigation";
import { ENV } from "~/utils/env";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.category,
    },
  });

  if (!category) {
    notFound();
  }

  const artworks = await prismaClient.artwork.findMany({
    where: {
      showInGallery: true,
      Artwork_Categories: {
        some: {
          category_id: category?.id,
        },
      },
    },
  });

  return (
    <div>
      <ul className="ml-10">
        {artworks.map((a) => (
          <li>
            <img src={`${ENV.STORAGE_URL}/${a.filename}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
