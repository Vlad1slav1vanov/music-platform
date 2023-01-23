import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { Grid, Button, Box, ThemeProvider, Typography, Tabs, Tab } from '@mui/material';
import TrackList from '../../components/TrackList';
import {trackStore} from '../../store/TrackStore';
import { observer } from 'mobx-react';
import theme from '../../theme/theme';

const Index = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      trackStore.fetchTracks();
    }

    if (newValue === 1) {
      trackStore.fetchNewTracks();
    }

    if (newValue === 2) {
      trackStore.fetchPopularTracks();
    }
  };

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
        <Box sx={{
          display: 'flex', 
          gap: '15px', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <Typography variant='h6' >
            Не нашли то, что искали? Загрузите свой трек!
          </Typography>
          <Button 
            onClick={() => router.push('/tracks/create')}
            variant="contained"
          >
            Загрузить
          </Button>
        </Box>
        <Tabs 
        onChange={handleChange}
        value={tabValue} 
        sx={{
          marginLeft: 4, 
          marginBottom: 2
        }}>
          <Tab label='Все' />
          <Tab label='Новые' />
          <Tab label='Популярные' />
        </Tabs>
        <Grid container justifyContent='center'>
            <TrackList tracks={trackStore.currentTracks} />
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default observer(Index);
