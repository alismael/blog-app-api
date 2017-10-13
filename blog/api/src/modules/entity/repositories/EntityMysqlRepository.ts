import { Maybe } from 'tsmonad';
import { IEntityRepository } from './IEntityRepository'
import { Entity, Column, ColumnValue, Primative } from './../models/Entity'
import * as squel from "squel"
import { DBIO } from "../../../libs/IO";

interface IOkPacket {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: boolean,
  changedRows: number
}

export class EntityMysqlRepository<T, S extends Primative> implements IEntityRepository<T, S> {
  protected _entity: Entity<T, S>;
  protected _table: string;

  constructor(entity: Entity<T, S>) {
    this._entity = entity;
    this._table = entity.tableName();
  }

  // Find entity
  protected find(): SqlSelect {
    return squel.select({ separator: "\n" })
      .from(this._table)
  }

  // Find entity by column value
  public findOne(column: ColumnValue<T, S>): DBIO<Maybe<T>> {
    let query = squel.select({ separator: "\n" })
      .from(this._table)
      .where(`${column.columnName} = ?`, [column.value])
      .toParam()

    return new DBIO<T[]>(query.text, query.values)
      .map(entites => {
        return entites.head().map((enitiy) => {
          return this._entity.map(enitiy)
        })
      })
  }

  // Add new entity
  public insert(columns: ColumnValue<T, S>[]): DBIO<number> {
    let cols = columns.reduce((acc, next) =>
      Object.assign(acc, { [next.columnName]: `${next.value}` })
      , {})

    let query = squel.insert()
      .into(this._table)
      .setFields(cols)
      .toParam()

    return new DBIO<IOkPacket>(query.text, query.values)
      .map(result => result.insertId)
  }

  // Update new entity
  public update(condition: ColumnValue<T, S>, columns: ColumnValue<T, S>[]): DBIO<number> {
    let cols = columns.reduce((acc, next) =>
      Object.assign(acc, { [next.columnName]: next.value })
      , {})

    let query = squel.update()
      .table(this._table)
      .where(`${condition.columnName} = ?`, [condition.value])
      .setFields(cols)
      .toParam()

    return new DBIO<number>(query.text, query.values)
  }

  // Delete entity
  public delete() {
    return true
  }
}