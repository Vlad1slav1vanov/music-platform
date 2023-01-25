import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
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
            <TextField label='Название альбома' fullWidth required />
            <TextField label='Автор альбома' fullWidth required />
            <Box sx={{display: 'flex', gap: '30px', justifyContent: 'space-between'}} >
              <Button variant="contained" sx={{width: '200px'}}>Загрузить обложку</Button>
              <Typography border='1px solid #5824f3' sx={{width: '500px', padding: '5px', borderRadius: '5px'}} fontSize='20px'>ads;v;mavanav;k</Typography>
              <Button variant="outlined" color="error">Удалить</Button>
            </Box>
          </Box>
        </Box>
        <TrackList tracks={tracks} />
        <Box>
          <Accordion sx={{border: '1px solid grey'}} >
            <AccordionSummary expandIcon={<AddBoxIcon fontSize='large' color="primary" />} >
              <Typography variant="h6" >Добавить трек</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px'}} >
                <TextField label='Название трека' required />
                <Box sx={{display: 'flex', gap: '30px', justifyContent: 'space-between'}} >
                  <Button sx={{width: '300px'}} variant="outlined" >Загрузите аудиофайл</Button>
                  <Typography border='1px solid #5824f3' sx={{width: '500px', padding: '5px', borderRadius: '5px'}} fontSize='20px'>ads;v;mavanav;k</Typography>
                  <Button variant="outlined" color="error">Удалить</Button>
                </Box>
                <TextField label='Текст песни' multiline />
              </Box>
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', gap: '30px'}} >
                <Button variant="contained">Добавить</Button>
                <Button variant="outlined" >Сброс</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '60px'}} >
            <Button variant="contained" size="large" >Загрузить альбом</Button>
            <Button variant="outlined" size="large" >Сброс</Button>
          </Box>
        </Box>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);