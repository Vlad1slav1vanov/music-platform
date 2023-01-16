import { Avatar, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import axios from "../../axios";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";

const Index: React.FC = () => {
  const router = useRouter();
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = React.useState('');
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const changeAvatar = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      setAvatarFile(file)
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e?.target?.result as string)
      }
      reader.readAsDataURL(file);
    }
  }

  const deleteAvatar = () => {
    setAvatarFile(null)
    setAvatar('')
  }

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    formData.append('fullName', fullName)
    avatarFile &&
    formData.append('picture', avatarFile)
    axios.post('/users/register', formData)
    .then(res => router.push('/tracks'))
    .catch(err => console.error(err))
  }

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Grid 
        container 
        direction='column' 
        width={400} 
        margin='0 auto' 
        gap={5} 
        alignItems='center' 
        >
          <Typography variant="h4" fontWeight={800}>Регистрация</Typography>
          <Avatar 
          src={avatar}
          sx={{width: 120, height: 120, cursor: 'pointer', bgcolor: '#5824f3'}}
          onClick={() => fileInput.current?.click()}
          />
          {avatar && 
          <Button
          color="error"
          onClick={deleteAvatar}
          >
            Удалить
          </Button>
          }
          <input 
          ref={fileInput}
          accept='image/*'
          type="file"
          onChangeCapture={changeAvatar}
          hidden
          />
          <TextField
          fullWidth
          label='E-mail'
          required
          type="email"         
          value={email}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)}
          />
          <TextField
          fullWidth
          label="Имя/Никнейм"
          required
          type="text"
          value={fullName}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setFullName(evt.target.value)}
          />
          <TextField
          fullWidth
          label="Пароль"
          required
          type="password"
          value={password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
          />
          <Button
          variant="contained"
          size="large"
          onClick={onSubmit}
          >
            Создать аккаунт
          </Button>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Index;