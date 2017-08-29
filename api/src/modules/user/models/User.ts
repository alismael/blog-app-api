

export type UserId = number
export type UserUUID = string

export interface UserData {
    readonly title: string
}

export interface User {
    readonly id?: UserId
    readonly uuid: UserUUID
    readonly data: UserData   
}

export const userToColumn = (user: User) => {
    return {
        guid: user.uuid,
        title: user.data.title
    }
}
