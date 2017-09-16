import { IEntityRepository } from './../repositories/IEntityRepository'
import { EntityMysqlRepository } from './../repositories/EntityMysqlRepository'

export abstract class Entity {
  private _entityRepository: IEntityRepository = new EntityMysqlRepository(this);

  abstract tableName(): string;
  abstract tableColumns(): Array<any>;

  public find(columns?: string[]) {
    return this._entityRepository.find(columns);
  }

  public insert(entity: Entity) {
    return this._entityRepository.insert(this.getDto(entity));
  }

  public update(updates: any) {
    return this._entityRepository.update(updates);
  }

  public delete() {
    return this._entityRepository.delete();
  }

  private getDto(entity: Entity) {
    let obj = {};
    this.tableColumns().forEach(element => {
      obj[element] = entity[element];
    });

    return obj;
  }
}