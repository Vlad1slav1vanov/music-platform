import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

// PropsInterface
interface AddTrackFormProps {
  artistName: string;
  picture: string;
  isOpen: boolean;
  onClose: () => void;
}

// Styles

const ContentWrapper = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TrackImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  align-self: center;
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

// Component

const AddTrackForm: React.FC<AddTrackFormProps> = ({
  artistName, 
  picture, 
  isOpen, 
  onClose
}) => {
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

  const refresh = () => {
    setTrackName('');
    setTrackText('');
    deleteAudio();
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Добавить трек</DialogTitle>
      <ContentWrapper>
        <DialogContentText>
          Для того, чтобы добавить трек в альбом, 
          укажите название трека, прикрепите аудиофайл и
          напишите текст песни (если он есть)
        </DialogContentText>
        <TrackImage src={picture} />
        <TextField
          label="Название трека"
          fullWidth
          value={trackName}
          onChange={changeTrackName}
        />
        <TextField 
        label="Исполнитель"
        disabled
        value={artistName}
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
          value={trackText}
          onChange={changeTrackText}
        />
      </ContentWrapper>
      <ActionsWrapper>
        <Button 
        variant="contained"
        >
          Загрузить
        </Button>
        <Button 
        variant="outlined" 
        color="error" 
        onClick={refresh}
        >
          Сброс
        </Button>
      </ActionsWrapper>
  </Dialog>
  )
}

export default observer(AddTrackForm);