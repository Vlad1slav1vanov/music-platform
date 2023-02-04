import React from 'react';
import {ThemeProvider} from '@mui/material';
import theme from './theme/theme';
import {BrowserRouter} from 'react-router-dom';
import Routing from './routing';
import MainLayout from './main-layout';
import './styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Routing />
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
