import { makeAutoObservable } from "mobx";
import { IUser } from "../types/user";

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  saveToken = (res: IUser) => {
    window.localStorage.setItem('token', res.token)
  }

  register = async () => {

  }

  login = async () => {

  }
}

export default new UserStore();