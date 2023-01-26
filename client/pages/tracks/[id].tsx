/* eslint-disable @next/next/no-img-element */
import { 
  Button, 
  Grid, 
  Box, 
  ThemeProvider, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails
} from "@mui/material";
import axios from "../../axiosWithoutAuth";
import { GetServerSideProps } from "next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";
import theme from "../../theme/theme";
import styled from "styled-components";
import CommentBlock from "../../components/comment-list/CommentBlock";
import { userStore } from "../../store/UserStore";
import dayjs from "dayjs";
import { url } from "../../url/url";

const StyledAccordion = styled(Accordion)`
border: 1px solid grey;
margin-bottom: 30px;
&:hover {
  border: 1px solid #5824f3;
  outline: 1px solid #5824f3;
}
`

const ButtonBack = styled(Button)`
  width: 150px;
  margin-bottom: 30px;
`

const TrackDataWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 30px;
`

const TrackMainInfo = styled(Box)`
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  gap: 40px;
`

const TrackPicture = styled.img`
  display: block;
  width: 300px;
  height: 300px;
`

const TrackPage = ({serverTrack}: any) => {
  const [track, setTrack] = React.useState<ITrack>(serverTrack)
  const router = useRouter();

  const routeBack = () => {
    router.push('/tracks')
  }

  React.useEffect(() => {
    userStore.authMe()
  })

  return (
    <ThemeProvider theme={theme}>
      <MainLayout 
      title={`Музыкальная платформа ${track.name} - ${track.artist}`}
      keywords={`Песня, ${track.name}, Исполнитель, ${track.artist}`}
      >
        <Grid container direction='column'>
          <ButtonBack
          variant="outlined"
          onClick={routeBack}
          startIcon={<ArrowBackIcon/>}
          >
            назад
          </ButtonBack>
          <TrackDataWrapper>
            <TrackPicture
            src={url + track.picture}
            alt=""
            />
            <TrackMainInfo>
              <Typography variant="h3">
                {track.name}
              </Typography>
              <Typography variant="h5">
                Исполнитель: {track.artist}
              </Typography>
              <Typography variant="h6">
                Количество прослушиваний: {track.listens}
              </Typography>
              <Typography variant="h6">
                Дата загрузки: {dayjs(track.createdAt).format("DD.MM.YY")}
              </Typography>
            </TrackMainInfo>
          </TrackDataWrapper>
          {track.text &&
          <StyledAccordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            >
              <Typography 
              color='primary' 
              variant="h5"
              >
                Текст песни
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography 
              variant="h6" 
              whiteSpace='pre'
              >
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
              <Typography 
              color='primary' 
              variant="h5"
              >
                Комментарии ({track.commentsCount})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommentBlock 
              comments={track.comments} 
              track={track} 
              setTrack={setTrack} 
              />
            </AccordionDetails>
          </StyledAccordion>
        </Grid>
      </MainLayout>
    </ThemeProvider>
  )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  if (params) {
    const response = await axios.get(`/tracks/${params.id}`)
    return {
      props: {
        serverTrack: response.data as ITrack
      }
    }
  } else {
    return {props: {}}
  }
};

