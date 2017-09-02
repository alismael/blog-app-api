import { Entity } from "../../entity/models/Entity";

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

class UserEntity extends Entity<User> {
    getDto(user: User) {
        return {
            guid: user.uuid,
            title: user.data.title
        }
    }
    tableName(): string {
        return "user"
    }
    tableColumns(): string[] {
        return ["guid", "title"]
    }

}

export const userEntity = new UserEntity()
