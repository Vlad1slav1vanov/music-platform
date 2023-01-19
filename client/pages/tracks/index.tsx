import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Card, Button, Box, TextField, ThemeProvider, Typography } from '@mui/material';
import TrackList from '../../components/TrackList';
import {trackStore} from '../../store/TrackStore';
import { observer } from 'mobx-react';
import theme from '../../theme/theme';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    trackStore.fetchTracks();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MainLayout searchIsAvailable title='Список треков - музыкальная платформа'>
        <Typography 
        variant='h4' 
        marginBottom={5}
        >
          Все треки
        </Typography>
        <Box  sx={{display: 'flex', gap: '15px', alignItems: 'center'}}>
          <Typography variant='h6' >Не нашли то, что искали? Загрузите свой трек!</Typography>
          <Button 
            onClick={() => router.push('/tracks/create')}
            variant="contained"
          >
            Загрузить
          </Button>
        </Box>
        <Grid container justifyContent='center'>
            <Box p={4}>
              <Grid container justifyContent='space-between'>
              </Grid>
            </Box>
            <TrackList tracks={trackStore.currentTracks} />
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);
