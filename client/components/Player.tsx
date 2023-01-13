import { Pause, PlayCircle } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import PlayerStore from "../store/PlayerStore";
import React from "react";
import styled from "styled-components";
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";
import { observer } from "mobx-react";

// Styles

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
    <StyledPlayer>
      <IconButton
      onClick={() => play()}
      >
      {PlayerStore.currentState.pause
      ? <PlayCircle htmlColor="white" fontSize="large" />
      : <Pause htmlColor="white" fontSize="large"  />
      }
      </IconButton>
      <Grid 
      container 
      direction='column'
      width={300}
      >
        <TrackName>
          {activeTrack?.name}
        </TrackName>
        <ArtistName>
          {activeTrack?.artist}
        </ArtistName>
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
    </StyledPlayer>
  )
}

export default observer(Player);