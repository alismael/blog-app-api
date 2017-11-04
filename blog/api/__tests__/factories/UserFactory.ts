import { userPasswordEntity, UserPasswordRef, UserPassword, UserPasswordData } from './../../src/modules/user/models/UserPassword';
import { userEntity, User, UserId, UserUUID, UserData } from "../../src/modules/user/models/User";
import { DBIO } from "../../src/libs/IO";
import * as bcrypt from 'bcrypt'
import { config } from "../../src/config/config";
import { Trace } from "../../src/modules/common/models";

export enum USER {
	ADMIN,
	USER1,
	USER2
}

export class UserFactory {

	user(): DBIO<UserPassword> {
    const e = userEntity
    const pe = userPasswordEntity
    return e.insert(...e.data.columns(this.userData))
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
        return new UserPassword(ref, userPasswordData, trace)
      })
    })
	}
	
	createUser(userRecord: UserRecord): DBIO<UserRecord> {
		let e = userEntity
		let pe = userPasswordEntity
		
		return e.insert(e.id.set(userRecord.user.id),
			e.uuid.set(userRecord.user.guid),
			...e.data.columns(userRecord.user.data),
			...e.trace.columns(userRecord.user.trace),
		)
			.flatMap((id: number) => {
				const userId = new UserId(id)
				let data = userRecord.userPasswordData
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
					return userRecord
				})
			})
	}

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

	userPasswordData: UserPasswordData = new UserPasswordData("Admin", "admin@test.com", "123456")	
	userData: UserData = new UserData("manager")
	userModel = new User(new UserId(111), new UserUUID("test-user-4162-9556-3dec13baee44"), this.userData, Trace.createTrace(new UserId(111)))
	
	userWithPermission(user: USER): UserRecord {
		switch (user) {
			case USER.ADMIN:
				return new UserRecord(this.userModel, this.userPasswordData)

			case USER.USER1:
				return new UserRecord(this.userModel, this.userPasswordData)

			case USER.USER2:
				return new UserRecord(this.userModel, this.userPasswordData)

			default:
				
				break
		}
	}
}
class UserRecord {
	constructor(public user: User, public userPasswordData: UserPasswordData) { }
}