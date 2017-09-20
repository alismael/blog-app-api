import { Trace } from './../../common/models';
// import { UserPassword, UserPasswordData } from './../models/UserPassword';
import { config } from './../../../config/config'
import * as bcrypt from 'bcrypt'
import { User, userEntity, UserUUID } from "../models/User"
import * as uuid from "uuid"

export class UserService {

  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, config.hash.saltRounds)
  }

  async register(userPasswordData: any): Promise<number> {
    const userId = await userEntity.insert(
      userEntity.trace.created.At.set(new Date()), 
      userEntity.trace.updated.At.set(new Date()),
      userEntity.uuid.set(new UserUUID(uuid.v4()))
    )
    // const userpassword = new UserPassword(userId[0], userPasswordData, Trace.createTrace(userId[0]))
    // let hashed = await this.hash(userPassword.password)
    // userPassword.password = hashed
    // return userPassword.insert(userPassword)
    return userId
  }
} 
