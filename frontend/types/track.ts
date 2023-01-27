import { IComment } from "./comment";

export interface ITrack {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  artist: string;
  text?: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
  commentsCount: number;
}