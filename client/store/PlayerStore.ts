import { makeAutoObservable } from "mobx";
import { IPlayer } from "../types/player";

class PlayerStore {
  constructor() {
    makeAutoObservable(this)
  }

  initialState: IPlayer = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true,
  }

  currentState: IPlayer = this.initialState

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
}

export default new PlayerStore();