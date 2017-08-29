import { IUserPasswordRepository } from './../repositories/IUserPasswordRepository';
import { UserRepository } from './../repositories/UserRepository'
import { config } from './../../../config/config'
import { RegistrationRequest, UserPasswordData } from './../models/UserPassword'
import { UserData } from './../models/User'
import * as bcrypt from 'bcrypt'
import { UserPasswordRepository } from "../repositories/UserPasswordRepository";

export class UserService {
  
    userRepository = new UserRepository() 
    passwordRepository = new UserPasswordRepository()
    
    async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, config.hash.saltRounds)
    }

    async register(request: RegistrationRequest): Promise<number> {
        let userId = await this.userRepository.add(<UserData>{title: null})
        let hashed = await this.hash(request.password)
        return this.passwordRepository.add(<UserPasswordData>{
            email: request.email,
            password: hashed,
            username: request.username
        }, userId[0])
    }  
} 