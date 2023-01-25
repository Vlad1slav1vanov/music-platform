import { Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";
import { useRouter } from "next/router";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Image from "next/image";
import TrackList from "../../components/TrackList";

const Index: React.FC = () => {
  const router = useRouter();
  const [tracks, setTracks] = React.useState([]);

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Typography sx={{marginBottom: '30px'}} variant="h4">Загрузить альбом</Typography>
        <Box sx={{display: 'flex', gap: '30px', marginBottom: '40px'}}>
          <Image src='' width={200} height={200} alt='' />
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: '23px'}} >
            <TextField label='Название альбома' fullWidth />
            <TextField label='Автор альбома' fullWidth/>
            <Box sx={{display: 'flex', gap: '30px', justifyContent: 'space-between'}} >
              <Button variant="contained" sx={{width: '200px'}}>Загрузить обложку</Button>
              <Typography border='1px solid #5824f3' sx={{width: '500px', padding: '5px', borderRadius: '5px'}} fontSize='20px'>ads;v;mavanav;k</Typography>
              <Button variant="outlined" color="error">Удалить</Button>
            </Box>
          </Box>
        </Box>
        <TrackList tracks={tracks} />
        <Box>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '30px'}} >
          <Button variant="outlined" endIcon={<AddBoxIcon />}>Добавить трек</Button>
            <TextField label='Название трека' />
            <Box sx={{display: 'flex', gap: '30px', justifyContent: 'space-between'}} >
              <Button sx={{width: '300px'}} variant="outlined" >Загрузите аудиофайл</Button>
              <Typography border='1px solid #5824f3' sx={{width: '500px', padding: '5px', borderRadius: '5px'}} fontSize='20px'>ads;v;mavanav;k</Typography>
              <Button variant="outlined" color="error">Удалить</Button>
            </Box>
          </Box>
        </Box>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);