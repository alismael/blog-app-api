import { OkPacket } from 'mysql2';
import { RowDataPacket } from 'mysql2';
import { Maybe } from 'tsmonad';
import { IEntityRepository } from './IEntityRepository'
import { ColumnValue, Primative } from './../models/Entity'
import * as squel from "squel"
import { DBIO, IO } from "../../../libs/IO";
import { Select } from "squel";

export class EntityMysqlRepository<R extends RowDataPacket, S extends Primative> implements IEntityRepository<R, S> {

  constructor(private _table: string) { }

  // Find entity
  protected find(): Select {
    return squel.select({ separator: "\n" })
      .from(this._table)
  }

  // Find entity by column value
  public findOne(column: ColumnValue<S>): IO<Maybe<R>> {
    let query = squel.select({ separator: "\n" })
      .from(this._table)
      .limit(1)
      .where(`${column.columnName} = ?`, [column.value])
      .toParam()

    return new DBIO(query.text, query.values)
      .map(records => (<R[]>records).head())
  }

  // Add new entity
  public insert(columns: ColumnValue<S>[]): IO<number> {
    let cols = columns.reduce((acc, next) =>
      Object.assign(acc, { [next.columnName]: `${next.value}` })
      , {})

    let query = squel.insert()
      .into(this._table)
      .setFields(cols)
      .toParam()

    return new DBIO(query.text, query.values)
      .map(result => (<OkPacket>result).insertId)
  }

  // Update new entity
  public update(condition: ColumnValue<S>, columns: ColumnValue<S>[]): IO<number> {
    let cols = columns.reduce((acc, next) =>
      Object.assign(acc, { [next.columnName]: next.value })
      , {})

    let query = squel.update()
      .table(this._table)
      .where(`${condition.columnName} = ?`, [condition.value])
      .setFields(cols)
      .toParam()

    return new DBIO(query.text, query.values)
      .map(result => (<OkPacket>result).affectedRows)
  }

  // Delete entity
  public delete() {
    return true
  }
}