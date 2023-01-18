import { Button, Grid, Box, TextField, List, ListItem, ThemeProvider } from "@mui/material";
import axios from "../../axiosWithoutAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";
import { useInput } from "../../hooks/useInput";
import Image from "next/image";
import theme from "../../theme/theme";

const TrackPage = ({serverTrack}: any) => {
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
    <ThemeProvider theme={theme}>
      <MainLayout 
      title={`Музыкальная платформа ${track.name} - ${track.artist}`}
      keywords={`Песня, ${track.name}, Исполнитель, ${track.artist}`}
      >
        <Button
        variant="outlined"
        onClick={() => router.push('/tracks')}
        >
          К списку
        </Button>
        <Box>
          {/* <Image 
          src={`http://localhost:9000/${track.picture}`} 
          width={200} 
          height={200} 
          alt=""
          /> */}
          <div>
            <div>{track.name}</div>
            <div>Исполнитель: {track.artist}</div>
            <div>Количество прослушиваний: {track.listens}</div>
          </div>
        </Box>
        <div>Текст</div>
        <div>{track.text}</div>
        <Grid container gap={2}>
          <div>Комментарии</div>
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
    </ThemeProvider>
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