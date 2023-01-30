import { makeAutoObservable } from 'mobx'
import type React from 'react'
import axios from 'shared/axios/instance'
import { type IUserWithToken } from 'shared/models/user'
import userStore from 'shared/user-store'

class RegisterStore {
  constructor () {
    makeAutoObservable(this)
  }

  avatarFile = null as File | null
  avatarUrl = ''
  email = ''
  fullName = ''
  password = ''

  changeAvatar = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.files != null) {
      this.avatarFile = evt.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.avatarUrl = e?.target?.result as string
      }
      reader.readAsDataURL(this.avatarFile)
    }
  }

  deleteAvatar = (): void => {
    this.avatarUrl = ''
    this.avatarFile = null
  }

  changeEmailInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.email = evt.target.value
  }

  changeFullNameInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.fullName = evt.target.value
  }

  changePasswordInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.password = evt.target.value
  }

  refreshForm = (): void => {
    this.avatarFile = null
    this.fullName = ''
    this.avatarUrl = ''
    this.email = ''
    this.password = ''
  }

  createFormData = (): FormData => {
    const formData = new FormData()
    formData.append('email', this.email)
    formData.append('fullName', this.fullName)
    formData.append('password', this.password)
    if (this.avatarFile != null) {
      formData.append('picture', this.avatarFile)
    }
    return formData
  }

  register = async (): Promise<IUserWithToken> => {
    try {
      const response = await axios.post<IUserWithToken>('/users/register', this.createFormData())
      userStore.changeUserData(response.data)
      return response.data
    } catch (err) {
      return await Promise.reject(err)
    }
  }
}

const registerStore = new RegisterStore()
export default registerStore
