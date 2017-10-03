import { Trace, Id, Signture, CompositeTrace, stringColumn, UserIdColumn, UUID } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue, Primative } from "../../entity/models/Entity";

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

  public tableName(): string {
    return "user"
  }
  public tableColumns() {
    return ["guid", "title", "created_by", "created_at", "updated_by", "updated_at"]
  }

}

export const userEntity = new UserEntity()

