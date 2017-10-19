import { db } from './../../db';
import { UserFactory } from './../factory';
import { UserService } from './../../../src/modules/user/services/UserService';
import { connection } from "../../../src/modules/mysql/mysql";
let log = require('./../../../src/logger');

describe("user service tests", () => {
  let service = new UserService
  let factory = new UserFactory
  
  test("create user", (done) => {
    let action = service.register(factory.userPasswordData) 
    db.run(action, (r) => {
      expect(r).toBeGreaterThan(0)
      done()
    })
  })
})
