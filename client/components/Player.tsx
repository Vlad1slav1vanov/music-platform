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

let audio: any;

// Component

const Player: React.FC = () => {
  const track: ITrack = {_id: '63bd314ecdc4703715a2cecc', name: 'Survival of the Fittest', artist: 'Mobb Deep', text: 'text1', listens: 1, picture: 'http://localhost:9000/image/589d7f7c-060c-417d-8be7-4cb79dda7f99.jpg', audio: 'http://localhost:9000/audio/f6f7c26e-c656-4dd6-a5f3-aec19a814e50.mp3', comments: [],}

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
      audio.src = track.audio;
      audio.volume = PlayerStore.currentState.volume / 100;
    }
  }, [])

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

  const active = false;
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
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artist}</ArtistName>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => {}} />
      <Volume value={PlayerStore.currentState.volume} onChange={changeVolume}/>
    </StyledPlayer>
  )
}

export default observer(Player);