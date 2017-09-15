import { IEntityRepository } from "./IEntityRepository"
import { Entity } from "./../models/Entity"
import knex from "./../../knex/knex"
import * as squel from "squel"
import { QueryBuilderOptions } from "squel";
import { Select } from "squel";

export class EntityMysqlRepository implements IEntityRepository {
  public queryOptions: QueryBuilderOptions = { autoQuoteTableNames: true, autoQuoteFieldNames: true }
  private table: string;
  private columns: string[];
  constructor(entity: Entity) {
    this.table = entity.tableName();
    this.columns = entity.tableColumns();
  }

  // get entity
  public find(columns?: string[]): Select {
    return squel.select(this.queryOptions)
      .from(this.table)
      .fields(columns)
  }

  // Add new entity
  public insert(entity: any) {
    return knex(this.table)
      .insert(entity)
      .clone()
  }

  // Update new entity
  public update(updates: any) {
    return knex(this.table)
      .update(updates)
      .clone();
  }

  // Delete entity
  public delete() {
    return knex(this.table)
      .del();
  }
}
