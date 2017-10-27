import { userPasswordEntity, UserPasswordRef, UserPassword } from './../../src/modules/user/models/UserPassword';
import { UserFactory } from './factory';
import { userEntity } from './../../src/modules/user/models/User';
import { User, UserId } from "../../src/modules/user/models/User";
import { DBIO } from "../../src/libs/IO";
import * as bcrypt from 'bcrypt'
import { config } from "../../src/config/config";
import { Trace } from "../../src/modules/common/models";

export class DBIOFactory {
  userFactory = new UserFactory
  user(): DBIO<UserPassword> {
    let e = userEntity
    let pe = userPasswordEntity
    return e.insert(...e.data.columns(this.userFactory.userData))
    .flatMap((id: number) => {
      const userId = new UserId(id) 
      let data = this.userFactory.userPasswordData
      const hashed = bcrypt.hashSync(data.password, config.hash.saltRounds)
      const userPasswordData = Object.assign({}, data, {
        password: hashed
      })
      const trace = Trace.createTrace(userId)
      const ref = new UserPasswordRef(userId)
      return pe.insert(
        ...pe.ref.columns(ref),
        ...pe.data.columns(userPasswordData),
        ...pe.trace.columns(trace)
      ).map(id => {
        return new UserPassword(ref, userPasswordData, trace)
      })
    })
  }
}
