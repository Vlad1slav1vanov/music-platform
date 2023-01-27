import { Card, Grid, IconButton, Box, Typography } from "@mui/material";
import styled from "styled-components";
import React from "react";
import { ITrack } from "../../types/track";
import { Pause, PlayCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import {playerStore} from "../../store/PlayerStore";
import { observer } from "mobx-react";
import { url } from "../../url/url";

interface TrackItemProps {
  track: ITrack;
}

const StyledCard = styled(Card)`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid grey;

  &:hover {
    border-color: #5824f3;
    outline: 1px solid #5824f3;
  }
`

const TrackPicture = styled.img`
  display: block;
  width: 90px;
  height: 90px;
`

const TrackName = styled(Typography)`
  font-size: 18px;
`

const ArtistName = styled(Box)`
  font-size: 15px;
  color: #929292;
`

const TrackItem: React.FC<TrackItemProps> = ({track}) => {
  const router = useRouter();

  const play = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    playerStore.setActive(track);
    playerStore.playAudio();
    playerStore.setCurrentTime(0)
  };

  const pause = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    playerStore.pauseAudio();
  }

  return (
    <StyledCard 
    onClick={() => router.push('/tracks/' + track._id)}
    >
      {(track === playerStore.currentState.active && !playerStore.currentState.pause)
      ? <IconButton
        onClick={pause}
        >
          <Pause 
          fontSize="large" 
          color="secondary" 
          />
        </IconButton>
      : <IconButton
        onClick={play}
        >
          <PlayCircle 
          fontSize="large" 
          color="secondary" 
          />
        </IconButton>}
      <TrackPicture  
      src={url + track.picture} 
      alt={track.name} 
      />
      <Grid 
      container 
      direction='column'
      >
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artist}</ArtistName>
      </Grid>
    </StyledCard>
  )
}

export default observer(TrackItem);