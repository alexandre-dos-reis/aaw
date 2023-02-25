import { ComponentProps } from "react";
import { Layout as RaLayout } from "react-admin";
import { Menu } from "./Menu";

export const Layout = (props: ComponentProps<typeof RaLayout>) => (
  <RaLayout {...props} menu={Menu} />
);
