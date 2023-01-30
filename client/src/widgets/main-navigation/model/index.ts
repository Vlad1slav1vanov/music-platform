import { makeAutoObservable } from 'mobx'

class NavStore {
  constructor () {
    makeAutoObservable(this)
  }
}

const navStore = new NavStore()
export default navStore
