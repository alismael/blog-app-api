import { Trace, Id } from "./../../common/models";
import { Entity } from "../../entity/models/Entity";

export class UserId {
  constructor(public value: Id) {}
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

export abstract class Column<T> {
  public value: T 
  public constructor(public columnName: string) {}
  public setValue(x: T): Column<T> {
    this.value = x
    return this
  }
  public abstract getValue: () => any
}

export abstract class Composite<T, S> {
  public abstract columns: Column<S>[]
}

export class UserEntity extends Entity {
  
  public id = new class extends Column<UserId> {
    constructor(){ super("`id`") }
    public getValue = (): Id => { 
      return this.value.value
    }
  }()

 
  public uuid = new class extends Column<UserUUID> {
    constructor(){ super('`guid`') }
    public getValue = (): string => {
      return this.value.value
    }
  }
  
  public data = new class extends Composite<UserData, string> {
    public title = new class extends Column<string> {
      constructor(){ super("`title`") }
      public getValue = (): string => { 
        return this.value
      }
    }() 

    public columns: Column<string>[] = [this.title]
  }

  public trace = new class extends Composite<Trace, number| Date> {
    public createdBy = new class extends Column<number> {
      constructor(){ super("`created_by`") }
      public getValue = (): number => { 
        return this.value
      }
    }() 

    public createdAt = new class extends Column<Date> {
      constructor(){ super("`created_at`") }
      public getValue = (): Date => { 
        return this.value
      }
    }() 

    public updatedBy = new class extends Column<number> {
      constructor(){ super("`updated_by`") }
      public getValue = (): number => { 
        return this.value
      }
    }() 

    public updatedAt = new class extends Column<Date> {
      constructor(){ super("`updated_at`") }
      public getValue = (): Date => { 
        return this.value
      }
    }() 

    public columns: Column<number| Date>[] = [this.createdBy, this.createdAt, this.updatedBy, this.updatedAt]
  }
  
  public tableName(): string {
    return "user"
  }
  public tableColumns() {
    return ["guid", "title", "created_by", "created_at", "updated_by", "updated_at"]
  }

}



