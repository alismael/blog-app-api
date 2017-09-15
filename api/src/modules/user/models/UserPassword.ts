import { UserId } from "./User";
import { Trace } from "./../../common/models";
import { Entity } from "../../entity/models/Entity";

export interface IRegistrationRequest {
  username: string
  email: string
  password: string
  repeatedPassword: string
}

export class UserPasswordData {
  constructor(public username: string, public email: string, public password: string) {}
}

export class UserPassword {

  public static vaidateRegistrationRequest = (registrationRequest: IRegistrationRequest): Promise<UserPasswordData> => {
    return new Promise((resolve, reject) => {
      if (registrationRequest.email && registrationRequest.password && registrationRequest.username) {
        const userPassword = new UserPasswordData(
          registrationRequest.username,
          registrationRequest.email,
          registrationRequest.password
        )
        if (UserPassword.validateUserPasswordDataModel(userPassword)
          && (registrationRequest.password === registrationRequest.repeatedPassword))
          resolve(userPassword)
        else
          reject("Invalid request")
      }else
        reject("Invalid request")
    })
  }

  public static validateUserPasswordDataModel = (userPassword: UserPasswordData): boolean => {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.test(userPassword.email)
  }

  public constructor(
    public userId: UserId,
    public data: UserPasswordData,
    public trace: Trace
  ) {}
}

export class UserPasswordEntity extends Entity {
  public tableName(): string {
    return "user_password"
  }
  public tableColumns(): string[] {
    return ["email", "username", "password", "user_id", "created_by", "updated_by", "created_at", "updated_at"]
  }
}
