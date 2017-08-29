import { UserPasswordData } from './../models/UserPassword';
import { IUserPasswordRepository } from './IUserPasswordRepository';
import { UserData, User, UserUUID, UserId } from './../models/User';
import { IUserRepository } from './IUserRepository'
import knex from './../../knex/knex'
import * as uuid from "uuid"
import * as Promise from "bluebird"


export class UserPasswordRepository implements IUserPasswordRepository {
    // Add new user
    add(data: UserPasswordData, userId: UserId): Promise<number> {
        return knex('user_password')
            .insert({
                email: data.email,
                username: data.username,
                password: data.password,
                user_id: userId,
                created_by: userId,
                updated_by: userId,
                created_at: Date.now(),
                updated_at: Date.now()
            })
            .catch(function (err) {
                throw err;
            });
    }

}
