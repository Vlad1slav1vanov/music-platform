import { makeAutoObservable } from "mobx";
import axios from "../axios";
import { IUser } from "../types/user";

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  userState: IUser = {
    userId: '',
    fullName: '',
    email: '',
    avatarUrl: '',
  }

  authMe = async () => {
    try {
      const response = await axios.get<IUser>(`/users/${this.userState.userId}`);
      this.userState = response.data;
    } catch (err) {
      console.warn(err);
    }
  }

  register = async () => {

  }

  login = async () => {

  }
}

export default new UserStore();