import React from 'react';
import { ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import theme from '../theme/theme';
import {userStore} from '../store/UserStore';
import { observer } from 'mobx-react';

const Center = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HomePage: React.FC = () => {
  React.useEffect(() => {
    userStore.authMe();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
          <Center>
            <h1>Добро пожаловать!</h1>
            <h3>Здесь собраны лучшие треки!</h3>
          </Center>
        </MainLayout>
    </ThemeProvider>
  )
}

export default observer(HomePage);