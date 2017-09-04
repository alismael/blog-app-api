import { UserPassword } from './../models/UserPassword';
import { createTrace } from './../../../helper/models';
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
        let trace = createTrace(userId[0])
        userPassword.user_id = userId[0]
        userPassword.created_at = trace.createdAt
        userPassword.updated_at = trace.updatedAt
        userPassword.created_by = trace.createdBy
        userPassword.updated_by = trace.updatedBy
        let hashed = await this.hash(userPassword.password)
        userPassword.password = hashed
        return userPassword.insert(userPassword)
    }
} 