import { Heading } from "~/components/Heading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Heading>Galerie</Heading>
      {children}
    </>
  );
}
