import { Maybe } from 'tsmonad';
import { ColumnValue } from '../../entity/models/Entity'
import { DBIO } from "../../../libs/IO"
import { User } from "../models/User";

export interface IUserRepository {
  findByEmailOrUserName(userName: ColumnValue<string>, email: ColumnValue<string>): DBIO<Maybe<User>>
}