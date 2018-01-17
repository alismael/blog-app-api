import { userPasswordEntity, UserPasswordRef, UserPassword, UserPasswordData } from './../../src/modules/user/models/UserPassword';
import { userEntity, User, UserId, UserUUID, UserData, UserAggregate } from "../../src/modules/user/models/User";
import { IO } from "../../src/libs/IO";
import * as bcrypt from 'bcrypt'
import { config } from "../../src/config/config";
import { Trace } from "../../src/modules/common/models";
import * as uuid from "uuid"

export enum USER {
	ADMIN,
	USER1,
	USER2
}

export class UserFactory {

	userPasswordData: UserPasswordData = new UserPasswordData("Admin", "admin@test.com", "123456")	
  userData: UserData = new UserData("manager")
  registrationRequest = {
		username: "user1",
		email: "test@test.com",
		password: "string",
		repeatedPassword: "string"
	}

	loginRequest = {
		username: "test",
		password: "test"
	}
	
	user(): IO<UserAggregate> {
    const e = userEntity
		const pe = userPasswordEntity
		const userUUID = new UserUUID(uuid.v4())
    return e.insert(...e.data.columns(this.userData), e.uuid.set(userUUID))
    .flatMap((id: number) => {
      const userId = new UserId(id) 
      let data = this.userPasswordData
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
        return new UserAggregate(new User(userId, userUUID, this.userData, trace), new UserPassword(ref, userPasswordData, trace))
      })
    })
	}
}