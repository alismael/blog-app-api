import { Maybe } from 'tsmonad';
import { ErrorHandler, StatusCode, NoSuchElement } from './../../common/ErrorHandler';
import { Trace } from './../../common/models';
import { config } from './../../../config/config'
import * as bcrypt from 'bcrypt'
import { userEntity, UserUUID, UserId, JWT } from "../models/User"
import * as uuid from "uuid"
import { UserPassword, UserPasswordData, userPasswordEntity, UserPasswordRef, RegistrationError } from "../models/UserPassword";
import { DBIO, IO } from "../../../libs/IO";
import { UserPasswordMysqlRepository } from "../repositories/UserPasswordMysqlRepository";
import * as jsonWebToken from 'jsonwebtoken'


export class UserService {

  hash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, config.hash.saltRounds)
  }

  comparePasswords(plaintextPassword: string, hash: string): boolean {
    return bcrypt.compareSync(plaintextPassword, hash)
  }

  signJwt(data: UserUUID): JWT {
    return jsonWebToken.sign({
      sub: data,
      iss: config.jwt.issuer
    }, new Buffer(config.jwt.key, 'base64'), { expiresIn: config.jwt.expiresIn });
  }

  private insertPassword(userId: UserId, data: UserPasswordData): IO<number> {
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

  register(data: UserPasswordData): IO<number> {
    let io = new UserPasswordMysqlRepository(userPasswordEntity.tableName()).findByEmailOrUserName(
      userPasswordEntity.data.username.set(data.username),
      userPasswordEntity.data.email.set(data.email)
    )
      .flatMap(result => {
        return result.caseOf({
          just: (_) => DBIO.failed(
            new ErrorHandler(
              StatusCode.BAD_REQUEST,
              Maybe.just(new RegistrationError("dublicate userName or email")))),
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

    return io
  }

  login(username: string, plainPassword: string): IO<JWT> {
    const verifyPassword = (userPassword: UserPassword): IO<JWT> => {
      if (this.comparePasswords(plainPassword, userPassword.data.password))
        return userEntity.findOne(userEntity.id.set(userPassword.ref.userId))
          .flatMap(record => {
            return record.caseOf({
              just: user => DBIO.successful(this.signJwt(user.guid)),
              nothing: () => DBIO.failed<JWT, NoSuchElement>(new NoSuchElement)
            })
          })
      else
        return DBIO.failed(
          new ErrorHandler(StatusCode.BAD_REQUEST, Maybe.just("your username or password maybe wrong"))
        )
    }

    let upe = userPasswordEntity
    let io: IO<JWT> = upe.findOne(upe.data.username.set(username))
      .flatMap((mUserPassword: Maybe<UserPassword>) => {
        return mUserPassword.caseOf({
          just: verifyPassword,
          nothing: () => DBIO.failed<JWT, NoSuchElement>(new NoSuchElement)
        })
      })

    return io
  }

  getUser(guid: string) {
    return userEntity.findOne(userEntity.uuid.set(new UserUUID(guid)))
  }
} 
