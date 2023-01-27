import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Grid container>
          <Typography variant="h4">Альбомы</Typography>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Index;