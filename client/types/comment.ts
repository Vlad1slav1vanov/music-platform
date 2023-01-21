import { IUser } from "./user";

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
  createdAt: string;
}