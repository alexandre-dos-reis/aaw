import "./globals.css";
import { Inter } from "next/font/google";
import { prismaClient } from "@aaw/prisma";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cats = await prismaClient.category.findMany({
    where: {
      showInGallery: true,
    },
    orderBy: {
      disposition: "asc",
    },
  });
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header>
          <ul>
            {cats.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </header>

        {children}
      </body>
    </html>
  );
}