import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'

export abstract class Entity {

    private _entity: Entity;
    private _entityRepository: IEntityRepository = new EntityMysqlRepository(this);

    abstract tableName() : string;
    abstract tableColumns() : Array<any>;

    public find(condition?: any) {
        return this._entityRepository.find(condition);
    }

    public insert(entity: Entity) {
        return this._entityRepository.insert( this.getDto(entity) );
    }

    public delete(condition) {
        return this._entityRepository.delete(condition);
    }

    private getDto(entity: Entity) {
        let obj = { };
        this.tableColumns().forEach(element => {
            obj[element] = entity[element];
        });

        return obj;
    }
}