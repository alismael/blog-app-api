import { Trace, Id, Signture, CompositeTrace } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue } from "../../entity/models/Entity";

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

type UserEntityType = UserId | UserUUID | Date | string
class UserEntity extends Entity<UserEntityType> {

  public id = new class extends Column<UserId> {
    constructor() { super("id") }
    public getValue = (value: UserId): Id => {
      return value.value
    }
  }()


  public uuid = new class extends Column<UserUUID> {
    constructor() { super("guid") }
    public getValue = (x: UserUUID): string => {
      return x.value
    }
  }

  public data = new class extends Composite<UserData, string> {
    public title = new class extends Column<string> {
      constructor() { super("title") }
      public getValue = (val: string): string => {
        return val
      }
    }()

    public columns = (composite: UserData): ColumnValue<string>[] => {
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

export const userEntity = new UserEntity



