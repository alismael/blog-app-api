import { IEntityRepository } from './IEntityRepository'
import { Entity } from './../models/Entity'
import knex from './../../knex/knex'

export class EntityMysqlRepository implements IEntityRepository {
    private _table: string;
    private _columns: Array<any>;

    constructor(entity: Entity) {
        this._table = entity.tableName();
        this._columns = entity.tableColumns();
    }

    public wrapper() {
        return knex
            .select('*')
            .from(this._table).clone();
    }

    // get entity
    public find(columns?: string[]) {
        return knex
            .select('*')
            .from(this._table).clone();
    }

    // Add new entity
    public async insert(entity: any) {
        return await knex(this._table)
            .insert(entity)
            .catch(function (err) {
                return "error" + err
            });
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
