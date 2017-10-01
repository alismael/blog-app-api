import { Maybe } from 'tsmonad';
import { IEntityRepository } from './IEntityRepository'
import { Entity, Column, ColumnValue, Primative } from './../models/Entity'
import knex from './../../knex/knex'
import * as squel from "squel"
import { DBIO } from "../../../libs/IO";

export class EntityMysqlRepository<T, S extends Primative> implements IEntityRepository<T, S> {
  private _table: string;
  private _columns: Array<any>;

  constructor(entity: Entity<T, S>) {
    this._table = entity.tableName();
    this._columns = entity.tableColumns();
  }

  // get entity
  public find(columns?: string[]) {
    // squel.select()
    return knex
      .select(columns)
      .from(this._table)
      .clone();
  }

  public findOne(column: ColumnValue<T, S>): DBIO<Maybe<T>> {
    let query = squel.select({ separator: "\n" })
    .from(this._table)
    .where(`${column.columnName} = ?`, [column.value])
    .toParam()

    return new DBIO<T[]>(query.text, query.values)
    .map(users => {
      if(users.length == 0)
        return Maybe.nothing()
      else 
        return Maybe.just(users[0])
    })
  }

  // Add new entity
  public insert(columns: ColumnValue<T, S>[]) {
    let cols = columns.reduce((acc, next) => 
      Object.assign(acc, {[next.columnName]: next.value}) 
     , {})
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