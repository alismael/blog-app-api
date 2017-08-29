import { UserData } from './../models/User';
import * as Promise from "bluebird"

export interface IUserRepository {
    add (user: UserData): Promise<number>
}
