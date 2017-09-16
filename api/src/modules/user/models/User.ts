import { Trace } from "./../../common/models";
import { Entity } from "../../entity/models/Entity";

export class UserId {
  constructor(public value: number) {}
}

export class UserUUID {
  constructor(public value: string) {}
}

export class UserData {
  constructor(public title: string) {}
}

export class User {
  constructor(
    public id: UserId,
    public guid: UserUUID,
    public data: UserData,
    public trace: Trace) {}
}

export class UserEntity extends Entity {
  public tableName(): string {
    return "user"
  }
  public tableColumns(): string[] {
    return ["guid", "title", "created_by", "created_at", "updated_by", "updated_at"]
  }
}
