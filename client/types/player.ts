import { ITrack } from "./track";

export interface IPlayer {
  currentTime: number;
  duration: number;
  active: null | ITrack;
  volume: number;
  pause: boolean;
}