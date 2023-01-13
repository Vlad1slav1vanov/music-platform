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
    volume: 0,
    pause: true,
  }

  currentState: IPlayer = this.initialState

  pauseTrack = () => {
    this.currentState.pause = true;
  }

  playTrack = () => {
    this.currentState.pause = false;
  }
}

export default new PlayerStore();