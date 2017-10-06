import { Maybe } from 'tsmonad';
import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'
import { DBIO } from "../../../libs/IO";

export type Primative = string | boolean | number | Date;

export class ColumnValue<T, S extends Primative> {
  public constructor(public columnName: string, public value: S) { }
}

export abstract class Column<T, S extends Primative> {
  public constructor(public columnName: string) { }
  public set(value: T): ColumnValue<T, S> {
    return new ColumnValue(this.columnName, this.getValue(value))
  }
  public abstract getValue(x: T): S
}

export abstract class Composite<T, S extends Primative> {
  public abstract columns: (composite: T) => ColumnValue<T, S>[]
}

export enum OperatorEnum {
  OR = "or",
  AND = "AND"
}

export class Operation<T, S extends Primative> {
  constructor(public op: OperatorEnum, public columns: ColumnValue<T, S>[]) {}
  
    sql(): string {
      return this.columns.reduce((acc, pref) => {
        if(acc) 
          return `${acc} ${this.op} ${pref.columnName} = ${pref.value}`
        else 
          return `${pref.columnName} = ${pref.value}`
      }, "")
    }
}

export abstract class Entity<T, S extends Primative> {
  private _entityRepository: IEntityRepository<T, S> = new EntityMysqlRepository<T, S>(this);

  abstract tableName(): string;
  abstract tableColumns(): Array<any>;
  abstract map(object: any): T;

  public find(columns?: string[]): DBIO<T[]> {
    return this._entityRepository.find(columns);
  }

  public findOne(column: ColumnValue<T, S>): DBIO<Maybe<T>> {
    return this._entityRepository.findOne(column) 
  }

  public insert<N extends keyof this>(...args: ColumnValue<T, S>[]): DBIO<number> {
    return this._entityRepository.insert(args);
  }

  public update(...args: ColumnValue<T, S>[]): DBIO<number> {
    return this._entityRepository.update(args);
  }

  // public delete() {
  //   return this._entityRepository.delete();
  // }

  private getDto(entity: Entity<T, S>) {
    let obj = {};
    this.tableColumns().forEach(element => {
      obj[element] = entity[element];
    });

    return obj;
  }
}