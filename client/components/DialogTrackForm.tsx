import { Box, Button, Dialog, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

interface DialogTrackFormProps {
  isOpen: boolean;
  handleClose: () => void;
}

const DialogTrackForm: React.FC<DialogTrackFormProps> =  ({isOpen, handleClose}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} >
      <DialogTitle>Загрузить трек</DialogTitle>
      <DialogContentText>
        Для загрузки трека нужно указать его название и прикрепить аудиофайл. 
        Также можно написать текст песни.
      </DialogContentText>
      <TextField 
      label="Название"
      />
      <TextField 
      label="Текст"
      />
    </Dialog>
  )
}

export default observer(DialogTrackForm);