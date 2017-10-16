import { db } from './../../db';
import { UserFactory } from './../factory';
import { UserService } from './../../../src/modules/user/services/UserService';
import { connection } from "../../../src/modules/mysql/mysql";
describe("user service tests", () => {
  let service = new UserService
  let factory = new UserFactory
  test("create user", () => {
    let action = service.register(factory.userPasswordData) 
    db.run(action, (r) => {
      console.log(r)
      console.log("**************************************")
      expect(r).toBe(1)
    })
    // connection.beginTransaction(err => {
    //   if (err)
    //     connection.rollback(() => {
    //       return
    //     })
    //   else {
    //     service.register(factory.userPasswordData).execute(connection, true)
    //       .then(r => {
    //         expect(r).toBe(1)
    //         connection.rollback(() => {
    //           return
    //         })
    //       })
    //   }
    // })
  })
})
