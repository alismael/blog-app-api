import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'


export abstract class Column<T> {
  public value: T
  public constructor(public columnName: string) { }
  public setValue(x: T): Column<T> {
    this.value = x
    return Object.create(this)
  }
  public abstract getValue: () => any
}

export abstract class Composite<T, S> {
  public abstract columns: (composite: T) => Column<S>[]
}

export abstract class Entity<T> {
  private _entityRepository: IEntityRepository = new EntityMysqlRepository<T>(this);

  abstract tableName(): string;
  abstract tableColumns(): Array<any>;

  public find(columns?: string[]) {
    return this._entityRepository.find(columns);
  }

  public insert(...args: T[]) {
    return this._entityRepository.insert(args);
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