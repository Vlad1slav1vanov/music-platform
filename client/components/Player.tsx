import { Pause, PlayCircle } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import {playerStore} from "../store/PlayerStore";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import React from "react";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";
import { observer } from "mobx-react";
import styled from "styled-components";
import { trackStore } from "../store/TrackStore";

const PlayerWrapper = styled(Box)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 2000;
  padding: 0 24px;
  background-color: #5824f3;
`

let audio: HTMLAudioElement;

const Player: React.FC = () => {
  const activeTrack = playerStore.currentState.active;

  const changeVolume = (evt: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(evt.target.value) / 100
    playerStore.setVolume(Number(evt.target.value))
  }

  const changeCurrentTime = (evt: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(evt.target.value)
    playerStore.setCurrentTime(Number(evt.target.value))
  }

  const previousTrack = () => {
    const activeTrack = trackStore.currentTracks.findIndex(
      track => track === playerStore.currentState.active
    )

    playerStore.setCurrentTime(0);

    if (activeTrack === 0) {
      return;
    }

    playerStore.setActive(trackStore.currentTracks[activeTrack - 1])
  }

  const nextTrack = () => {
    const activeTrack = trackStore.currentTracks.findIndex(
      track => track === playerStore.currentState.active
    )

    playerStore.setCurrentTime(0);

    if (activeTrack === trackStore.currentTracks.length - 1) {
      return;
    }

    playerStore.setActive(trackStore.currentTracks[activeTrack + 1])
  }

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    
    playerStore.initAudio(audio)
    playerStore.setAudio();

    if (!playerStore.currentState.pause) {
      playerStore.playAudio();
    }
  }, [activeTrack])

  if (!activeTrack) {
    return null;
  }

  return (
    <PlayerWrapper>
      <Grid sx={{display: 'flex', alignItems: 'center'}}>
        <IconButton
        sx={{width: 50, height: 50}}
        onClick={previousTrack}
        >
          <SkipPreviousIcon
          htmlColor="white" 
          sx={{width: 30, height: 30}}
          />
        </IconButton>
        {playerStore.currentState.pause
        ?
        <IconButton
        sx={{width: 50, height: 50}}
        onClick={() => playerStore.playAudio()}
        >
            <PlayCircle 
            htmlColor="white" 
            sx={{width: 50, height: 50}} 
            />
        </IconButton>
        :
        <IconButton
        sx={{width: 50, height: 50}}
        onClick={() => playerStore.pauseAudio()}
        >
            <Pause 
            htmlColor="white" 
            sx={{width: 40, height: 40}}  
            />
        </IconButton>        
        }
        <IconButton
        sx={{width: 50, height: 50}}
        onClick={nextTrack}
        >
          <SkipNextIcon
          htmlColor="white" 
          sx={{width: 30, height: 30}}  
          />
        </IconButton>
      </Grid>
      <Grid 
      container 
      direction='column'
      width='200px'
      marginLeft='25px'
      >
        <Typography color="white">
          {activeTrack?.name}
        </Typography>
        <Typography color="white">
          {activeTrack?.artist}
        </Typography>
      </Grid>
      <TrackProgress 
      left={playerStore.currentState.currentTime} 
      right={playerStore.currentState.duration} 
      value={playerStore.currentState.currentTime}
      onChange={changeCurrentTime} 
      />
      <Volume 
      value={playerStore.currentState.volume} 
      onChange={changeVolume}
      />
    </PlayerWrapper>
  )
}

export default observer(Player);