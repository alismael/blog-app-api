import { Entity } from './../models/Entity'

export interface IEntityRepository {
    find (condition?: any);
    insert (entity: any);
    delete (condition: any);
}
