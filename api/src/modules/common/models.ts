import { UserId } from "./../user/models/User";

export class Trace {
  public static createTrace(userId: UserId): Trace {
    return new Trace(userId, new Date(), userId, new Date()) 
  }

  constructor(public createdBy: UserId, public createdAt: Date, public updatedBy: UserId, public updatedAt: Date) { }
}
