import { Pause, PlayCircle } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import PlayerStore from "../store/PlayerStore";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import React from "react";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";
import { observer } from "mobx-react";
import styled from "styled-components";

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

// not initialized audio var

let audio: HTMLAudioElement;

// Component

const Player: React.FC = () => {
  const activeTrack = PlayerStore.currentState.active;

  const setAudio = () => {
    if (PlayerStore.currentState.active) {
      audio.src = activeTrack ? `http://localhost:9000/${activeTrack?.audio}` : '';
      audio.volume = PlayerStore.currentState.volume / 100;
      audio.onloadedmetadata = () => {
        PlayerStore.setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        PlayerStore.setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  const play = () => {
    if (PlayerStore.currentState.pause) {
      PlayerStore.playTrack()
      audio.play()
    } else {
      PlayerStore.pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (evt: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(evt.target.value) / 100
    PlayerStore.setVolume(Number(evt.target.value))
  }

  const changeCurrentTime = (evt: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(evt.target.value)
    PlayerStore.setCurrentTime(Number(evt.target.value))
  }

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [activeTrack])

  if (!activeTrack) {
    return null;
  }

  return (
    <PlayerWrapper
    >
      <Grid sx={{display: 'flex', alignItems: 'center'}}>
        <IconButton
        sx={{width: 50, height: 50}}
        >
          <SkipPreviousIcon
          htmlColor="white" 
          sx={{width: 30, height: 30}}
          />
        </IconButton>
        <IconButton
        sx={{width: 50, height: 50}}
        onClick={() => play()}
        >
          {PlayerStore.currentState.pause
          ? <PlayCircle 
            htmlColor="white" 
            sx={{width: 50, height: 50}} 
            />
          : <Pause 
            htmlColor="white" 
            sx={{width: 40, height: 40}}  
            />
          }
        </IconButton>
        <IconButton
        sx={{width: 50, height: 50}}
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
      left={PlayerStore.currentState.currentTime} 
      right={PlayerStore.currentState.duration} 
      value={PlayerStore.currentState.currentTime}
      onChange={changeCurrentTime} 
      />
      <Volume 
      value={PlayerStore.currentState.volume} 
      onChange={changeVolume}
      />
    </PlayerWrapper>
  )
}

export default observer(Player);