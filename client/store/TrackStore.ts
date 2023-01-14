import { makeAutoObservable, runInAction } from "mobx";
import { ITrack } from "../types/track";
import axios from '../axios';

class TrackStore {
  constructor() {
    makeAutoObservable(this)
  }

  tracks: ITrack[] = [];
  currentTracks = this.tracks;
  
  fetchTracks = async () => {
    try {
      const response = await axios.get<ITrack[]>('/tracks');
      runInAction(() => {
        this.currentTracks = response.data;
      })
    } catch (err) {
      runInAction(() => {
        console.warn(err);
        return 'Не удалось загрузить треки'
      })
    }
  }

  searchTracks = async (query: string) => {
    try {
      const response = await axios.get<ITrack[]>('/tracks/search?query=' + query);
      runInAction(() => {
        this.currentTracks = response.data;
      })
    } catch (err) {
      runInAction(() => {
        console.warn(err);
        return 'Не удалось загрузить треки'
      })
    }
  }
}

export default new TrackStore();