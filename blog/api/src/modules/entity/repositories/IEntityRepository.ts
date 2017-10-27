import { Maybe } from 'tsmonad';
import { ColumnValue, Primative } from './../models/Entity'
import { DBIO } from "../../../libs/IO";

export interface IEntityRepository<T, S extends Primative> {
  findOne(column: ColumnValue<S>): DBIO<Maybe<T>>
  insert(columns: ColumnValue<S>[]): DBIO<number>
  update(condition: ColumnValue<S>, columns: ColumnValue<S>[]): DBIO<number>
}