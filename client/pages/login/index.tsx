import { Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import axios from "../../axios";
import MainLayout from "../../layouts/MainLayout";
import theme from "../../theme/theme";

const Index: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = () => {
    const formData = {
      email: email,
      password: password,
    }
    axios.post('/users/login', formData)
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
        margin='100px auto' 
        gap={5} 
        alignItems='center' 
        >
          <Typography 
          variant="h4" 
          fontWeight={800}
          >
            Вход
          </Typography>
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
            Вход
          </Button>          
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default Index;