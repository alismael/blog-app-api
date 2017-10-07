import { ColumnValue } from './../../entity/models/Entity';
import { Trace } from './../../common/models';
import { config } from './../../../config/config'
import * as bcrypt from 'bcrypt'
import { User, userEntity, UserUUID, UserId } from "../models/User"
import * as uuid from "uuid"
import { UserPassword, UserPasswordData, userPasswordEntity, UserPasswordRef } from "../models/UserPassword";
import { Operation, OperatorEnum, Primative } from "../../entity/models/Entity";
import { DBIO } from "../../../libs/IO";

function and<T, S extends Primative, B extends Primative>(c1: ColumnValue<T, S>, c2: ColumnValue<T, B>) {
  return new Operation<T, S | B>(OperatorEnum.AND, [c1, c2])
}

export class UserService {

  hash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, config.hash.saltRounds)
  }

  private insertPassword(userId: UserId, data: UserPasswordData): DBIO<number> {
    const hashed = this.hash(data.password)
    const userPasswordData = Object.assign({}, data, {
      password: hashed
    })
    const userPasswordRef = new UserPasswordRef(userId)
    return userPasswordEntity.insert(
      ...userPasswordEntity.ref.columns(userPasswordRef),
      ...userPasswordEntity.data.columns(userPasswordData),
      ...userPasswordEntity.trace.columns(Trace.createTrace(userId))
    )
  }

  register(data: UserPasswordData): DBIO<number> {
    let io = userPasswordEntity.findOne(userPasswordEntity.data.username.set(data.username))
      .flatMap(result => {
        return result.caseOf({
          just: (_) => DBIO.failed("Dublicate user name"),
          nothing: () => DBIO.successful(true)
        })
      })
      .flatMap(_ => {
        return userEntity.insert(
          userEntity.trace.created.At.set(new Date()),
          userEntity.trace.updated.At.set(new Date()),
          userEntity.uuid.set(new UserUUID(uuid.v4()))
        )
      })
      .flatMap(id => this.insertPassword(new UserId(id), data))

    return DBIO.ioTransaction(io)
  }
} 
