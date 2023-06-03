import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type H1 = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

interface Props extends H1 {}

export const Heading = (p: Props) => {
  return <h1 className="text-2xl" {...p} />;
};
