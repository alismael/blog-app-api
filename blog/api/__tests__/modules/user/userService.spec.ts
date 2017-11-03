import { ErrorHandler, StatusCode, NoSuchElement } from './../../../src/modules/common/ErrorHandler';
import { logger } from './../../../src/logger';
import { UserPassword } from './../../../src/modules/user/models/UserPassword';
import { DBIOFactory } from './../DBIOFactory';
import { db } from './../../db'
import { UserService } from './../../../src/modules/user/services/UserService'
import { connection } from "../../../src/modules/mysql/mysql"
import { DBIO } from "../../../src/libs/IO";
import { Maybe } from "tsmonad";
import { UserFactory } from "../../factories/UserFactory";

describe("user service tests", () => {
  let service = new UserService
  let factory = new UserFactory
  let dbioFactory = new DBIOFactory

  test("create user", (done) => {
    let action = service.register(factory.data.userPasswordData)
    db.run(action)
      .then(result => {
        expect(result).toBeGreaterThan(0)
        done()
      })
      .catch(err => {
        throw err
      })
  })

  test("user login successfully", (done) => {
    let userPasswordIO: DBIO<UserPassword> = dbioFactory.user()
    let action = userPasswordIO.flatMap((userPassword: UserPassword) => {
      return service.login(factory.data.userPasswordData.username, factory.data.userPasswordData.password)
    })

    db.run(action)
    .then(result => {
      expect(typeof result).toBe('string')
      done()
    })
    .catch(err => {
      throw err
    })
  })

  test("user can't login with wrong password", (done) => {
    let userPasswordIO: DBIO<UserPassword> = dbioFactory.user()
    let action = userPasswordIO.flatMap((userPassword: UserPassword) => {
      return service.login(factory.data.userPasswordData.username, "wrong password")
    })

    db.run(action)
    .then(result => {
      throw "Error user must can't login"
    })
    .catch(err => {
      expect(err).toMatchObject(new ErrorHandler(StatusCode.BAD_REQUEST, Maybe.just("your username or password maybe wrong")))
      done()
    })
  })

  test("user can't login username not found", (done) => {
    let action = service.login(factory.data.userPasswordData.username, "wrong password")

    db.run(action)
    .then(result => {
      throw "Error username not found"
    })
    .catch(err => {
      expect(err).toMatchObject(new NoSuchElement)
      done()
    })
  })
})
