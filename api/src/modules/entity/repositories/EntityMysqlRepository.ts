import { IEntityRepository } from './IEntityRepository'
import { Entity } from './../models/Entity'
import knex from './../../knex/knex'

export class EntityMysqlRepository<T> implements IEntityRepository {
    private _table: string;
    private _columns: Array<any>;

    constructor(entity: Entity) {
        this._table = entity.tableName();
        this._columns = entity.tableColumns();
    }

    // get entity
    public find(columns?: string[]) {
        return knex
            .select(columns)
            .from(this._table)
            .clone();
    }

    // Add new entity
    public insert(entity: any) {
        return knex(this._table)
            .insert(entity)
            .clone()
    }

    // Update new entity
    public update(updates: any) {
        return knex(this._table)
            .update(updates)
            .clone();
    }

    // Delete entity
    public delete() {
        return knex(this._table)
            .del();
    }
}
