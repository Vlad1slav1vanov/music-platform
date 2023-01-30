export interface IUser {
  fullName: string
  email: string
  _id: string
  avatarUrl?: string
}

export interface IUserWithToken extends IUser {
  token: string
}
