import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { observer } from "mobx-react";
import React from "react";
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";
import { useRouter } from "next/router";
import CreateAlbumForm from "../../components/create-album/CreateAlbumForm";
import AddTrackForm from "../../components/create-album/AddTrackForm";

const ButtonBack = styled(Button)`
  width: 150px;
`

const ButtonAddTrack = styled(Button)`
  max-width: 200px;
`

const Index: React.FC = () => {
  const router = useRouter();
  const [artistName, setArtistName] = React.useState('');
  const [pictureUrl, setPictureUrl] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const routeBack = () => {
    router.push('/albums')
  }

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Grid container direction="column" gap={5} >
          <ButtonBack
            variant="outlined"
            onClick={routeBack}
            startIcon={<ArrowBackIcon/>}
            >
              назад
            </ButtonBack>
          <Typography variant="h4">Загрузить альбом</Typography>
          <CreateAlbumForm 
          artistName={artistName} 
          setArtistName={setArtistName}
          pictureUrl={pictureUrl}
          setPictureUrl={setPictureUrl}
          />
          <AddTrackForm 
          isOpen={modalIsOpen} 
          onClose={() => setModalIsOpen(false)}
          artistName={artistName} 
          picture={pictureUrl}
          />
          <ButtonAddTrack
          variant="contained" 
          onClick={() => setModalIsOpen(true)} 
          >
            Добавить трек
          </ButtonAddTrack>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);