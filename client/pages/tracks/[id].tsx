import { Button, Grid, Box, TextField, List, ListItem } from "@mui/material";
import axios from "../../axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";
import { useInput } from "../../hooks/useInput";

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

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = React.useState<ITrack>(serverTrack)
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post('/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id,
      })
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (err) {
      console.warn(err)
    }
  }

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
        src={`http://localhost:9000/${track.picture}`} 
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
        {...username}
        label="Ваше имя"
        fullWidth
        />
        <TextField
        {...text}
        label="Комментарий"
        fullWidth
        multiline
        rows={4}
        />
        <Button
        variant="outlined"
        onClick={addComment}
        >
          Отправить
        </Button>
      </Grid>
      <List>
        {track.comments.map(comment =>
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

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  if (params !== undefined) {
    const response = await axios.get(`/tracks/${params.id}`)
    return {
      props: {
        serverTrack: response.data as ITrack
      }
    }
  }
  else {
    return {props: {}}
  }
};