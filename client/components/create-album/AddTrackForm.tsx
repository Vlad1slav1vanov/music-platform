import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

const ContentWrapper = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const DeleteTrackWrapper = styled.div`
  display: flex; 
  gap: 20px; 
  align-items: center; 
  justify-content: flex-start;
`

const ActionsWrapper = styled(DialogActions)`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
`

const AddTrackForm: React.FC = () => {
  const [trackName, setTrackName] = React.useState('');
  const [trackText, setTrackText] = React.useState('');
  const [audioUrl, setAudioUrl] = React.useState('');
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const audioRef = React.useRef<HTMLInputElement | null>(null);

  const changeTrackName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTrackName(evt.target.value)
  }

  const changeTrackText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTrackText(evt.target.value)
  }

  const uploadAudioClick = () => {
    audioRef.current?.click()
  }

  const changeAudio = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      setAudioFile(file)
      setAudioUrl(file?.name);
    }
  }

  const deleteAudio = () => {
    setAudioFile(null);
    setAudioUrl('');
  }

  return (
    <Dialog open onClose={() => {}}>
      <DialogTitle>Добавить трек</DialogTitle>
      <ContentWrapper>
        <DialogContentText>
          Для того, чтобы добавить трек в альбом, 
          укажите название трека, прикрепите аудиофайл и
          напишите текст песни (если он есть)
        </DialogContentText>
        <TextField
          label="Название трека"
          fullWidth
          onChange={changeTrackName}
        />
        <Button 
        variant="contained"
        onClick={uploadAudioClick}
        >
          Загрузить аудио
        </Button>
        {(audioFile && audioUrl)
        &&  <DeleteTrackWrapper>
              <Button 
              variant='outlined' 
              color='error' 
              hidden
              onClick={deleteAudio}
              >
                Удалить
              </Button>
              <Typography>{audioUrl}</Typography>
            </DeleteTrackWrapper>}
        <input 
        type="file" 
        hidden 
        accept='audio/*' 
        ref={audioRef}
        onChange={changeAudio}
        />
        <TextField
          label="Текст трека"
          fullWidth
          multiline
          onChange={changeTrackText}
        />
      </ContentWrapper>
      <ActionsWrapper>
        <Button variant="contained">Загрузить</Button>
        <Button variant="outlined" color="error" >Отмена</Button>
      </ActionsWrapper>
  </Dialog>
  )
}

export default observer(AddTrackForm);