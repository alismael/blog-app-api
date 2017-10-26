import { Trace, Id, Signture, CompositeTrace, stringColumn, UserIdColumn, UUID, ITraceRecord } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue, Primative } from "../../entity/models/Entity";

export type JWT = string

export class UserId {
  constructor(public value: Id) { }
}

export class UserUUID {
  constructor(public value: string) { }
}

export class UserData {
  constructor(public title: string) { }
}

export class User {
  constructor(
    public id: UserId,
    public guid: UserUUID,
    public data: UserData,
    public trace: Trace) { }
}

export interface IUserRecord extends ITraceRecord {
  id: Id
  guid: string
  title: string
}

class UserEntity extends Entity<User, Primative> {

  public id = UserIdColumn("id")
  public uuid = new class extends Column<UserUUID, UUID> {
    constructor() { super("guid") }
    public getValue(value: UserUUID): string {
      return value.value
    }
  }

  public data = new class extends Composite<UserData, string> {
    public title = stringColumn("title")

    public columns = (composite: UserData) => {
      return [this.title.set(composite.title)]
    }
  }

  public trace = CompositeTrace

  public map(object: IUserRecord): User {
    const id = new UserId(object.id),
      guid = new UserUUID(object.guid),
      data = new UserData(object.title),
      trace = new Trace(new Signture(new UserId(object.created_by), new Date(object.created_at)), new Signture(new UserId(object.updated_by), new Date(object.updated_at)))

    return new User(id, guid, data, trace);
  }
  
  public tableName(): string {
    return "user"
  }

}

export const userEntity = new UserEntity()

