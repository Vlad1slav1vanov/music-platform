import { Box, Button, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useInput } from '../../hooks/useInput';
import axios from '../../axios';
import { useRouter } from 'next/router';
import theme from '../../theme/theme';
import styled from 'styled-components';

const StyledForm = styled(Box)`
  display: flex;
  width: 100%;
  margin: 0 auto;
  gap: 30px;
  align-items: flex-start;
  justify-content: space-between;
`

const Img = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
`

const Create = () => {
  const router = useRouter();

  // const next = () => {
  //   if (activeStep !== 2) {
  //     setActiveStep(prev => prev + 1)
  //   } else {
  //     const formData = new FormData();
  //     formData.append('name', name.value)
  //     formData.append('artist', artist.value)
  //     formData.append('text', text.value)
  //     picture &&
  //     formData.append('picture', picture)
  //     audio &&
  //     formData.append('audio', audio)
  //     axios.post('/tracks', formData)
  //       .then(res => router.push('/tracks'))
  //       .catch(err => console.error(err))
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Typography variant='h4' marginBottom={3}>Загрузить трек</Typography>
        <StyledForm>
          <Img width={200} height={200} />
          <Grid container direction="column" sx={{gap: '15px'}} >
            <TextField label="Название" required />
            <TextField label="Исполнитель" required />
            <TextField label="Текст" multiline />
          </Grid>
        </StyledForm>
        <Box sx={{margin: '15px 0', display: 'flex', gap: '30px'}} >
          <input type="file" hidden accept='image/*' />
          <Button variant='contained'>
            загрузить обложку
          </Button>
          <Button variant='outlined' color='error'>Удалить</Button>       
        </Box>
        <Box sx={{marginBottom: '15px', display: 'flex', gap: '54px'}}>
          <input type="file" hidden accept='audio/*' />
          <Button variant="contained" >загрузить аудио</Button>
          <Button variant='outlined' color='error' hidden >Удалить</Button>
        </Box>
        <Box 
        sx={{
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginTop: '15px'
        }}>
          <Button variant='contained'>Загрузить</Button>
          <Button variant='outlined'>Сброс</Button>
        </Box>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Create;