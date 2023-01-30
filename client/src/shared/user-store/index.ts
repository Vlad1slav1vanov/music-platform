import axios from 'shared/axios/instanceWithAuth'
import { makeAutoObservable, runInAction } from 'mobx'
import { type IUserWithToken, type IUser } from 'shared/models/user'

class UserStore {
  constructor () {
    makeAutoObservable(this)
  }

  user: IUser | null = null

  changeUserData = (userData: IUserWithToken): void => {
    this.user = userData
    window.localStorage.setItem('token', userData.token)
  }

  async checkAuth (): Promise<IUserWithToken> {
    try {
      const response = await axios.get<IUserWithToken>('/users/me')
      runInAction(() => {
        this.changeUserData(response.data)
      })
      return response.data
    } catch {
      throw new Error('Не удлаось авторизоваться')
    }
  }

  logout = (): void => {
    window.localStorage.removeItem('token')
    this.user = null
  }
}

const userStore = new UserStore()
export default userStore
