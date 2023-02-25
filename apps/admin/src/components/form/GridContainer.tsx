import { Grid } from "@mui/material";
import { ReactNode } from "react";

export const GridContainer = (p: { children: ReactNode }) => (
  <Grid container spacing={2}>
    {p.children}
  </Grid>
);
