import { makeAutoObservable, runInAction } from "mobx";
import axios from "../axios";
import { IUser } from "../types/user";

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  userState: IUser | null = null;

  changeState = (userData: IUser, token?: string) => {
    this.userState = userData;
    token &&
    window.localStorage.setItem('token', token)
  }

  authMe = async () => {
    try {
      const {data} = await axios.get<IUser>(`/users/me`);
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
    window.localStorage.removeItem('token');
    this.userState = null;
  }
}

export default new UserStore();
