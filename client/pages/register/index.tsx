import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Box>
          Register
        </Box>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Index;