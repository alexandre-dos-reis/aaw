import { prismaClient } from "@aaw/prisma";
import { ENV } from "~/utils/env";

export default async function Home() {
  const artworks = await prismaClient.artwork.findMany({
    where: {
      showInGallery: true,
    },
  });

  return (
    <main>
      <ul className="ml-10">
        {artworks.map((a) => (
          <li>
            <img src={`${ENV.STORAGE_URL}/${a.filename}`} />
          </li>
        ))}
      </ul>
    </main>
  );
}
