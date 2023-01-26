import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

//STYLES

const FormWrapper = styled.div`
  display: flex;
  gap: 30px;
`

const TextDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`

const AlbumImage = styled.img`
  display: block;
  border: 1px solid grey;
  min-width: 250px;
  height: 250px;
`

const UploadImageContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

const ButtonUploadImage = styled(Button)`
  width: 200px;
`

// Component

const CreateAlbumForm: React.FC = () => {
  const [albumName, setAlbumName] = React.useState('');
  const [artistName, setArtistName] = React.useState('');
  const [pictureUrl, setPictureUrl] = React.useState('');
  const [pictureFile, setPictureFile] = React.useState<File | null>(null);
  const pictureRef = React.useRef<HTMLInputElement | null>(null);

  const changePicture = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      setPictureFile(file)
      const reader = new FileReader();
      reader.onload = (e) => {
        setPictureUrl(e?.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  const changeAlbumName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(evt.target.value)
  }

  const changeArtistName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(evt.target.value)
  }

  const deletePicture = () => {
    setPictureFile(null);
    setPictureUrl('');
  }

  const uploadHandleClick = () => {
    pictureRef.current?.click()
  }

  return (
    <FormWrapper>
      <AlbumImage src={pictureUrl ? pictureUrl : ''} />
      <TextDataWrapper>
        <TextField 
        label='Название альбома' 
        required 
        fullWidth 
        value={albumName}
        onChange={changeAlbumName}
        />
        <TextField 
        label='Имя исполнителя' 
        required 
        fullWidth
        value={artistName}
        onChange={changeArtistName} 
        />
        <UploadImageContainer>
          <ButtonUploadImage 
          variant="outlined" 
          onClick={uploadHandleClick}
          >
            Загрузить обложку
          </ButtonUploadImage>
          {(pictureFile && pictureUrl) 
          && <Button 
             variant="outlined" 
             color="error" 
             onClick={deletePicture}
             >
              Удалить
            </Button>}
          <input
          type="file" 
          hidden 
          accept='image/*' 
          ref={pictureRef}
          onChange={changePicture}
          />
        </UploadImageContainer>
      </TextDataWrapper>
    </FormWrapper>
  )
}

export default observer(CreateAlbumForm);