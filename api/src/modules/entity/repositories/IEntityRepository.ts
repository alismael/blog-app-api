import { Entity } from './../models/Entity'

export interface IEntityRepository {
    find(columns?: string[]);
    insert(entity: any);
    update(updates: any);
    delete();
}
