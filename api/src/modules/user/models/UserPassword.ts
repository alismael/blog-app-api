import { Entity } from "../../entity/models/Entity";

export type RegistrationRequest = {
    username: string
    email: string
    password: string
    repeatedPassword: string
}

export class UserPassword extends Entity {

    // public
    public user_id: number
    public password: string
    public email: string
    public username: string
    public created_by: number;
    public created_at: Date;
    public updated_by: number;
    public updated_at: Date;

    public constructor(username: string, email: string, password: string) {
        super()
        this.password = password
        this.email = email
        this.username = username
    }

    tableName(): string {
        return "user_password"
    }
    tableColumns(): string[] {
        return ["email", "username", "password", "user_id", "created_by", "updated_by", "created_at", "updated_at"]
    }

    static vaidateRegistrationRequest = (registrationRequest: RegistrationRequest): Promise<UserPassword> => {
        return new Promise((resolve, reject) => {
            if (registrationRequest.email && registrationRequest.password && registrationRequest.username) {
                let userPassword = new UserPassword(registrationRequest.username, registrationRequest.email, registrationRequest.password)
                if (UserPassword.validateUserPasswordDataModel(userPassword)
                    && (registrationRequest.password === registrationRequest.repeatedPassword))
                    resolve(userPassword)
                else
                    reject("Invalid request")
            }
            else
                reject("Invalid request")
        })
    }

    static validateUserPasswordDataModel = (userPassword: UserPassword): boolean => {
        let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return email.test(userPassword.email)
    }
}





