import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'


export class ColumnValue<T> {
  public constructor(public columnName: string, public value: T) { }
}

export abstract class Column<T> {
  public constructor(public columnName: string) { }
  public set(x: T): ColumnValue<T> {
    return new ColumnValue(this.columnName, this.getValue(x))
  }
  public abstract getValue: (x: T) => any
}

export abstract class Composite<T, S> {
  public abstract columns: (composite: T) => ColumnValue<S>[]
}

export abstract class Entity<T> {
  private _entityRepository: IEntityRepository<T> = new EntityMysqlRepository<T>(this);

  abstract tableName(): string;
  abstract tableColumns(): Array<any>;

  public find(columns?: string[]) {
    return this._entityRepository.find(columns);
  }

  public insert(first: ColumnValue<T>, ...args: ColumnValue<T>[]) {
    return this._entityRepository.insert(args.concat([first]));
  }

  public update(updates: any) {
    return this._entityRepository.update(updates);
  }

  public delete() {
    return this._entityRepository.delete();
  }

  private getDto(entity: Entity<T>) {
    let obj = {};
    this.tableColumns().forEach(element => {
      obj[element] = entity[element];
    });

    return obj;
  }
}