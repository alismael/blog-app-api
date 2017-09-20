import { UserId } from "./../user/models/User";
import { Composite, Column, ColumnValue } from "../entity/models/Entity";

export class Signture {
  constructor(public by: UserId, public at: Date) { }
}

export class Trace {
  public static createTrace(userId: UserId): Trace {
    return new Trace(new Signture(userId, new Date()), new Signture(userId, new Date()))
  }

  constructor(public created: Signture, public updated: Signture) { }
}

export type Id = number

export const CompositeTrace = new class extends Composite<Trace, UserId | Date> {

  public created = new class extends Composite<Signture, UserId | Date> {

    public By = new class extends Column<UserId> {
      constructor() { super("created_by") }
      public getValue = (value: UserId): Id => {
        return value.value
      }
    }()

    public At = new class extends Column<Date> {
      constructor() { super("created_at") }
      public getValue = (value: Date): Date => {
        return value
      }
    }()

    public columns = (composite: Signture): ColumnValue<UserId | Date>[] => {
      return [
        this.By.set(composite.by),
        this.At.set(composite.at)
      ]
    }
  }

  public updated = new class extends Composite<Signture, UserId | Date> {

    public By = new class extends Column<UserId> {
      constructor() { super("updated_by") }
      public getValue = (value: UserId): Id => {
        return value.value
      }
    }()

    public At = new class extends Column<Date> {
      constructor() { super("updated_at") }
      public getValue = (value: Date): Date => {
        return value
      }
    }()

    public columns = (composite: Signture): ColumnValue<UserId | Date>[] => {
      return [
        this.By.set(composite.by),
        this.At.set(composite.at),
      ]
    }
  }

  public columns = (trace: Trace): ColumnValue<UserId | Date>[] => {
    return this.created.columns(trace.created).concat(this.updated.columns(trace.updated))
  }
}