import { UserData } from './../models/User';

export interface IUserRepository {
    add (user: UserData): Promise<number>
}
