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

export interface Store {
  blogs: IBlogState
}