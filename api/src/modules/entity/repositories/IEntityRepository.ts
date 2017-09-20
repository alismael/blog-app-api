import { Entity, ColumnValue } from './../models/Entity'

export interface IEntityRepository<T> {
  find(columns?: string[]);
  insert(columns: ColumnValue<T>[]);
  update(updates: any);
  delete();
}
