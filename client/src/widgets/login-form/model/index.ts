import axios from 'shared/axios/instance'
import { makeAutoObservable } from 'mobx'
import type React from 'react'
import { type IUserWithToken } from 'shared/models/user'
import userStore from 'shared/user-store'

class LoginStore {
  constructor () {
    makeAutoObservable(this)
  }

  email = ''
  password = ''

  changeEmail = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.email = evt.target.value
  }

  changePassword = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.password = evt.target.value
  }

  refreshForm = (): void => {
    this.email = ''
    this.password = ''
  }

  async login (): Promise<IUserWithToken> {
    try {
      const loginData = {
        email: this.email,
        password: this.password
      }
      const response = await axios.post('/users/login', loginData)
      userStore.changeUserData(response.data)
      return response.data
    } catch (err) {
      return await Promise.reject(err)
    }
  }
}

const loginStore = new LoginStore()
export default loginStore
