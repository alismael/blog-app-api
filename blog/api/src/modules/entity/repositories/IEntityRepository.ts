import { Maybe } from 'tsmonad';
import { ColumnValue, Primative } from './../models/Entity'
import { IO } from "../../../libs/IO";
import { RowDataPacket } from 'mysql2';

export interface IEntityRepository<R extends RowDataPacket, S extends Primative> {
  findOne(column: ColumnValue<S>): IO<Maybe<R>>
  insert(columns: ColumnValue<S>[]): IO<number>
  update(condition: ColumnValue<S>, columns: ColumnValue<S>[]): IO<number>
}