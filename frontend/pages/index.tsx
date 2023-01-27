import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import theme from '../theme/theme';
import { observer } from 'mobx-react';
import { userStore } from "../store/UserStore";

const HomePage: React.FC = () => {
  React.useEffect(() => {
    userStore.authMe();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Typography variant='h4' >Популярное</Typography>
        <Typography variant='h4'>Новинки</Typography>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(HomePage);