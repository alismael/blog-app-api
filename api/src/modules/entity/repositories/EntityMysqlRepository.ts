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
    public async find(condition?: any) {
        return await knex
            .select('*')
            .from(this._table)
            .where(function () {
                if (condition) {
                    let that = this;
                    Object.keys(condition).forEach(function (key) {
                        that.where(key, condition[key]);
                    })
                }
            })
            .catch(function (err) {
                return "error" + err
            });
    }

    // Add new entity
    public async insert(entity: any) {
        console.log(entity)
        return await knex(this._table)
            .insert(entity)
    }

    // Delete entity
    public async delete(condition: any) {
        return await knex(this._table)
            .where(function () {
                let that = this;
                Object.keys(condition).forEach(function (key) {
                    that.where(key, condition[key]);
                })
            })
            .del()
            .catch(function (err) {
                return "error"
            });
    }
}
