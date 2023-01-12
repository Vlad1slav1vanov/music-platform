import { Button, Grid, Box, TextField, List, ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";

const TrackPage = () => {
  const track: ITrack = {_id: '63bd314ecdc4703715a2cecc', name: 'Survival of the Fittest', artist: 'Mobb Deep', text: 'text1', listens: 1, picture: 'http://localhost:9000/image/589d7f7c-060c-417d-8be7-4cb79dda7f99.jpg', audio: 'http://localhost:9000/audio/493c2080-96ce-43e2-bff2-13cd67310f99.mp3', comments: [],}
  const router = useRouter();

  const MainInfo = styled(Grid)`
    margin: 25px 0;
    gap: 25px;
  `
  const Title = styled.h1`
    color: #1c60a4;
    font-family: 'Roboto', sans-serif;
  `
  const InfoRow = styled.div`
    color: #1c60a4;
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
  `
  const TrackText = styled.p`
    color: #1c60a4;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  `

  return (
    <MainLayout>
      <Button
      variant="outlined"
      onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <MainInfo container>
        <img 
        src={track.picture} 
        width={200} 
        height={200} 
        />
        <div>
          <Title>{track.name}</Title>
          <InfoRow>Исполнитель: {track.artist}</InfoRow>
          <InfoRow>Количество прослушиваний: {track.listens}</InfoRow>
        </div>
      </MainInfo>
      <InfoRow>Текст</InfoRow>
      <TrackText>{track.text}</TrackText>
      <Grid container gap={2}>
        <InfoRow>Комментарии</InfoRow>
        <TextField
        label="Ваше имя"
        fullWidth
        />
        <TextField
        label="Комментарий"
        fullWidth
        multiline
        rows={4}
        />
        <Button
        variant="outlined"
        >
          Отправить
        </Button>
      </Grid>
      <List>
        {track.comments.map((comment) =>
          <ListItem key={comment._id}>
            <Box>{comment.username}</Box>
            <Box>{comment.text}</Box>
          </ListItem>
        )}
      </List>
    </MainLayout>
  )
}

export default TrackPage;