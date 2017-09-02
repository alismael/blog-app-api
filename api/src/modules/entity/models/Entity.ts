import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'

export abstract class Entity<T> {
    private _entityRepository: IEntityRepository = new EntityMysqlRepository(this);

    abstract tableName() : string;
    abstract tableColumns() : string[];

    public find(condition?: any) {
        return this._entityRepository .find(condition);
    }

    public insert(model: T) {
        return this._entityRepository.insert( this.getDto(model) );
    }

    public delete(condition) {
        return this._entityRepository.delete(condition);
    }

    abstract getDto(model: T)
}