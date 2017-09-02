import { UserData, User, UserUUID, UserId } from './../models/User';
import { IUserRepository } from './IUserRepository'
import knex from './../../knex/knex'
import * as uuid from "uuid"
import * as Promise from "bluebird"

export class UserRepository  {
    // Add new user
    // add(userData: UserData): Promise<UserId> {
    //     let userUUID: UserUUID = uuid.v4()
    //     return knex('user')
    //         .insert(userToColumn (<User>{ uuid: userUUID, data: userData }))
    //         .catch(function (err) {
    //             throw err;
    //         });
    // }

}
