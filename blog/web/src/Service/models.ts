export interface ILoginRequest {
  username: string
  password: string
}

export interface Blog {
  id: number,
  guid: string
  img: string,
  data: {
    title: string,
    description: string
  },
  trace: {
    createdBy: string,
    createdAt: string,
    updatedBy: string,
    updatedAt: string
  },
}

export interface IBlogState {
  blogs: Blog[],
  fetching: boolean,
  fetched: boolean,
  error: string,
}

export interface IUser {
  id: number,
  guid: string
  username: string,
  img: string,
  isGuest: boolean
}

export class GuesUser implements IUser {
  id = 0;
  guid = 'Gues-User';
  username = 'Guest';
  img = 'default_user.png';
  isGuest = true
}

export interface IUserState {
  user: IUser,
  fetching: boolean,
  fetched: boolean,
  error: string,
}

export interface Store {
  blogs: IBlogState,
  user: IUserState
}