import { Avatar, Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";

const Index: React.FC = () => {
  const fileInput = React.useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = React.useState('');
  const changeAvatar = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e?.target?.result as string)
      }
      reader.readAsDataURL(file);
    }
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
          <input 
          ref={fileInput}
          accept='image/*'
          type="file"
          onChangeCapture={changeAvatar}
          hidden
          />
          <TextField
          fullWidth
          label='Email'
          required
          type="email"
          />
          <TextField
          fullWidth
          label="Имя/Никнейм"
          required
          type="text"
          />
          <TextField
          fullWidth
          label="Пароль"
          required
          type="password"
          />
          <Button
          variant="contained"
          >
            Создать аккаунт
          </Button>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Index;