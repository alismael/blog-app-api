import { Trace } from './../../../helper/models';
import { UserId } from "./User";
import { Entity } from "../../entity/models/Entity";


export type UserPasswordId = number

export interface UserPasswordRef {
    readonly userId: UserId
}

export interface UserPasswordData {
    readonly password: string
    readonly email: string
    readonly username: string
}

export interface UserPassword {
    readonly id?: UserPasswordId
    readonly ref: UserPasswordRef
    readonly data: UserPasswordData
    readonly trace: Trace
}

export interface RegistrationRequest extends UserPasswordData { readonly repeatedPassword: string } {
}

export const vaidateRegistrationRequest = (registrationRequest: RegistrationRequest): boolean => {
    return validateUserPasswordDataModel(<UserPasswordData>registrationRequest)
        && (registrationRequest.password === registrationRequest.repeatedPassword)
}

export const validateUserPasswordDataModel = (userPasswordData: UserPasswordData): boolean => {
    let email = new RegExp("/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/g")
    return email.test(userPasswordData.email)
}

class UserPasswordEntity extends Entity<UserPassword> {
    getDto(model: UserPassword) {
        return {
            email: model.data.email,
            username: model.data.username,
            password: model.data.password,
            user_id: model.ref.userId,
            created_by: model.trace.createdBy,
            updated_by: model.trace.updatedBy,
            created_at: model.trace.createdAt,
            updated_at: model.trace.updatedAt
        }
    }
    tableName(): string {
        return "user_password"
    }
    tableColumns(): string[] {
        return ["email", "username", "password", "user_id", "created_by", "updated_by", "created_at", "updated_at"]
    }
}

export const userPasswordEntity = new UserPasswordEntity()
