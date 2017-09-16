import { UserPassword } from './../models/UserPassword';
import { config } from './../../../config/config'
import * as bcrypt from 'bcrypt'
import { User } from "../models/User"
import * as uuid from "uuid"

export class UserService {

  user = new User()

  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, config.hash.saltRounds)
  }

  async register(userPassword: UserPassword): Promise<number> {
    let user = new User()
    user.created_at = new Date()
    user.updated_at = new Date()
    user.guid = uuid.v4()
    let userId = await this.user.insert(user)
    userPassword.user_id = userId[0]
    userPassword.created_at = new Date()
    userPassword.updated_at = new Date()
    userPassword.created_by = userId[0]
    userPassword.updated_by = userId[0]
    let hashed = await this.hash(userPassword.password)
    userPassword.password = hashed
    return userPassword.insert(userPassword)
  }
} 