import { IEntityRepository } from './IEntityRepository'
import { Entity, Column, ColumnValue } from './../models/Entity'
import knex from './../../knex/knex'

export class EntityMysqlRepository<T> implements IEntityRepository<T> {
  private _table: string;
  private _columns: Array<any>;

  constructor(entity: Entity<T>) {
    this._table = entity.tableName();
    this._columns = entity.tableColumns();
  }

  // get entity
  public find(columns?: string[]) {
    return knex
      .select(columns)
      .from(this._table)
      .clone();
  }

  // Add new entity
  public insert(columns: ColumnValue<T>[]) {
    let cols = columns.reduce((acc, next) => {
      let obj = {}
      obj[next.columnName] = next.value
      console.log(obj)
      return Object.assign(acc, obj) 
    } , {})
    console.log(cols)
    return knex(this._table)
      .insert(cols)
      .clone()
  }

  // Update new entity
  public update(updates: any) {
    return knex(this._table)
      .update(updates)
      .clone();
  }

  // Delete entity
  public delete() {
    return knex(this._table)
      .del();
  }
}
