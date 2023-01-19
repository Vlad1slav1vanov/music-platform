import { makeAutoObservable } from "mobx";
import { IPlayer } from "../types/player";
import { ITrack } from "../types/track";

class PlayerStore {
  constructor() {
    makeAutoObservable(this)
  }

  currentState: IPlayer = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true,
  };

  pauseTrack = () => {
    this.currentState.pause = true;
  }

  playTrack = () => {
    this.currentState.pause = false;
  }

  setVolume = (volume: number) => {
    this.currentState.volume = volume;
  }

  setCurrentTime = (time: number) => {
    this.currentState.currentTime = time;
  }

  setDuration = (time: number) => {
    this.currentState.duration = time;
  }

  setActive = (track: ITrack) => {
    this.currentState.active = track;
  }
}

export const playerStore = new PlayerStore();
