import { Box, Button, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import axios from '../../axios';
import { useRouter } from 'next/router';
import theme from '../../theme/theme';
import styled from 'styled-components';
import {userStore} from '../../store/UserStore';

const StyledForm = styled(Box)`
  display: flex;
  width: 100%;
  margin: 0 auto;
  gap: 40px;
  align-items: flex-start;
  justify-content: space-between;
`

const DeleteWrapper = styled.div`
  display: flex; 
  gap: 20px;
  align-items: center; 
  justify-content: flex-start;
`

const PictureFileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; 
  gap: 20px; 
  margin-top: 100px;
`

const AudioFileWrapper = styled.div`
  margin-bottom: 15px; 
  display: flex; 
  gap: 54px;
`

const LoadButtonsWrapper = styled.div`
  width: 100%;
  display: flex; 
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
`

const Img = styled.img`
  display: block;
  object-fit: cover;
  width: 250px;
  height: 250px;
`

const TRACK_FORM = {
  name: '',
  artist: '',
  text: '',
  picture: null as File | null,
  audio: null as File | null,
}

const Create = () => {
  const router = useRouter();
  const [form, setForm] = React.useState(TRACK_FORM);
  const [pictureUrl, setPictureUrl] = React.useState('');
  const [audioName, setAudioName] = React.useState('');
  const pictureRef = React.useRef<HTMLInputElement>(null);
  const audioRef = React.useRef<HTMLInputElement>(null);

  const disable = () => {
    if (form.audio && form.name && form.artist) {
      return false;
    }

    return true;
  }

  const refresh = () => {
    setForm(TRACK_FORM)
  }

  const changePicture = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      setForm(prev => ({...prev, picture: file}));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPictureUrl(e?.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  const changeAudio = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      setForm(prev => ({...prev, audio: file}));
      setAudioName(file?.name);
    }
  }

  const changeTextField = (evt: React.ChangeEvent<HTMLInputElement>, fieldType: string) => {
    if (fieldType === 'name') {
      setForm(prev => ({...prev, name: evt.target.value}))
    }

    if (fieldType === 'artist') {
      setForm(prev => ({...prev, artist: evt.target.value}))
    }

    if (fieldType === 'text') {
      setForm(prev => ({...prev, text: evt.target.value}))
    }
  }

  const deletePicture = () => {
    setForm(prev => ({...prev, picture: null}));
    setPictureUrl('');
  }

  const deleteAudio = () => {
    setForm(prev => ({...prev, audio: null}));
    setAudioName('');
  }

  const postTrack = () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('artist', form.artist);
    formData.append('text', form.text);
    form.picture &&
    formData.append('picture', form.picture);
    form.audio &&
    formData.append('audio', form.audio);
  
    axios.post('/tracks', formData)
      .then(res => {
        console.log(res.data);
      })
      .then(res => {
        router.push('/tracks')
      })
      .catch(err => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    userStore.authMe();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Typography 
        variant='h4' 
        marginBottom={3}
        >
          Загрузить трек
        </Typography>
        <StyledForm>
          {form.picture
          && <Img src={pictureUrl}/>}
          <Grid 
          container 
          direction="column" 
          sx={{gap: '40px'}} 
          >
            <TextField 
            label="Название" 
            required 
            value={form.name}
            onChange={
              (evt: React.ChangeEvent<HTMLInputElement>) => 
              changeTextField(evt, 'name')
            }
            />
            <TextField 
            label="Исполнитель" 
            required 
            value={form.artist}
            onChange={
              (evt: React.ChangeEvent<HTMLInputElement>) => 
              changeTextField(evt, 'artist')
            }
            />
            <TextField 
            label="Текст" 
            multiline 
            value={form.text}
            onChange={
              (evt: React.ChangeEvent<HTMLInputElement>) => 
              changeTextField(evt, 'text')
            }
            />
          </Grid>
        </StyledForm>
        <PictureFileWrapper>
          <input 
          type="file" 
          hidden 
          accept='image/*' 
          ref={pictureRef}
          onChange={changePicture}
          />
          <Button 
          variant='contained'
          onClick={() => pictureRef.current?.click()}
          >
            загрузить обложку
          </Button>
          {form.picture
          && <Button 
             variant='outlined' 
             color='error'
             onClick={deletePicture}
             >
              Удалить
             </Button>}       
        </PictureFileWrapper>
        <AudioFileWrapper>
          <input 
          type="file" 
          hidden 
          accept='audio/*' 
          ref={audioRef}
          onChange={changeAudio}
          />
          <Button 
          variant="contained"
          onClick={() => audioRef.current?.click()}
          >
            загрузить аудио
          </Button>
          {form.audio
          && <DeleteWrapper>
              <Button 
                variant='outlined' 
                color='error' 
                hidden
                onClick={deleteAudio}
                >
                  Удалить
              </Button>
              <Typography>{audioName}</Typography>
             </DeleteWrapper>}
        </AudioFileWrapper>
        <LoadButtonsWrapper>
          <Button 
          variant='contained' 
          size='large' 
          disabled={disable()} 
          onClick={postTrack} >
            Загрузить
          </Button>
          <Button 
          variant='outlined' 
          size='large' 
          onClick={refresh} 
          >
            Сброс
          </Button>
        </LoadButtonsWrapper>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Create;