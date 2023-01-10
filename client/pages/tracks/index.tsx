import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Card, Button, Box } from '@mui/material';
import { ITrack } from '../../types/track';

const StyledCard = styled(Card)`
  width: 900px;
`

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {_id: '63bd314ecdc4703715a2cecc', name: 'Survival of the Fittest', artist: 'Mobb Deep', text: 'text1', listens: 1, picture: 'http://localhost:9000/image/589d7f7c-060c-417d-8be7-4cb79dda7f99.jpg', audio: 'http://localhost:9000/audio/493c2080-96ce-43e2-bff2-13cd67310f99.mp3', comments: [],},
    {_id: '63bd90ab858c08e600ddb6db', name: 'Lose Yourself', artist: 'Eminem', text: 'text2', listens: 2, picture: 'http://localhost:9000/image/19abe3fc-b082-487d-8f01-cc275efb6509.jpeg', audio: 'http://localhost:9000/audio/7a09cd98-5b30-498a-a548-67fc3245f40d.mp3', comments: [],},
    {_id: '63bd9155858c08e600ddb6dd', name: 'Bohemian Rhapsody', artist: 'Queen', text: 'text3', listens: 3, picture: 'http://localhost:9000/image/ee7de634-5b78-4795-bb48-593d2bad3906.jpg', audio: 'http://localhost:9000/audio/cc319ad7-b9a5-4f18-b757-7267325ef414.mp3', comments: [],},
  ];
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
          </StyledCard>
        </Grid>
      </MainLayout>
    </>
  )
}

export default Index;