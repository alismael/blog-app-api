

export type UserId = number

export interface UserData {
    title: string
}

export interface User {
    id?: UserId
    guid: string
    data: UserData   
}
