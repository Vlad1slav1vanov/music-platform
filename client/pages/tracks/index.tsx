import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Card, Button, Box } from '@mui/material';
import TrackList from '../../components/TrackList';
import TrackStore from '../../store/TrackStore';
import { observer } from 'mobx-react';

const StyledCard = styled(Card)`
  width: 900px;
`

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    TrackStore.fetchTracks();
  }, [])

  return (
    <>
      <MainLayout>
        <Grid container justifyContent='center'>
          <StyledCard>
            <Box p={4}>
              <Grid container justifyContent='space-between'>
                <h1>Список треков</h1>
                <Button 
                onClick={() => router.push('/tracks/create')}
                >
                  Загрузить
                </Button>
              </Grid>
            </Box>
            <TrackList tracks={TrackStore.currentTracks} />
          </StyledCard>
        </Grid>
      </MainLayout>
    </>
  )
}

export default observer(Index);
