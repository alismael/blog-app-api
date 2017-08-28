import { Trace } from './../../../helper/models';
import { UserId } from "./User";


export type UserPasswordId = number

export interface UserPasswordRef {
    userId: UserId
}

export interface UserPasswordData {
    password: string
    email: string
    username: string
}

export interface UserPassword {
    id?: UserPasswordId
    ref: UserPasswordRef
    data: UserPasswordData
    trace: Trace
}

export interface RegistrationRequest extends UserPasswordData {repeatedPassword: string} {
}

export const vaidateRegistrationRequest = (registrationRequest: RegistrationRequest): boolean => {
    return validateUserPasswordDataModel(<UserPasswordData>registrationRequest) 
    && (registrationRequest.password === registrationRequest.repeatedPassword)
}

export const validateUserPasswordDataModel = (userPasswordData: UserPasswordData): boolean => {
    let email = new RegExp("/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/g")
    return email.test(userPasswordData.email)
} 