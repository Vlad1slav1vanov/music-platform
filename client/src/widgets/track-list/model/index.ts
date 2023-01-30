import axios from 'shared/axios/instance'
import { makeAutoObservable, runInAction } from 'mobx'
import { type ITrack } from 'shared/models/track'

class TrackListStore {
  constructor () {
    makeAutoObservable(this)
  }

  trackList: ITrack[] = []

  async fetchTrackList (): Promise<ITrack[]> {
    try {
      const response = await axios.get('/tracks')
      runInAction(() => {
        this.trackList = response.data
      })
      return response.data
    } catch (err) {
      throw new Error('Не удалось загрузить список треков')
    }
  }

  async fetchNewTrackList (): Promise<ITrack[]> {
    try {
      const response = await axios.get('/tracks/new')
      runInAction(() => {
        this.trackList = response.data
      })
      return response.data
    } catch (err) {
      throw new Error('Не удалось загрузить список треков')
    }
  }

  async fetchPopularTrackList (): Promise<ITrack[]> {
    try {
      const response = await axios.get('/tracks/popular')
      runInAction(() => {
        this.trackList = response.data
      })
      return response.data
    } catch (err) {
      throw new Error('Не удалось загрузить список треков')
    }
  }
}

const trackListStore = new TrackListStore()
export default trackListStore
