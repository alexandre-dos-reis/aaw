import { Grid } from "@mui/material";
import { ReactNode } from "react";

export const GridItem = (p: { children: ReactNode }) => (
  <Grid item xs={6}>
    {p.children}
  </Grid>
);
