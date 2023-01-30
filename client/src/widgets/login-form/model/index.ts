import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import type React from 'react'
import { type IUserWithToken } from 'shared/models/user'

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

  createFormData = (): FormData => {
    const formData = new FormData()
    formData.append('email', this.email)
    formData.append('password', this.password)
    return formData
  }

  refreshForm = (): void => {
    this.email = ''
    this.password = ''
  }

  async login (): Promise<IUserWithToken> {
    try {
      const response = await axios.post('/users/login')
      return response.data
    } catch (err) {
      return await Promise.reject(err)
    }
  }
}

const loginStore = new LoginStore()
export default loginStore
