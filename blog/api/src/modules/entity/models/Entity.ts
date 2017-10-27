import { Maybe } from 'tsmonad';
import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'
import { DBIO } from "../../../libs/IO";

export type Primative = string | boolean | number | Date;

export class ColumnValue<S extends Primative> {
  public constructor(public columnName: string, public value: S) { }
}

export abstract class Column<T, S extends Primative> {
  public constructor(public columnName: string) { }
  public set(value: T): ColumnValue<S> {
    return new ColumnValue(this.columnName, this.getValue(value))
  }
  public abstract getValue(x: T): S
}

export abstract class Composite<T, S extends Primative> {
  public abstract columns: (composite: T) => ColumnValue<S>[]
}

export abstract class Entity<T, S extends Primative> {
  private _entityRepository: IEntityRepository<T, S> = new EntityMysqlRepository<T, S>(this);

  abstract tableName(): string;
  abstract map(object: any): T;

  public findOne(column: ColumnValue<S>): DBIO<Maybe<T>> {
    return this._entityRepository.findOne(column) 
  }

  public insert(...args: ColumnValue<S>[]): DBIO<number> {
    return this._entityRepository.insert(args);
  }

  public update(condition: ColumnValue<S>, ...args: ColumnValue<S>[]): DBIO<number> {
    return this._entityRepository.update(condition, args);
  }
}
