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

	user(user: USER): UserRecord {
		switch (user) {
			case USER.ADMIN:
				return new UserRecord(this.userData()[0], this.userPasswordData()[0])

			case USER.USER1:
				return new UserRecord(this.userData()[1], this.userPasswordData()[1])

			case USER.USER2:
				return new UserRecord(this.userData()[2], this.userPasswordData()[2])

			default:
				
				break
		}
	}

	userData(): User[] {
		return [
			new User(new UserId(111), new UserUUID("test-user-4162-9556-3dec13baee44"), new UserData("IT Manager"), Trace.createTrace(new UserId(111))),
			new User(new UserId(112), new UserUUID("test-user-4162-9556-3dec13baee45"), new UserData("Software Engineer"), Trace.createTrace(new UserId(111))), ,
			new User(new UserId(113), new UserUUID("test-user-4162-9556-3dec13baee46"), new UserData("Project Manager"), Trace.createTrace(new UserId(111))),
		]
	}

	userPasswordData(): UserPasswordData[] {
		return [
			new UserPasswordData("Admin", "admin@test.com", "123456"),
			new UserPasswordData("User1", "user1@test.com", "123456"),
			new UserPasswordData("User2", "user2@test.com", "123456")
		]
	}

	data =  {
		registrationRequest: {
			username: "user1",
			email: "test@test.com",
			password: "string",
			repeatedPassword: "string"
		},
		loginRequest: {
			username: "test",
			password: "test"
		},
		userPasswordData: new UserPasswordData("Admin", "admin@test.com", "123456"),
		userRecord: (this.userData()[0], this.userPasswordData()[0])
		
	}
}

class UserRecord {
	constructor(public user: User, public userPasswordData: UserPasswordData) { }
}