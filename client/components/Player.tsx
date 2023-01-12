import { Pause, PlayCircle } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";

const StyledPlayer = styled.div`
  z-index: 10;
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: #1976d2;
  gap: 20px;
`

const TrackName = styled.div`
  color: white;
  font-size: 18px;
` 

const ArtistName = styled.div`
  color: white;
  font-size: 14px;
`

const Player: React.FC = () => {
  const track: ITrack = {_id: '63bd314ecdc4703715a2cecc', name: 'Survival of the Fittest', artist: 'Mobb Deep', text: 'text1', listens: 1, picture: 'http://localhost:9000/image/589d7f7c-060c-417d-8be7-4cb79dda7f99.jpg', audio: 'http://localhost:9000/audio/493c2080-96ce-43e2-bff2-13cd67310f99.mp3', comments: [],}

  const active = false;
  return (
    <StyledPlayer>
      <IconButton
      onClick={(evt) => evt.stopPropagation()}
      >
      {active
      ?
      <Pause htmlColor="white" fontSize="large"  />
      :
      <PlayCircle htmlColor="white" fontSize="large" />
      }
      </IconButton>
      <Grid 
      container 
      direction='column'
      width={300}
      >
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artist}</ArtistName>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => {}} />
      <Volume left={0} right={100} onChange={() => {}}/>
    </StyledPlayer>
  )
}

export default Player;