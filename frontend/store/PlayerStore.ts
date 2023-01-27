import { makeAutoObservable } from "mobx";
import { IPlayer } from "../types/player";
import { ITrack } from "../types/track";

class PlayerStore {
  constructor() {
    makeAutoObservable(this)
  }

  audio = null as HTMLAudioElement | null;

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

  initAudio = (audio: HTMLAudioElement) => {
    this.audio = audio;
  }

  setAudio = () => {
    if (this.currentState.active && this.audio) {
      this.audio.src = this.currentState.active ? `http://localhost:9000/${this.currentState.active.audio}` : '';
      this.audio.volume = this.currentState.volume / 100;
      this.audio.onloadedmetadata = () => {
        this.audio && this.setDuration(this.audio.duration)
      }
      this.audio.ontimeupdate = () => {
        this.audio && this.setCurrentTime(this.audio.currentTime)
      }
      this.audio.currentTime = this.currentState.currentTime
    }
  }

  playAudio = () => {
    this.playTrack()
    this.audio && this.audio.play()
  }

  pauseAudio = () => {
    this.pauseTrack()
    this.audio && this.audio.pause()
  }
}

export const playerStore = new PlayerStore();
