import { IUserPasswordRecord } from './../models/UserPassword';
import { Maybe } from 'tsmonad';
import { userEntity, User, IUserRecord } from './../models/User';
import { IUserRepository } from "./IUserRepository"
import { Primative, ColumnValue } from "../../entity/models/Entity";
import { EntityMysqlRepository } from "../../entity/repositories/EntityMysqlRepository";
import { DBIO, IO } from "../../../libs/IO";
import { RowDataPacket } from 'mysql2';

export class UserPasswordMysqlRepository extends EntityMysqlRepository<IUserPasswordRecord, Primative> implements IUserRepository {

  constructor(tableName: string) {
    super(tableName)
  }

  findByEmailOrUserName(userName: ColumnValue<string>, email: ColumnValue<string>): IO<Maybe<User>> {
    let query = this.find().where(`${userName.columnName} = ? or ${email.columnName} = ?`, ...[userName.value, email.value]).toParam()
    return new DBIO(query.text, query.values)
      .map(records => (<RowDataPacket[]>records).head().map(r => userEntity.map(<IUserRecord>r)))
  }
}
