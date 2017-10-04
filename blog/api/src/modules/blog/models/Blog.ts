import { Trace, Id, Signture, CompositeTrace, stringColumn, UUID } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue, Primative } from "../../entity/models/Entity";


export class BlogId {
  constructor(public value: Id) { }
}

export class BlogUUID {
  constructor(public value: string) { }
}

export class BlogData {
  constructor(public title: string, public description: string) { }
}

export class Blog {
  constructor(
    public id: BlogId,
    public guid: BlogUUID,
    public data: BlogData,
    public trace: Trace) { }
}

type BlogEntityType = BlogId | BlogUUID | Date | string

class BlogEntity extends Entity<BlogEntityType, Primative> {

  public id = new class extends Column<BlogId, Id> {
		constructor() { super("id") }
		public getValue(value: BlogId): Id {
			return value.value
		}
	}

  public uuid = new class extends Column<BlogUUID, UUID> {
    constructor() { super("guid") }
    public getValue(value: BlogUUID): string {
      return value.value
    }
  }

  public data = new class extends Composite<BlogData, string> {
    public title = stringColumn("title")
    public description = stringColumn("description")

    public columns = (composite: BlogData) => {
      return [this.title.set(composite.title), this.title.set(composite.description)]
    }
  }

  public trace = CompositeTrace

  public tableName(): string {
    return "blog"
  }
  public tableColumns() {
    return ['id', 'title', 'description', 'guid', 'created_by', 'created_at', 'updated_by', 'updated_at'];
  }

}

export const blogEntity = new BlogEntity