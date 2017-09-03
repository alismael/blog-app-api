import { Entity } from './../models/Entity'

export interface IEntityRepository {
    find (condition?: any);
    insert (entity: any);
    update (updates: any, condition: any);
    delete (condition: any);
}
