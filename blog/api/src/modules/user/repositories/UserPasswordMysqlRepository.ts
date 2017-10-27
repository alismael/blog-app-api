import { UserPassword } from './../models/UserPassword';
import { Maybe } from 'tsmonad';
import { userEntity, User, IUserRecord } from './../models/User';
import { IUserRepository } from "./IUserRepository"
import { Primative, ColumnValue } from "../../entity/models/Entity";
import { EntityMysqlRepository } from "../../entity/repositories/EntityMysqlRepository";
import { DBIO } from "../../../libs/IO";
import { userPasswordEntity } from "../models/UserPassword";

class UserPasswordMysqlRepository extends EntityMysqlRepository<UserPassword, Primative> implements IUserRepository {

  constructor() {
    super(userPasswordEntity)
  }

  findByEmailOrUserName(userName: ColumnValue<string>, email: ColumnValue<string>): DBIO<Maybe<User>> {
    let query = this.find().where(`${userName.columnName} = ? or ${email.columnName} = ?`, ...[userName.value, email.value]).toParam()
    return new DBIO<IUserRecord[]>(query.text, query.values)
      .map(records => records.head().map(r => userEntity.map(r)))
  }
}

export const userPasswordRepository = new UserPasswordMysqlRepository()