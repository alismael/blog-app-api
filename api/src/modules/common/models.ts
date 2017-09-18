import { UserId } from "./../user/models/User";
import { Composite, Column } from "../entity/models/Entity";

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
      constructor() { super("`created_by`") }
      public getValue = (): Id => {
        return this.value.value
      }
    }()

    public At = new class extends Column<Date> {
      constructor() { super("`created_at`") }
      public getValue = (): Date => {
        return this.value
      }
    }()

    public columns = (composite: Signture): Column<UserId | Date>[] => {
      return [
        this.By.setValue(composite.by),
        this.At.setValue(composite.at),
      ]
    }
  }

  public updated = new class extends Composite<Signture, UserId | Date> {

    public By = new class extends Column<UserId> {
      constructor() { super("`updated_by`") }
      public getValue = (): Id => {
        return this.value.value
      }
    }()

    public At = new class extends Column<Date> {
      constructor() { super("`updated_at`") }
      public getValue = (): Date => {
        return this.value
      }
    }()

    public columns = (composite: Signture): Column<UserId | Date>[] => {
      return [
        this.By.setValue(composite.by),
        this.At.setValue(composite.at),
      ]
    }
  }

  public columns = (trace: Trace): Column<UserId | Date>[] => {
    return this.created.columns(trace.created).concat(this.updated.columns(trace.updated))
  }
}