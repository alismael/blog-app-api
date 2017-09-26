import { Entity, ColumnValue, Primative } from './../models/Entity'

export interface IEntityRepository<T, S extends Primative> {
  find(columns?: string[]);
  insert(columns: ColumnValue<T, S>[]);
  update(updates: any);
  delete();
}
