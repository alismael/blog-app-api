import { UserData, User } from './../models/User';
import { IUserRepository } from './IUserRepository'
import knex from './../../knex/knex'
import * as uuid from "uuid"


export class UserRepository implements IUserRepository {
    // Add new user
    async add(userData: UserData): Promise<number> {
        let userUUID = uuid.v4()
        return await knex('user')
            .insert(<User>{ guid: userUUID, data: userData })
            .catch(function (err) {
                throw err;
            });
    }

}
