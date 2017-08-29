import { UserPasswordData } from './../models/UserPassword';
import * as Promise from "bluebird"
import { UserId } from "../models/User";

export interface IUserPasswordRepository {
    add (user: UserPasswordData, userId: UserId): Promise<number>
}
