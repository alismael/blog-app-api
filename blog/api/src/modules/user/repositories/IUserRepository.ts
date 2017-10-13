import { Maybe } from 'tsmonad';
import { ColumnValue, Primative } from '../../entity/models/Entity'
import { DBIO } from "../../../libs/IO"
import { UserId } from '../../user/models/User'

export interface IUserRepository<User, S extends Primative> {
  findByEmailOrUserName(userName: ColumnValue<string, string>, email: ColumnValue<string, string>): DBIO<Maybe<User>>
}