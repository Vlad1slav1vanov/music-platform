import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { observer } from "mobx-react";
import React from "react";
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";
import { useRouter } from "next/router";
import CreateAlbumForm from "../../components/create-album/CreateAlbumForm";

const ButtonBack = styled(Button)`
  width: 150px;
  margin-bottom: 30px;
`

const Index: React.FC = () => {
  const router = useRouter();

  const routeBack = () => {
    router.push('/albums')
  }

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Grid container direction="column">
          <ButtonBack
            variant="outlined"
            onClick={routeBack}
            startIcon={<ArrowBackIcon/>}
            >
              назад
            </ButtonBack>
          <Typography 
          marginBottom='30px' 
          variant="h4"
          >
            Загрузить альбом
          </Typography>
          <CreateAlbumForm />         
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);