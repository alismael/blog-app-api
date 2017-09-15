import { Select } from "squel";
import { Entity } from "./../models/Entity"

export interface IEntityRepository {
    find(columns?: string[]): Select
    insert(entity: any);
    update(updates: any);
    delete();
}
