import { Card, Grid, IconButton, Box } from "@mui/material";
import styled from "styled-components";
import React from "react";
import { ITrack } from "../types/track";
import { Delete, Pause, PlayCircle, RunningWithErrors } from "@mui/icons-material";
import { useRouter } from "next/router";
import PlayerStore from "../store/PlayerStore";
import { observer } from "mobx-react";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const StyledCard = styled(Card)`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
`

const TrackPicture = styled.img`
  display: block;
`

const ArtistName = styled(Box)`
  font-size: 12px;
  color: #929292;
`

const TrackTime = styled(Box)`
  font-size: 14px;
`

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
  const router = useRouter();

  const play = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    PlayerStore.setActive(track);
    PlayerStore.playTrack();
  };

  return (
    <StyledCard 
    onClick={() => router.push('/tracks/' + track._id)}
    >
      <IconButton 
      onClick={play}
      >
      {active
      ? <Pause fontSize="large" />
      : <PlayCircle fontSize="large" />
      }
      </IconButton>
      <Box 
      width={70} 
      height={70}
      >
        <TrackPicture 
        width={70} 
        height={70} 
        src={'http://localhost:9000/' + track.picture} 
        alt={track.name} 
        />
      </Box>
      <Grid 
      container 
      direction='column'
      >
        <div>{track.name}</div>
        <ArtistName>{track.artist}</ArtistName>
      </Grid>
      <Grid 
      container 
      direction='column' 
      width={150} 
      alignItems='center'
      >
        {active && <TrackTime>2:33/4:20</TrackTime>}
        <IconButton 
        onClick={(evt) => evt.stopPropagation()}
        >
          <Delete />
        </IconButton>
      </Grid>
    </StyledCard>
  )
}

export default observer(TrackItem);