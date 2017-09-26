import { Trace } from './../../common/models';
import { config } from './../../../config/config'
import * as bcrypt from 'bcrypt'
import { User, userEntity, UserUUID, UserId } from "../models/User"
import * as uuid from "uuid"
import { UserPassword, UserPasswordData, userPasswordEntity, UserPasswordRef } from "../models/UserPassword";

export class UserService {

  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, config.hash.saltRounds)
  }

  async register(data: UserPasswordData): Promise<number> {
    const id = await userEntity.insert(
      userEntity.trace.created.At.set(new Date()), 
      userEntity.trace.updated.At.set(new Date()),
      userEntity.uuid.set(new UserUUID(uuid.v4()))
    )
    const hashed = await this.hash(data.password)
    const userPasswordData = Object.assign({}, data, {
      password: hashed
    })
    const userId = new UserId(id[0])
    const userPasswordRef = new UserPasswordRef(userId)
    return userPasswordEntity.insert(
      ...userPasswordEntity.ref.columns(userPasswordRef), 
      ...userPasswordEntity.data.columns(userPasswordData), 
      ...userPasswordEntity.trace.columns(Trace.createTrace(userId))
    )
  }
} 
