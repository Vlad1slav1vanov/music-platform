/* eslint-disable @next/next/no-img-element */
import { Button, Grid, Box, TextField, List, ListItem, ThemeProvider, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import axios from "../../axiosWithoutAuth";
import { GetServerSideProps } from "next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";
import { useInput } from "../../hooks/useInput";
import theme from "../../theme/theme";
import styled from "styled-components";
import CommentBlock from "../../components/CommentBlock";
import { userStore } from "../../store/UserStore";

const StyledAccordion = styled(Accordion)`
border: 1px solid grey;
&:hover {
  border: 1px solid #5824f3;
  outline: 1px solid #5824f3;
}
`

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
        <Grid container direction='column' >
          <Button
          variant="outlined"
          onClick={() => router.push('/tracks')}
          startIcon={<ArrowBackIcon/>}
          sx={{marginBottom: '30px', width: 100}}
          >
            назад
          </Button>
          <Grid 
          container
          sx={{gap: '60px', marginBottom: '30px'}}
          >
            <img
            src={`http://localhost:9000/${track.picture}`}
            width={300} 
            height={300} 
            alt=""
            />
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px'}}>
              <Typography variant="h3">{track.name}</Typography>
              <Typography variant="h5">Исполнитель: {track.artist}</Typography>
              <Typography variant="h6">Количество прослушиваний: {track.listens}</Typography>
            </Box>
          </Grid>
          {track.text
          &&
          <StyledAccordion sx={{marginBottom: '30px'}} >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            >
              <Typography color='primary' variant="h5">Текст песни</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6" whiteSpace='pre'>
                {track.text}
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
          }
        </Grid>
        <Grid>
          <StyledAccordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            >
              <Typography color='primary' variant="h5">Комментарии ({track.commentsCount})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommentBlock comments={track.comments}/>
            </AccordionDetails>
          </StyledAccordion>
        </Grid>
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

