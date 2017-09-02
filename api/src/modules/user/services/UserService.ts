import { createTrace } from './../../../helper/models';
import { IUserPasswordRepository } from './../repositories/IUserPasswordRepository';
import { UserRepository } from './../repositories/UserRepository'
import { config } from './../../../config/config'
import { RegistrationRequest, UserPasswordData } from './../models/UserPassword'
import * as bcrypt from 'bcrypt'
import { UserPasswordRepository } from "../repositories/UserPasswordRepository";
import { userEntity, User } from "../models/User"
import { userPasswordEntity, UserPassword } from "../models/UserPassword"
import * as uuid from "uuid"

export class UserService {

    userRepository = new UserRepository()
    passwordRepository = new UserPasswordRepository()

    async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, config.hash.saltRounds)
    }

    async register(request: RegistrationRequest): Promise<number> {
        let userId = await userEntity.insert(<User>{ data: { title: null }, uuid: uuid.v4() })
        let hashed = await this.hash(request.password)
        return userPasswordEntity.insert(<UserPassword>{
            ref: {
                userId: userId
            },
            data: {
                email: request.email,
                password: hashed,
                username: request.username
            },
            trace: createTrace(userId)
        })
    }
} 