import { Button, Grid, ThemeProvider } from '@mui/material';
import React from 'react';
import FirstStep from '../../components/FirstStep';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import UploadStep from '../../components/UploadStep';
import { useInput } from '../../hooks/useInput';
import axios from '../../axios';
import { useRouter } from 'next/router';
import theme from '../../theme/theme';

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [picture, setPicture] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData();
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('text', text.value)
      picture &&
      formData.append('picture', picture)
      audio &&
      formData.append('audio', audio)
      axios.post('/tracks', formData)
        .then(res => router.push('/tracks'))
        .catch(err => console.error(err))
    }
  }

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 &&
            <FirstStep 
            name={name} 
            artist={artist} 
            text={text} 
            />   
          }
          {activeStep === 1 &&
            <UploadStep 
            title='Загрузите обложку' 
            accept='image/*' 
            setFile={setPicture} 
            />
          }
          {activeStep === 2 &&
            <UploadStep 
            title='Загрузите аудиофайл' 
            accept='audio/*' 
            setFile={setAudio} 
            />
          }
        </StepWrapper>
        <Grid container justifyContent='space-between'>
          <Button 
          onClick={back}
          disabled={activeStep === 0}
          >
            Назад
          </Button>
          <Button 
          onClick={next}
          >
            Далее
          </Button>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Create;