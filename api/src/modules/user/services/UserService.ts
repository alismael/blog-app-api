import { UserPassword } from "./../models/UserPassword";
import { config } from "./../../../config/config"
import * as bcrypt from "bcrypt"
import { User } from "../models/User"
import * as uuid from "uuid"
import * as jwt from "jsonwebtoken"

export class UserService {

  private userPassword = new UserPassword()

  public async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, config.hash.saltRounds)
  }

  public async register(userPassword: UserPassword): Promise<number> {
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

  async login(username: string, password: string): Promise<any> {
    let hased = await this.hash(password)
    let userPassword: any[] = await this.userPassword.find(["username", "password"])
      .where({
        username: username,
      })
    console.log(userPassword)
    if (userPassword.length > 0) {
      let result = await bcrypt.compareSync(password, userPassword[0].password)
      if (result) {
        let token = jwt.sign({
          uuid: userPassword[0].guid
        }, config.jwt.issuer, { expiresIn: "24h" });
        return Promise.resolve(token)
      }
      else
        return Promise.reject("password Invalid")
    } else
      return Promise.reject("username not found")

  }
} 