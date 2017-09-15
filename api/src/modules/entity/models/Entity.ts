import { IEntityRepository } from "./../repositories/IEntityRepository"
import { EntityMysqlRepository } from "./../repositories/EntityMysqlRepository"

export abstract class Entity {
  private entityRepository: IEntityRepository = new EntityMysqlRepository(this);

  public abstract tableName(): string;
  public abstract tableColumns(): string[];

  public find(columns?: string[]) {
    return this.entityRepository.find(columns);
  }

  public insert(entity: Entity) {
    return this.entityRepository.insert(this.getDto(entity));
  }

  public update(updates: any) {
    return this.entityRepository.update(updates);
  }

  public delete() {
    return this.entityRepository.delete();
  }

  private getDto(entity: Entity) {
    const obj = {};
    this.tableColumns().forEach(element => {
      obj[element] = entity[element];
    });

    return obj;
  }
}
