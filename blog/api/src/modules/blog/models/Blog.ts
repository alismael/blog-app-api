import { Trace, Id, Signture, CompositeTrace, stringColumn, UUID, ITraceRecord } from "./../../common/models";
import { Entity, Column, Composite, ColumnValue, Primative } from "../../entity/models/Entity";
import { UserId } from "../../user/models/User"

export interface IInsertBlogRequest {
  title: string
  description: string
}

export interface IBlogRecord extends ITraceRecord {
  id: Id
  guid: string
  title: string
  description: string
}

export class BlogId {
  constructor(public value: Id) { }
}

export class BlogUUID {
  constructor(public value: string) { }
}

export class BlogData {
  constructor(public title: string, public description: string) { }

  public static vaidateInsertBlogRequest = (insertBlogRequest: IInsertBlogRequest): Promise<BlogData> => {
    return new Promise((resolve, reject) => {
      if (insertBlogRequest.title && insertBlogRequest.description) {
        const blogData = new BlogData(
          insertBlogRequest.title,
          insertBlogRequest.description
        )
        resolve(blogData)
      } else
        reject("Invalid request")
    })
  }
}

export class Blog {
  constructor(
    public id: BlogId,
    public guid: BlogUUID,
    public data: BlogData,
    public trace: Trace) { }
}

class BlogEntity extends Entity<Blog, Primative> {

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
      return [this.title.set(composite.title), this.description.set(composite.description)]
    }
  }

  public trace = CompositeTrace

  public tableName(): string {
    return "blog"
  }
  public tableColumns() {
    return ['id', 'title', 'description', 'guid', 'created_by', 'created_at', 'updated_by', 'updated_at'];
  }

  public map(object: IBlogRecord): Blog {
    let id = new BlogId(object.id),
      guid = new BlogUUID(object.guid),
      data = new BlogData(object.title, object.description),
      trace = new Trace(new Signture(new UserId(object.created_by), new Date(object.created_at)), new Signture(new UserId(object.updated_by), new Date(object.updated_at)))

    return new Blog(id, guid, data, trace);
  }

}

export const blogEntity = new BlogEntity
