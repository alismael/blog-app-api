import { UserId } from "./User";
import { Trace, stringColumn, CompositeTrace, Id, UserIdColumn } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue, Primative } from "../../entity/models/Entity";

export interface IRegistrationRequest {
  username: string
  email: string
  password: string
  repeatedPassword: string
}

export class UserPasswordData {
  constructor(public username: string, public email: string, public password: string) { }
}

export class UserPasswordRef {
  constructor(public userId: UserId) { }
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
      } else
        reject("Invalid request")
    })
  }

  public static validateUserPasswordDataModel = (userPassword: UserPasswordData): boolean => {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.test(userPassword.email)
  }

  public constructor(
    public ref: UserPasswordRef,
    public data: UserPasswordData,
    public trace: Trace
  ) { }
}

type UserPasswordEntityType = UserId | Date | string
class UserPasswordEntity extends Entity<UserPasswordEntityType, Primative> {

  public data = new class extends Composite<UserPasswordData, string> {
    public email = stringColumn("email")
    public username = stringColumn("username")
    public password = stringColumn("password")

    public columns = (composite: UserPasswordData): ColumnValue<UserPasswordData, string>[] => {
      return [
        this.email.set(composite.email), 
        this.username.set(composite.username),
        this.password.set(composite.password)
      ]
    }
  }

  public ref = new class extends Composite<UserPasswordRef, number> {
    public userId = UserIdColumn("user_id") 

    public columns = (composite: UserPasswordRef) => {
      return [
        this.userId.set(composite.userId) 
      ]
    }
  }    
  
  public trace = CompositeTrace  

  public tableName(): string {
    return "user_password"
  }
  public tableColumns(): string[] {
    return ["email", "username", "password", "user_id", "created_by", "updated_by", "created_at", "updated_at"]
  }
}


export const userPasswordEntity = new UserPasswordEntity()
