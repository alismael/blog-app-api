import { UserId } from "./../user/models/User";
import { Composite, Column } from "../entity/models/Entity";
import * as moment from "moment"

export type Id = number
export type UUID = string

export class Signture {
  constructor(public by: UserId, public at: Date) { }
}

export class TraceDto {
  constructor(
    public createdBy: Id,
    public createdAt: Date,
    public updatedBy: Id,
    public updatedAt: Date
  ) { }
}

export class Trace {
  public static createTrace(userId: UserId): Trace {
    return new Trace(new Signture(userId, new Date()), new Signture(userId, new Date()))
  }

  constructor(public created: Signture, public updated: Signture) { }

  toDto() {
    return new TraceDto(
      this.created.by.value,
      this.created.at,
      this.updated.by.value,
      this.updated.at      
    )
  }
}

export interface ITraceRecord {
  created_by: Id
  created_at: string
  updated_by: Id
  updated_at: string
}

export const UserIdColumn = (columnName: string) => new class extends Column<UserId, Id> {
  constructor() { super(columnName) }
  public getValue(value: UserId): Id {
    return value.value
  }
}()

export const DateColumn = (columnName: string) => new class extends Column<Date, string> {
  constructor() { super(columnName) }
  public getValue(value: Date): string {
    return moment(value, moment.ISO_8601).format("YYYY-MM-DD hh:mm:ss")
  }
}()

export const CompositeTrace = new class extends Composite<Trace, Id | string> {

  private constructComposite(by: string, at: string) {
    return new class extends Composite<Signture, Id | string> {
      public By = UserIdColumn(by)
      public At = DateColumn(at)

      public columns = (composite: Signture) => {
        return [
          this.By.set(composite.by),
          this.At.set(composite.at)
        ]
      }
    }
  }

  public created = this.constructComposite("created_by", "created_at")
  public updated = this.constructComposite("updated_by", "updated_at")

  public columns = (trace: Trace) => {
    return this.created.columns(trace.created).concat(this.updated.columns(trace.updated))
  }
}

export const stringColumn = (columnName: string) => {
  return new class extends Column<string, string> {
    constructor() { super(columnName) }
    public getValue(value: string): string {
      return value
    }
  }()
}

