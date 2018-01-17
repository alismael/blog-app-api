import { Maybe } from 'tsmonad';
import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'
import { IO } from "../../../libs/IO";
import { RowDataPacket } from 'mysql2';

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

export abstract class Entity<T, R extends RowDataPacket, S extends Primative> {
  private _entityRepository: IEntityRepository<R, S> = new EntityMysqlRepository<R, S>(this.tableName());

  abstract tableName(): string;
  abstract map(object: R): T;

  public findOne(column: ColumnValue<S>): IO<Maybe<T>> {
    return this._entityRepository.findOne(column).map(mr => {
      return mr.map(r => this.map(r))
    })
  }

  public insert(...args: ColumnValue<S>[]): IO<number> {
    return this._entityRepository.insert(args)
  }

  public update(condition: ColumnValue<S>, ...args: ColumnValue<S>[]): IO<number> {
    return this._entityRepository.update(condition, args)
  }
}
