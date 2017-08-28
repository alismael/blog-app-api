import { UserRepository } from './../repositories/UserRepository'
import { config } from './../../../config/config'
import { RegistrationRequest } from './../models/UserPassword'
import { UserData } from './../models/User'
import * as bcrypt from 'bcrypt'

export class UserService {
  
    userRepository = new UserRepository() 

    async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, config.hash.saltRounds)
    }

    async register(registrationRequest: RegistrationRequest) {
        let user = await this.userRepository.add(<UserData>{title: null})
        let hashed = await this.hash(registrationRequest.password)
        // let UserPassword = await this.
        
    }  
} 