import { makeAutoObservable, runInAction } from "mobx";
import axios from "../axios";
import { IUser } from "../types/user";

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  userId = '';
  fullName = '';
  email = '';
  avatarUrl: string | undefined = '';

  changeState = (userData: IUser, token?: string) => {
    this.userId = userData.userId;
    this.fullName = userData.fullName;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    token &&
    window.localStorage.setItem('token', token)
  }

  authMe = async () => {
    try {
      const {data} = await axios.get<IUser>(`/users/${this.userId}`);
      runInAction(() => {
        this.changeState(data);
      })
    } catch (err) {
      runInAction(() => {
        console.warn(err);
      })    
    }
  }

  register = async (formData: FormData) => {
    try {
      const {data} = await axios.post('/users/register', formData);
      runInAction(() => {
        this.changeState(data, data.token);
      })
    } catch (err) {
      runInAction(() => {
        console.warn(err);
      }) 
    }
  }

  login = async (formData: object) => {
    try {
      const {data} = await axios.post('/users/login', formData);
      runInAction(() => {
        this.changeState(data, data.token);
        console.log(data)
      })
    } catch (err) {
      runInAction(() => {
        console.warn(err);
      }) 
    }
  }

  logout = async () => {

  }
}

export const userStore = new UserStore();
