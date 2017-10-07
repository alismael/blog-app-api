import { Maybe } from 'tsmonad';
import { Entity, ColumnValue, Primative } from './../models/Entity'
import { DBIO } from "../../../libs/IO";

export interface IEntityRepository<T, S extends Primative> {
  find(columns?: string[]): DBIO<T[]>
  insert(columns: ColumnValue<T, S>[]): DBIO<number>
  update(condition: ColumnValue<T, S>, columns: ColumnValue<T, S>[]): DBIO<number>
  // delete()
  findOne(column: ColumnValue<T, S>): DBIO<Maybe<T>>
}