import { Trace } from './../../../helper/models';
import { UserId } from "./User";


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

export interface RegistrationRequest extends UserPasswordData {readonly repeatedPassword: string} {
}

export const vaidateRegistrationRequest = (registrationRequest: RegistrationRequest): boolean => {
    return validateUserPasswordDataModel(<UserPasswordData>registrationRequest) 
    && (registrationRequest.password === registrationRequest.repeatedPassword)
}

export const validateUserPasswordDataModel = (userPasswordData: UserPasswordData): boolean => {
    let email = new RegExp("/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/g")
    return email.test(userPasswordData.email)
} 