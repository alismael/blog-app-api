import { db } from './../../db'
import { UserFactory } from './../factory'
import { UserService } from './../../../src/modules/user/services/UserService'
import { connection } from "../../../src/modules/mysql/mysql"
let logger = require('../../../src/logger')

describe("user service tests", () => {
  let service = new UserService
  let factory = new UserFactory

  test("create user", (done) => {
    let action = service.register(factory.userPasswordData)
    db.run(action)
      .then(result => {
        expect(result).toBeGreaterThan(0)
        done()
      })
      .catch(err => {
        throw err
      })
  })
})
