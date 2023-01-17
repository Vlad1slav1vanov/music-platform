import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import theme from '../theme/theme';
import UserStore from '../store/UserStore';
import { observer } from 'mobx-react';

const HomePage: React.FC = () => {
  React.useEffect(() => {
    UserStore.authMe();
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